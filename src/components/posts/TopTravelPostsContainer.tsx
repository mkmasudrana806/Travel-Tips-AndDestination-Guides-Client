"use client";
import React, { useMemo } from "react";
import FeaturedPostCard from "./FeaturedPostCard";
import { TPost } from "@/types/TPost";
import { useLoadAllPostsQuery } from "@/redux/features/posts/postApi";
import ErrorComponent from "../message/ErrorComponent";
import DataNotFound from "../message/DataNotFound";
import { useCommentsCountsForAllPostsQuery } from "@/redux/features/comments/commentApi";
import { TCommentCounts } from "@/types/TCommentCounts";
import { SkeletonCard } from "../skeleton/SkeletonPostCard";

const TopTreavelPostsContainer = () => {
  // --------------- fetch posts ------------
  const {
    data: posts,
    isLoading: isPostLoading,
    isError: isPostError,
  } = useLoadAllPostsQuery({ premium: false });

  const postIds = useMemo(
    () => posts?.data?.map((post: TPost) => post._id) || [],
    [posts?.data],
  );

  // ------------ fetch comments ------------

  const { data: commentsCounts, isLoading: isCommentLoading } =
    useCommentsCountsForAllPostsQuery(postIds, {
      skip: postIds.length === 0,
    });

  // ----------- merge each post's comments count ------
  const postsData = useMemo(() => {
    if (!posts?.data || !posts?.data.length) return [];
    return posts?.data?.slice(0, 6).map((post: TPost) => {
      const match = commentsCounts?.data?.find(
        (c: TCommentCounts) => c._id === post._id,
      );
      return {
        ...post,
        commentCount: match?.count || 0,
      };
    });
  }, [posts?.data, commentsCounts?.data]);

  if (isPostError) return <ErrorComponent />;
  if (!isPostLoading && !isCommentLoading && postsData.length === 0)
    return <DataNotFound />;

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {isPostLoading || isCommentLoading
        ? Array.from({ length: 3 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))
        : postsData.map((post: TPost) => (
            <FeaturedPostCard key={post._id} post={post} />
          ))}
    </div>
  );
};

export default TopTreavelPostsContainer;
