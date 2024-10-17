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
import { MessageCircle, ArrowBigDown, ArrowBigUp } from "lucide-react";
import { TPost } from "@/types/postType";
import { useAppSelector } from "@/redux/hooks";
import {
  useDownVotePostMutation,
  useUpvotePostMutation,
} from "@/redux/features/posts/postApi";
import { useRouter } from "next/navigation";

type Props = {
  post: TPost;
};

// ----------- user post card
const UserPostCard: React.FC<Props> = ({ post }) => {
  // --------------- redux
  const user = useAppSelector((state) => state.auth?.user);

  const [upvotePost] = useUpvotePostMutation();
  const [downvotePost] = useDownVotePostMutation();

  // ------------ react
  const router = useRouter();

  // check if logged in user upvote this post
  const isUpvote = post?.upvotes?.includes(user?.userId as string);
  const isDownvote = post?.downvotes?.includes(user?.userId as string);

  // ----------- handle upvote
  const handleUpvote = async (postId: string) => {
    if (!user?.userId) {
      router.push("/register");
      return;
    } else if (!user.premiumAccess && post.premium) {
      router.push("/upgrade");
      return;
    }
    try {
      await upvotePost(postId);
    } catch (error) {
      console.log(error);
    }
  };

  // ----------- handle downvote
  const handleDownvote = async (postId: string) => {
    if (!user?.userId) {
      router.push("/register");
      return;
    } else if (!user.premiumAccess && post.premium) {
      router.push("/upgrade");
      return;
    }
    try {
      await downvotePost(postId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card
      key={post?._id}
      className={!user?.premiumAccess && post?.premium ? "opacity-60" : ""}
    >
      <CardHeader>
        <CardTitle className="text-lg">{post.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Image
          src={post.image}
          alt={post.title}
          width={300}
          height={200}
          className="rounded-md mb-4"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          {/* upvote and downvote  */}
          <div className="flex items-center space-x-2  p-2 rounded-lg text-gray-600 font-medium">
            <ArrowBigUp
              onClick={() => handleUpvote(post._id)}
              className={`h-6 w-6 hover:text-green-600 cursor-pointer ${
                isUpvote ? "text-green-600" : ""
              }`}
            />
            <span>{post?.upvotes?.length}</span>
            <ArrowBigDown
              onClick={() => handleDownvote(post._id)}
              className={`h-6 w-6 hover:text-red-600 cursor-pointer ${
                isDownvote ? "text-red-600" : ""
              }`}
            />
            <span>{post?.downvotes?.length}</span>
          </div>
          {/* comment */}
          <span className="flex">
            <Link
              className="flex items-center"
              href={
                !user?.premiumAccess && post?.premium
                  ? "/upgrade"
                  : `/posts/${post?._id}`
              }
            >
              <MessageCircle className="mr-1 h-4 w-4" />{" "}
              {post?.commentCount ? post?.commentCount : 0}
            </Link>
          </span>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" asChild className="w-full">
          <Link
            href={
              !user?.premiumAccess && post?.premium
                ? "/upgrade"
                : `/posts/${post?._id}`
            }
          >
            View Post
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UserPostCard;
