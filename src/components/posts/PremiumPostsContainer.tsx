"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Star } from "lucide-react";
import { useLoadAllPostsQuery } from "@/redux/features/posts/postApi";
import { TPost } from "@/types/TPost";
import PremiumPostCard from "./PostCard";
import { useCommentsCountsForAllPostsQuery } from "@/redux/features/comments/commentApi";
import { TCommentCounts } from "@/types/TCommentCounts";
import ErrorComponent from "../message/ErrorComponent";
import DataNotFound from "../message/DataNotFound";
import { useGetMyProfileQuery } from "@/redux/features/users/userApi";
import { useMemo } from "react";
import { SkeletonCard } from "../skeleton/SkeletonPostCard";

// ------------ premium post container
const PremiumPostsContainer = () => {
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

  // ------------- fetch user profile -----------
  const {
    data: userData,
    isSuccess,
    isLoading: isUserLoading,
  } = useGetMyProfileQuery();

  const shouldShowUpgrade = isSuccess && userData?.data?.premiumAccess;

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
    <div className="container mx-auto ">
      {/* show upgrade premium notification popup  */}
      {!isUserLoading && shouldShowUpgrade && (
        <Alert variant="default" className="mb-8">
          <Star className="h-4 w-4" />
          <AlertTitle>Unlock Premium Content</AlertTitle>
          <AlertDescription className="flex justify-between items-center">
            Upgrade your account to access exclusive travel guides, insider
            tips, and luxury experiences.
            <Button variant="outline" className="ml-4" asChild>
              <Link href="/upgrade">Upgrade Now</Link>
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* premium posts container  */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isPostLoading || isCommentLoading
          ? Array.from({ length: 3 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : postsData.map((post: TPost) => (
              <PremiumPostCard key={post._id} post={post} />
            ))}
      </div>

      {/* premium updgrae box  */}
      {!isUserLoading && shouldShowUpgrade && (
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Ready to Elevate Your Travel Experience?
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            Unlock all our premium content and get access to exclusive travel
            guides, luxury experiences, and insider tips.
          </p>
          <Button size="lg" asChild>
            <Link href="/upgrade">Upgrade to Premium</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default PremiumPostsContainer;
