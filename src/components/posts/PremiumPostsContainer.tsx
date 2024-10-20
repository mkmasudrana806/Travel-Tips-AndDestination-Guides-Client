"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Star } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";
import { useLoadAllPostsQuery } from "@/redux/features/posts/postApi";
import { TPost } from "@/types/postType";
import PremiumPostCard from "./PostCard";
import { useCommentsCountsForAllPostsQuery } from "@/redux/features/comments/commentApi";
import { TCommentCounts } from "@/types/commentCountsType";
import Loading from "../message/Loading";
import ErrorComponent from "../message/ErrorComponent";
import DataNotFound from "../message/DataNotFound";
const PremiumPostsContainer = () => {
  // -------------- redux
  const user = useAppSelector((state) => state?.auth?.user);
  const {
    data: posts,
    isLoading: isPostLoading,
    isError,
  } = useLoadAllPostsQuery({ premium: true });

  let postIds = [];
  if (!isPostLoading && !isError && posts?.data) {
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

  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   setLoading(true);
  // }, [setLoading]);

  if (isPostLoading) {
    return <h1>Loading...</h1>;
  }
  // --------- decide what to render for comments
  let premiumPostsContent = null;
  if (isPostLoading) {
    premiumPostsContent = <Loading />;
  } else if (!isPostLoading && isError) {
    premiumPostsContent = <ErrorComponent />;
  } else if (!isPostLoading && !isError && postsData.length === 0) {
    premiumPostsContent = <DataNotFound />;
  } else if (!isPostLoading && !isError && postsData.length > 0) {
    premiumPostsContent = postsData.map((post: TPost) => (
      <PremiumPostCard key={post._id} post={post} />
    ));
  }

  return (
    <div className="container mx-auto ">
      {/* show upgrade premium notification popup  */}
      {!user?.premiumAccess && (
        <Alert variant="default" className="mb-8">
          <Star className="h-4 w-4" />
          <AlertTitle>Unlock Premium Content</AlertTitle>
          <AlertDescription>
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
        {premiumPostsContent}
      </div>

      {/* premium updgrae box  */}
      {!user?.premiumAccess && (
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
