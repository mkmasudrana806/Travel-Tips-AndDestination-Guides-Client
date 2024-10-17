"use client";

import React, { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "../ui/button";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { useUpdateCommentMutation } from "@/redux/features/comments/commentApi";

type Props = {
  setIsModalOpen: (parameter: boolean) => void;
};
// -------------update comment form
const UpdateCommentForm: React.FC<Props> = ({ setIsModalOpen }) => {
  // ------------ redux
  const editCommentData = useAppSelector(
    (state) => state.comments.editCommentData
  );

  const user = useAppSelector((state) => state.auth.token);
  const [updateComment] = useUpdateCommentMutation();

  // ----------- react
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [comment, setComment] = useState("");
  const router = useRouter();

  // --------- watch changes for update comment
  useEffect(() => {
    if (editCommentData) {
      setComment(editCommentData?.comment);
    }
  }, [editCommentData, setComment]);

  // -------------- handle submit comment -----------------
  const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // check if the user is logged in
    if (!user) {
      router.push("/register");
      return;
    }

    setError("");
    if (!comment) {
      setError("No comment is written!");
      return;
    }
    try {
      const updatedComment = {
        ...editCommentData,
        comment: comment,
      };
      const result: any = await updateComment(updatedComment);
      if (result?.data?.success) {
        setSuccess("Comment updated successfully!");
        setComment("");
        setTimeout(() => setSuccess(""), 1000);
        setIsModalOpen(false);
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
      <Button type="submit">Update Comment</Button>
    </form>
  );
};

export default UpdateCommentForm;
