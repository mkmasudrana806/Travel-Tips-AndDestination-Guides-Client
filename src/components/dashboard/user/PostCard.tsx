import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TPost } from "@/types/postType";
import {
  ArrowBigDown,
  ArrowBigUp,
  Edit,
  Eye,
  MessageCircle,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { format } from "date-fns";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useDeletePostMutation } from "@/redux/features/posts/postApi";
import { setEditPostData } from "@/redux/features/posts/filterSlice";

type Props = {
  refetch: () => void;
  post: TPost;
};

// ------------- post card component
const PostCard: React.FC<Props> = ({ post, refetch }) => {
  // --------------- redux
  const userId = useAppSelector((state) => state.auth.user?.userId);
  const [deletePost] = useDeletePostMutation();
  const dispatch = useAppDispatch();

  // ------------- react
  // ---------- upvote and downvote status
  const isUpvoted = post?.upvotes?.includes(userId as string);
  const isDownvoted = post?.downvotes?.includes(userId as string);

  // handle delete post
  const handleDeletePost = async (postId: string) => {
    try {
      const result = await deletePost(postId).unwrap();
      if (result?.success) {
        console.log(result.message);
        refetch();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // ------------- handle edit post
  const handleEditPost = (post: TPost) => {
    dispatch(setEditPostData(post));
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

  return (
    <Card key={post?._id}>
      <CardHeader>
        <CardTitle>{post?.title}</CardTitle>
        <CardDescription>
          {format(post?.createdAt, "MMMM d, yyyy")}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        {firstTagContent ? (
          <div
            className="line-clamp-2 overflow-hidden"
            dangerouslySetInnerHTML={{ __html: firstTagContent }}
          />
        ) : (
          <p>No details</p>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex space-x-4 text-sm text-muted-foreground">
          {/* upvote, downvote  */}
          <div className="flex items-center space-x-2 p-2 rounded-lg text-gray-600 font-medium">
            <ArrowBigUp
              className={`h-6 w-6 hover:text-green-600 cursor-pointer ${
                isUpvoted ? "text-green-600" : ""
              }`}
            />
            <span>{post?.upvotes?.length}</span>
            <ArrowBigDown
              className={`h-6 w-6 hover:text-red-600 cursor-pointer ${
                isDownvoted ? "text-red-600" : ""
              }`}
            />
            <span>{post?.downvotes?.length}</span>
          </div>
          {/* comment  */}
          <Link className="flex items-center" href={`/posts/${post?._id}`}>
            <span className="flex">
              <MessageCircle className="mr-1 h-4 w-4" />{" "}
              {post?.commentCount || 0}
            </span>
          </Link>
        </div>
        {/* post edit button  */}
        <div className="flex">
          <Link href={`/posts/${post?._id}`}>
            <Button variant="ghost" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              View
            </Button>
          </Link>
          <Button
            onClick={() => handleEditPost(post)}
            variant="ghost"
            size="sm"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDeletePost(post?._id)}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
