import { TPost } from "@/types/postType";
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

export default function PostCard({ post }: Props) {
  // -------------- redux
  const user = useAppSelector((state) => state.auth?.user);
  const [upvotePost] = useUpvotePostMutation();
  const [downvotePost] = useDownVotePostMutation();
  const router = useRouter();

  // ----------------- react
  const isUpvoted = post?.upvotes?.includes(user?.userId as string);
  const isDownvoted = post?.downvotes?.includes(user?.userId as string);
  const isPostOwner = user?.userId === post?.author?._id;
  const hasAccess = !post.premium || user?.premiumAccess || isPostOwner;

  // --------------- handle upvote and downvote
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
    } catch (error) {
      console.log(error);
    }
  };

  // ------------ get the first tag of content
  const getFirstTagContent = (htmlContent: string) => {
    const firstTagRegex = /<(\w+)[^>]*>(.*?)<\/\1>/i;
    const match = htmlContent?.match(firstTagRegex);
    if (match && match[1] !== "img") {
      return match[0];
    }
    return "";
  };

  const firstTagContent = getFirstTagContent(post?.content);

  // post link to show to the user
  const postLink = hasAccess ? `/posts/${post._id}` : "/upgrade";

  return (
    <Card className={`${hasAccess ? "" : "opacity-60"} flex flex-col h-full`}>
      {/* post header  */}
      <CardHeader className="flex-grow-0">
        <div className="relative">
          <Image
            src={post?.image}
            alt={post?.title}
            width={300}
            height={200}
            className="rounded-md mb-4 w-full h-48 object-cover"
          />
          <Badge variant="secondary" className="absolute top-2 right-2">
            {post?.premium ? "Premium" : "Free"}
          </Badge>
        </div>
        <CardTitle className="line-clamp-2   overflow-hidden">
          <Link href={postLink}>{post?.title}</Link>
        </CardTitle>
        <CardDescription>
          <Link href={`/profile/${post.author?._id}`}>
            By {post?.author?.name}
          </Link>
        </CardDescription>
      </CardHeader>
      {/* content  */}
      <CardContent className="flex-grow">
        {firstTagContent ? (
          <div
            className="line-clamp-4 overflow-hidden"
            dangerouslySetInnerHTML={{ __html: firstTagContent }}
          />
        ) : (
          <p>No details</p>
        )}
      </CardContent>
      {/* upvote downvote readmore and comment */}
      <CardFooter className="flex justify-between mt-auto">
        <div className="flex space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2 p-2 rounded-lg text-gray-600 font-medium">
            <ArrowBigUp
              onClick={() => handleVote("upvote")}
              className={`h-6 w-6 hover:text-green-600 cursor-pointer ${
                isUpvoted ? "text-green-600" : ""
              }`}
            />
            <span>{post?.upvotes?.length}</span>
            <ArrowBigDown
              onClick={() => handleVote("downvote")}
              className={`h-6 w-6 hover:text-red-600 cursor-pointer ${
                isDownvoted ? "text-red-600" : ""
              }`}
            />
            <span>{post?.downvotes?.length}</span>
          </div>
          <span className="flex">
            <Link className="flex items-center" href={postLink}>
              <MessageCircle className="mr-1 h-4 w-4" />{" "}
              {post?.commentCount || 0}
            </Link>
          </span>
        </div>
        <Button variant="outline" disabled={!hasAccess}>
          {hasAccess ? (
            <Link href={postLink}>Read More</Link>
          ) : (
            <>
              <Lock className="mr-2 h-4 w-4" /> Locked
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
