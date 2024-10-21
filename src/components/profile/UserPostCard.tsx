"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MessageCircle, ArrowBigDown, ArrowBigUp, Lock } from "lucide-react";
import { TPost } from "@/types/postType";
import { useAppSelector } from "@/redux/hooks";
import {
  useDownVotePostMutation,
  useUpvotePostMutation,
} from "@/redux/features/posts/postApi";
import { useRouter } from "next/navigation";
import { useGetMyProfileQuery } from "@/redux/features/users/userApi";

type Props = {
  refetch: () => void;
  post: TPost;
};

export default function UserPostCard({ refetch, post }: Props) {
  // -------------- redux
  const user = useAppSelector((state) => state.auth?.user);
  const [upvotePost] = useUpvotePostMutation();
  const [downvotePost] = useDownVotePostMutation();
  const { data: userData = { data: {} } } = useGetMyProfileQuery(undefined);

  const router = useRouter();

  // ------------ react
  const isUpvoted = post?.upvotes?.includes(user?.userId as string);
  const isDownvoted = post?.downvotes?.includes(user?.userId as string);
  const isPostOwner = user?.userId === post?.author?._id;
  const hasAccess =
    !post.premium || userData?.data?.premiumAccess || isPostOwner;

  // ------------------ handle upvote and downvote
  const handleVote = async (voteType: "upvote" | "downvote") => {
    if (!user?.userId) {
      router.push("/register");
      return;
    }
    if (!hasAccess) {
      router.push("/upgrade");
      return;
    }
    try {
      await (voteType === "upvote"
        ? upvotePost(post._id)
        : downvotePost(post._id));
      refetch();
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  // -------------- dynamically postLink
  const postLink = hasAccess ? `/posts/${post._id}` : "/upgrade";

  return (
    <Card
      key={post?._id}
      className={`flex flex-col h-full ${hasAccess ? "" : "opacity-60"}`}
    >
      <CardHeader>
        <CardTitle className="text-lg line-clamp-2   overflow-hidden">
          {post.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow pb-0">
        <div className="relative w-full h-48 mb-4">
          <Image
            src={post.image}
            alt={post.title}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        </div>
        <div className="flex justify-between text-sm text-muted-foreground">
          {/* upvote, downvote  */}
          <div className="flex items-center space-x-2 p-2 rounded-lg text-gray-600 font-medium">
            <button
              onClick={() => handleVote("upvote")}
              className={`flex items-center hover:text-green-600 ${
                isUpvoted ? "text-green-600" : ""
              }`}
              aria-label="Upvote"
              disabled={!hasAccess}
            >
              <ArrowBigUp className="h-6 w-6 mr-1" />
              <span>{post?.upvotes?.length || 0}</span>
            </button>
            <button
              onClick={() => handleVote("downvote")}
              className={`flex items-center hover:text-red-600 ${
                isDownvoted ? "text-red-600" : ""
              }`}
              aria-label="Downvote"
              disabled={!hasAccess}
            >
              <ArrowBigDown className="h-6 w-6 mr-1" />
              <span>{post?.downvotes?.length || 0}</span>
            </button>
          </div>
          {/* comment  */}
          <Link className="flex items-center" href={postLink}>
            <MessageCircle className="mr-1 h-4 w-4" />
            <span>{post?.commentCount || 0}</span>
          </Link>
        </div>
      </CardContent>
      {/* view post or upgrade to premium button */}
      <CardFooter className="mt-auto">
        <Button variant="ghost" asChild className="w-full">
          <Link href={postLink}>
            {hasAccess ? (
              "View Post"
            ) : (
              <>
                <Lock className="mr-2 h-4 w-4" /> Upgrade to View
              </>
            )}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
