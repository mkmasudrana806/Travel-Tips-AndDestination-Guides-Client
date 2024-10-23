import PostInputHome from "@/components/PostInputHome";
import FeedPostsContainer from "@/components/posts/FeedPostsContainer";
import React from "react";

// meta data
export const metadata = {
  title: "Travel Tips And Destination Guides | Feeds",
  description:
    "Travel Tips And Destination Guides Feeds. post your travel tips and guide here. also search for travel tips and guide and filter out them",
};

const page = () => {
  return (
    <div>
      <PostInputHome />
      <FeedPostsContainer />
    </div>
  );
};

export default page;
