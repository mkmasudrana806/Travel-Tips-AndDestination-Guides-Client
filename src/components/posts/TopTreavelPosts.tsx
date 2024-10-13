"use client";
import React from "react";
import PostCard from "./PostCard";
import { TPost } from "@/types/postType";
import { useLoadAllPostsQuery } from "@/redux/features/posts/postApi";
import Loading from "../message/Loading";
import ErrorComponent from "../message/ErrorComponent";
import DataNotFound from "../message/DataNotFound";

const TopTreavelPosts = () => {
  const { data: posts, isLoading, isError } = useLoadAllPostsQuery({});

  // decide what to render
  let content = null;
  // component to render
  if (isLoading) {
    content = <Loading />;
  } else if (!isLoading && isError) {
    content = <ErrorComponent />;
  } else if (!isLoading && !isError && posts?.data?.length === 0) {
    content = <DataNotFound />;
  } else if (!isLoading && !isError && posts?.data?.length > 0) {
    content = posts?.data
      ?.slice(0, 6)
      .map((post: TPost) => <PostCard key={1} post={post} />);
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{content}</div>
  );
};

export default TopTreavelPosts;
