"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLoadCommentsOfPostQuery } from "@/redux/features/comments/commentApi";
import {
  useDownVotePostMutation,
  useUpvotePostMutation,
} from "@/redux/features/posts/postApi";
import { useAppSelector } from "@/redux/hooks";
import { TPost } from "@/types/postType";
import { MessageCircle, ArrowBigUp, ArrowBigDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
  post: TPost;
};

const PostCard: React.FC<Props> = ({ post }) => {
  // ------------- redux
  const user = useAppSelector((state) => state.auth.token);
  const { data: comments } = useLoadCommentsOfPostQuery(post._id, {
    skip: !post._id,
  });
  const [upvotePost] = useUpvotePostMutation();
  const [downvotePost] = useDownVotePostMutation();

  // ------------ react
  const router = useRouter();
  // check if logged in user upvote this post
  const isUpvote = post?.upvotes?.includes("6708ee01d23b285fff6c1a9a");
  const isDownvote = post?.downvotes?.includes("6708ee01d23b285fff6c1a9a");

  // ----------- handle upvote
  const handleUpvote = async (postId: string) => {
    if (!user) {
      router.push("/register");
    }
    try {
      await upvotePost(postId);
    } catch (error) {
      console.log(error);
    }
  };

  // ----------- handle downvote
  const handleDownvote = async (postId: string) => {
    if (!user) {
      router.push("/register");
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
    const match = htmlContent.match(firstTagRegex);
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
    <Card>
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
        <Link href={`/profile/${post._id}`}>
          <CardDescription className="underline">
            {post?.author?.name}
          </CardDescription>
        </Link>
      </CardHeader>
      <Link href={`/posts/${post?._id}`}>
        <CardContent>
          <Image
            src={post.image}
            alt="Bali scenery"
            width={400}
            height={200}
            className="rounded-md mb-4"
          />
          {firstTagContent === "" ? (
            <p>No details</p>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: firstTagContent }} />
          )}
        </CardContent>
      </Link>
      <CardFooter className="flex justify-between">
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

        {/* comments  */}
        <Link href={`/posts/${post?._id}`}>
          {" "}
          <div className="flex items-center space-x-2">
            <MessageCircle className="w-4 h-4" />
            <span>{comments?.data?.length}</span>
          </div>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
