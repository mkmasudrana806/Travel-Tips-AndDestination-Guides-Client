import PostDetailsPage from "@/components/posts/PostDetailsPage";
import React from "react";

const page = ({ params }: { params: { postId: string } }) => {
  return (
    <div>
      <PostDetailsPage id={params?.postId} />
    </div>
  );
};

export default page;
