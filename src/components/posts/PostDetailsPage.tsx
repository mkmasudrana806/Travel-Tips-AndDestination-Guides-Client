"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import { MessageCircle, ArrowBigUp, ArrowBigDown } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  useDownVotePostMutation,
  useGetPostByIdQuery,
  useUpvotePostMutation,
} from "@/redux/features/posts/postApi";
import { TPost } from "@/types/postType";
import { useAppSelector } from "@/redux/hooks";
import { useLoadCommentsOfPostQuery } from "@/redux/features/comments/commentApi";
import { TComment } from "@/types/commentType";
import CommentForm from "./CommentForm";
import CommentCard from "./CommentCard";
import Link from "next/link";

// ----------------- post details page ----------------
export default function PostDetailsPage({ id }: { id: string }) {
  // ------------- redux
  const { data: post, refetch } = useGetPostByIdQuery(id, {
    skip: !id,
  });
  const user = useAppSelector((state) => state.auth.token);
  const {
    data: comments,
    isLoading,
    isError,
    refetch: refetchComments,
  } = useLoadCommentsOfPostQuery(id, {
    skip: !id,
  });
  const [upvotePost] = useUpvotePostMutation();
  const [downvotePost] = useDownVotePostMutation();

  // ------------ react
  const postData: TPost = post?.data;

  const router = useRouter();

  // ----------- handle upvote
  const handleUpvote = async (postId: string) => {
    if (!user) {
      router.push("/register");
      return;
    }
    try {
      await upvotePost(postId);
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  // ----------- handle downvote
  const handleDownvote = async (postId: string) => {
    if (!user) {
      router.push("/register");
      return;
    }
    try {
      await downvotePost(postId);
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  // check if logged in user upvote this post
  const isUpvote = postData?.upvotes?.includes("6708ee01d23b285fff6c1a9a");
  const isDownvote = postData?.downvotes?.includes("6708ee01d23b285fff6c1a9a");

  // --------- decide what to render for comments
  let commentsContent = null;
  if (isLoading) {
    commentsContent = <h1>Loading comments........</h1>;
  } else if (!isLoading && isError) {
    commentsContent = (
      <h1 className="text-red-600">Error while fetching comments </h1>
    );
  } else if (!isLoading && !isError && comments?.data?.length === 0) {
    commentsContent = (
      <h1 className="text-gray-600 text-2xl">Comments not found</h1>
    );
  } else if (!isLoading && !isError && comments?.data?.length > 0) {
    commentsContent = comments?.data?.map((comment: TComment) => (
      <CommentCard
        postOwnerId={post?.data?.author?._id}
        key={comment?._id}
        comment={comment}
      />
    ));
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        {/* post header with author details  */}
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-3xl mb-2">{postData?.title}</CardTitle>
              <CardDescription>
                <Link href={`/profile/${postData?.author?._id}`}>
                  <span className="mr-4">By {postData?.author?.name}</span>
                </Link>
                <span className="mr-4">Category: {postData?.category}</span>
                <span>
                  {new Date(postData?.createdAt).toLocaleDateString()}
                </span>
              </CardDescription>
            </div>
            <Badge variant={postData?.premium ? "default" : "secondary"}>
              {postData?.premium ? "Premium" : "Free"}
            </Badge>
          </div>
        </CardHeader>
        {/* post body  */}
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <Avatar>
              <AvatarImage
                src={postData?.author?.profilePicture}
                alt={postData?.author?.name}
              />
              <AvatarFallback>
                {postData?.author?.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{postData?.author?.name}</p>
              <p className="text-sm text-muted-foreground">
                @{postData?.author?.email?.split("@")[0]}
              </p>
            </div>
            {postData?.author?.isVerified && (
              <Badge variant="secondary">Verified</Badge>
            )}
          </div>
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: postData?.content }}
          />
        </CardContent>
        {/* upvote, downvote, comments  */}
        <CardFooter className="flex justify-between">
          {/* upvote and downvote  */}
          <div className="flex items-center space-x-2  p-2 rounded-lg text-gray-600 font-medium">
            <ArrowBigUp
              onClick={() => handleUpvote(id)}
              className={`h-6 w-6 hover:text-green-600 cursor-pointer ${
                isUpvote ? "text-green-600" : ""
              }`}
            />
            <span>{postData?.upvotes?.length}</span>
            <ArrowBigDown
              onClick={() => handleDownvote(id)}
              className={`h-6 w-6 hover:text-red-600 cursor-pointer ${
                isDownvote ? "text-red-600" : ""
              }`}
            />
            <span>{postData?.downvotes?.length}</span>
          </div>

          <Button
            variant="ghost"
            onClick={() =>
              document
                .getElementById("comment-section")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            Comments ({comments?.data?.length})
          </Button>
        </CardFooter>
      </Card>

      {/* comment form section  */}
      <div id="comment-section" className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        <Card>
          <CardHeader>
            <CardTitle>Add a Comment</CardTitle>
          </CardHeader>
          <CardContent>
            <CommentForm refetchComment={refetchComments} id={id} />
          </CardContent>
        </Card>
        {/* comments containers  */}
        <div className="mt-6 space-y-4">{commentsContent}</div>
      </div>
    </div>
  );
}
