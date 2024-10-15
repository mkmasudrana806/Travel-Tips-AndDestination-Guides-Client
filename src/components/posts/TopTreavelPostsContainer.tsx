"use client";
import React from "react";
import PostCard from "./FeaturedPostCard";
import { TPost } from "@/types/postType";
import { useLoadAllPostsQuery } from "@/redux/features/posts/postApi";
import Loading from "../message/Loading";
import ErrorComponent from "../message/ErrorComponent";
import DataNotFound from "../message/DataNotFound";
import { useCommentsCountsForAllPostsQuery } from "@/redux/features/comments/commentApi";
import { TCommentCounts } from "@/types/commentCountsType";

const TopTreavelPostsContainer = () => {
  // --------------- redux
  const { data: posts, isLoading, isError } = useLoadAllPostsQuery({});
  let postIds = [];
  if (!isLoading && !isError && posts?.data) {
    postIds = posts.data.map((post: TPost) => post._id);
  }
  const { data: commentsCounts } = useCommentsCountsForAllPostsQuery(postIds, {
    skip: !postIds.length,
  });

  // push comment counts for all posts
  const postsData = posts?.data?.map((post: TPost) => {
    const commentData = commentsCounts?.data?.find(
      (c: TCommentCounts) => c._id === post._id
    );
    return {
      ...post,
      commentCount: commentData?.count,
    };
  });

  // decide what to render
  let content = null;
  // component to render
  if (isLoading) {
    content = <Loading />;
  } else if (!isLoading && isError) {
    content = <ErrorComponent />;
  } else if (!isLoading && !isError && postsData?.length === 0) {
    content = <DataNotFound />;
  } else if (!isLoading && !isError && postsData?.length > 0) {
    content = postsData
      ?.slice(0, 6)
      .map((post: TPost) => <PostCard key={post._id} post={post} />);
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{content}</div>
  );
};

export default TopTreavelPostsContainer;
