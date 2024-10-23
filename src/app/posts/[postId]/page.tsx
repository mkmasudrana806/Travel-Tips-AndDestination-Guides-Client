import PostDetailsPage from "@/components/posts/PostDetailsPage";
import React from "react";

// meta data
export const metadata = {
  title: "Travel Tips And Destination Guides | Details Travel Post",
  description:
    "Travel Tips And Destination Guides | Details Travel Post gives you details about travel tips and destinations",
};

const page = ({ params }: { params: { postId: string } }) => {
  return (
    <div>
      <PostDetailsPage id={params?.postId} />
    </div>
  );
};

export default page;
