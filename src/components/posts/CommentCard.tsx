import { MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { TComment } from "@/types/commentType";
import { useDispatch } from "react-redux";
import { setEditCommentData } from "@/redux/features/comments/commentsSlice";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useState } from "react";
import UpdateCommentForm from "./UpdateCommentModal";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { useDeleteCommentMutation } from "@/redux/features/comments/commentApi";

type Props = {
  postOwnerId: string;
  comment: TComment;
};
// ------------ comment card component
const CommentCard: React.FC<Props> = ({ postOwnerId, comment }) => {
  // -------------- redux
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [deleteComment, { reset }] = useDeleteCommentMutation();

  // ----------- react
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ------------handle edit comment
  const handleEdit = (comment: TComment) => {
    dispatch(
      setEditCommentData({
        _id: comment?._id,
        postId: comment?.postId,
        comment: comment?.comment,
      })
    );
    setIsModalOpen(true);
  };

  // ------------ handle delete comment
  const handleDelete = async (id: string) => {
    // check if the user is logged in
    if (!user) {
      router.push("/login");
      return;
    }
    try {
      const result: any = await deleteComment(id);
      if (result?.data?.success) {
        reset();
      } else {
        console.log("coment deleted error");
      }
      console.log("result: ", result);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <>
      <Card key={comment._id}>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">{comment?.userId?.name}</CardTitle>
            {/* show edit and delete button for owner of this comment and post owner */}
            {(user?.userId === comment?.userId?._id ||
              postOwnerId === user?.userId) && (
              <div className="cursor-pointer">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {user?.userId === comment?.userId?._id && (
                      <DropdownMenuItem onClick={() => handleEdit(comment)}>
                        Edit
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem
                      onClick={() => handleDelete(comment?._id)}
                      className="text-red-600"
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
          <CardDescription>
            {new Date(comment?.createdAt).toLocaleString()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>{comment?.comment}</p>
        </CardContent>
      </Card>

      {/* open modal to edit comment */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Comment</DialogTitle>
            <DialogDescription>write your comment here</DialogDescription>
          </DialogHeader>
          <UpdateCommentForm setIsModalOpen={setIsModalOpen} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CommentCard;
