import { TPost } from "@/types/postType";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowBigDown, ArrowBigUp, Lock, MessageCircle } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";
import {
  useDownVotePostMutation,
  useUpvotePostMutation,
} from "@/redux/features/posts/postApi";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Props = {
  post: TPost;
};
const PostCard: React.FC<Props> = ({ post }) => {
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

  // ----------- handle body content
  const firstTagRegex = /<(\w+)[^>]*>(.*?)<\/\1>/i;
  // Function to get the first tag's content
  const getFirstTagContent = (htmlContent: string) => {
    const match = htmlContent?.match(firstTagRegex);
    if (match) {
      const firstTagName = match[1]; // Get the tag name
      // Check if the first tag is an <img> tag
      if (firstTagName === "img") {
        return ""; // Return empty for <img> tags
      }
      return match[0]; // Return the first tag's content with the tag
    }
    return ""; // Return empty if no tags are found
  };

  // Get the content of the first tag
  const firstTagContent = getFirstTagContent(post?.content);

  return (
    <Card
      key={post?._id}
      className={!user?.premiumAccess && post?.premium ? "opacity-60" : ""}
    >
      <CardHeader>
        <div className="relative">
          <Image
            src={post?.image}
            alt={post?.title}
            width={300}
            height={200}
            className="rounded-md mb-4"
          />
          <Badge variant="secondary" className="absolute top-2 right-2">
            {post?.premium ? "Premium" : "Free"}
          </Badge>
        </div>
        <CardTitle>
          <Link
            href={
              !user?.premiumAccess && post?.premium
                ? "/upgrade"
                : `/posts/${post._id}`
            }
          >
            {post?.title}
          </Link>
        </CardTitle>
        <CardDescription>
          <Link href={`/profile/${post.author?._id}`}>
            By {post?.author?.name}
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {firstTagContent === "" ? (
          <p>No details</p>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: firstTagContent }} />
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex space-x-4 text-sm text-muted-foreground">
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
        <Button
          variant="outline"
          disabled={!user?.premiumAccess && post?.premium}
        >
          {!post.premium || user?.premiumAccess ? (
            <Link href={`/posts/${post._id}`}>Read More</Link>
          ) : (
            <>
              <Lock className="mr-2 h-4 w-4" /> Locked
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
