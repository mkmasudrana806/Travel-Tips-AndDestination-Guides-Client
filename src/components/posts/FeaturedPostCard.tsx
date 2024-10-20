"use client";

import { useAppSelector } from "@/redux/hooks";
import {
  useDownVotePostMutation,
  useUpvotePostMutation,
} from "@/redux/features/posts/postApi";
import { TPost } from "@/types/postType";
import { MessageCircle, ArrowBigUp, ArrowBigDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {
  post: TPost;
};

export default function PostCard({ post }: Props) {
  console.log(post?.commentCount);
  // ------------- redux
  const user = useAppSelector((state) => state.auth.token);
  const [upvotePost] = useUpvotePostMutation();
  const [downvotePost] = useDownVotePostMutation();
  const router = useRouter();

  // ------------------- react
  const isUpvoted = post?.upvotes?.includes("6708ee01d23b285fff6c1a9a");
  const isDownvoted = post?.downvotes?.includes("6708ee01d23b285fff6c1a9a");

  // ------------ handle upvote and downvote ------------
  const handleVote = async (voteType: "upvote" | "downvote") => {
    if (!user) {
      router.push("/register");
      return;
    }
    try {
      await (voteType === "upvote"
        ? upvotePost(post._id)
        : downvotePost(post._id));
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  // ------------- get the first tag content
  const getFirstTagContent = (htmlContent: string) => {
    const firstTagRegex = /<(\w+)[^>]*>(.*?)<\/\1>/i;
    const match = htmlContent?.match(firstTagRegex);
    if (match && match[1] !== "img") {
      return match[0];
    }
    return "";
  };

  const firstTagContent = getFirstTagContent(post?.content);

  return (
    <Card className="flex  flex-col h-full">
      <CardHeader className="flex-grow-0 ">
        <CardTitle className="line-clamp-2  overflow-hidden">
          <Link href={`/posts/${post?._id}`} className="hover:underline">
            {post.title}
          </Link>
        </CardTitle>
        <Link href={`/profile/${post._id}`} className="hover:underline">
          <CardDescription>{post?.author?.name}</CardDescription>
        </Link>
      </CardHeader>
      <Link href={`/posts/${post?._id}`} className="flex-grow">
        <CardContent>
          <div className="relative w-full h-48 mb-4">
            <Image
              src={post.image}
              alt={post.title}
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </div>
          <div className="line-clamp-3 overflow-hidden">
            {firstTagContent ? (
              <div dangerouslySetInnerHTML={{ __html: firstTagContent }} />
            ) : (
              <p>No details</p>
            )}
          </div>
        </CardContent>
      </Link>
      <CardFooter className="flex justify-between mt-auto">
        {/* upvote and downvote */}
        <div className="flex items-center space-x-2 p-2 rounded-lg text-gray-600 font-medium">
          <button
            onClick={() => handleVote("upvote")}
            className={`flex items-center hover:text-green-600 ${
              isUpvoted ? "text-green-600" : ""
            }`}
            aria-label="Upvote"
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
          >
            <ArrowBigDown className="h-6 w-6 mr-1" />
            <span>{post?.downvotes?.length || 0}</span>
          </button>
        </div>
        {/* comment  */}
        <Link
          href={`/posts/${post?._id}`}
          className="flex items-center space-x-2 hover:underline"
        >
          <MessageCircle className="w-4 h-4" />
          <span>{post?.commentCount || 0}</span>
        </Link>
      </CardFooter>
    </Card>
  );
}
