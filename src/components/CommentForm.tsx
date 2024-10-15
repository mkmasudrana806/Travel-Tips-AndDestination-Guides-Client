"use client";
import { useCreateCommentMutation } from "@/redux/features/comments/commentApi";
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

type Props = {
  id: string;
  refetchComment: () => void;
};
const CommentForm: React.FC<Props> = ({ id, refetchComment }) => {
  // ------------ redux
  const user = useAppSelector((state) => state.auth.token);
  const [createComment] = useCreateCommentMutation();

  // ----------- react
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [comment, setComment] = useState("");
  const router = useRouter();

  // -------------- handle submit comment -----------------
  const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // check if the user is logged in
    if (!user) {
      router.push("/register");
      return;
    }
    const newComment = { postId: id, comment: comment };
    setError("");
    if (!comment) {
      setError("No comment is written!");
      return;
    }
    try {
      const result: any = await createComment(newComment);
      if (result?.data?.success) {
        setSuccess("Comment posted successfully!");
        setComment("");
        refetchComment();
        setTimeout(() => setSuccess(""), 1000);
      } else {
        setError(result?.error?.data?.message);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <form onSubmit={handleCommentSubmit}>
      <Textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Share your thoughts..."
        className="mb-4"
      />
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {success && (
        <Alert
          variant="default"
          className="mb-4 bg-green-50 text-green-800 border-green-300"
        >
          <CheckCircle2 className="h-4 w-4" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}
      <Button type="submit">Post Comment</Button>
    </form>
  );
};

export default CommentForm;
