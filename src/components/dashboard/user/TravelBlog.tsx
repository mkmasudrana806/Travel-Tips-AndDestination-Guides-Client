"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreatePostModal from "@/components/posts/CreatePostModal";
import { useAppSelector } from "@/redux/hooks";
import { useGetUserPostsQuery } from "@/redux/features/posts/postApi";
import { useCommentsCountsForAllPostsQuery } from "@/redux/features/comments/commentApi";
import { TPost } from "@/types/postType";
import { TCommentCounts } from "@/types/commentCountsType";
import PostCard from "./PostCard";

// -------------- posts management page
const TravelBlog = () => {
  // ----------- redux
  const userId = useAppSelector((state) => state.auth.user?.userId);
  const {
    data: posts = { data: [] },
    isLoading,
    isError,
    refetch,
  } = useGetUserPostsQuery(userId, {
    skip: !userId,
  });

  // pass posts ids to server to calculate comments of each post
  let postIds = [];
  if (!isLoading && !isError && posts?.data) {
    postIds = posts?.data.map((post: TPost) => post?._id);
  }
  const { data: commentsCounts } = useCommentsCountsForAllPostsQuery(postIds, {
    skip: !postIds.length,
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

  // make categories lists daynamically based on data
  const categories = Array.from(
    new Set(posts?.data.map((post: any) => post?.category))
  );

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Travel Blog</h1>

        {/* create new post  */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Create New Post</Button>
          </DialogTrigger>
          <DialogContent className="xs:max-w-[100%] sm:max-w-[90%] md:max-w-[80%] lg:max-w-[70%] max-h-[100vh] overflow-y-auto">
            <CreatePostModal />
          </DialogContent>
        </Dialog>
      </div>

      {/* categories posts tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Posts</TabsTrigger>
          {categories?.map((category: any) => (
            <TabsTrigger key={category} value={category}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* all posts  */}
        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {postsData?.map((post: TPost) => (
              <PostCard key={post._id} post={post} refetch={refetch} />
            ))}
          </div>
        </TabsContent>

        {/* specific post category  */}
        {categories?.map((category, index) => (
          <TabsContent key={index} value={category as string}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {postsData
                ?.filter((post: TPost) => post.category === category)
                .map((post: TPost) => (
                  <PostCard key={post._id} post={post} refetch={refetch} />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default TravelBlog;
