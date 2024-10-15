import PostInputHome from "@/components/PostInputHome";
import FeedPostsContainer from "@/components/posts/FeedPostsContainer";
import React from "react";

const page = () => {
  return (
    <div>
      <PostInputHome />
      <FeedPostsContainer />
    </div>
  );
};

export default page;
