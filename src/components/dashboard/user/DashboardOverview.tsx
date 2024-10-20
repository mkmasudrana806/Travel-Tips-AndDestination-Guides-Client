"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowBigDown,
  ArrowBigUp,
  Calendar,
  Globe,
  MapPin,
  MessageCircle,
  PenSquare,
  User,
} from "lucide-react";
import { useAppSelector } from "@/redux/hooks";
import { useGetUserPostsQuery } from "@/redux/features/posts/postApi";
import { useGetUserProfileQuery } from "@/redux/features/users/userApi";
import { TPost } from "@/types/postType";
import { useCommentsCountsForAllPostsQuery } from "@/redux/features/comments/commentApi";
import { TCommentCounts } from "@/types/commentCountsType";
import Link from "next/link";

const DashboardOverview = () => {
  // ----------- redux
  const userId = useAppSelector((state) => state.auth.user?.userId);
  const {
    data: posts = { data: [] },
    isLoading,
    isError,
  } = useGetUserPostsQuery(userId, {
    skip: !userId,
  });
  const { data: userProfile = { data: {} } } = useGetUserProfileQuery(userId, {
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

  // ---------- react
  const totalFollowers = userProfile?.data?.followers?.length || 0;
  const totalFollowings = userProfile?.data?.followings?.length || 0;

  const [activeTab, setActiveTab] = useState("overview");

  // upcomming trips details static now
  const upcomingTrips = [
    { id: 1, destination: "Tokyo, Japan", date: "Aug 15 - Aug 25, 2023" },
    { id: 2, destination: "Santorini, Greece", date: "Sep 5 - Sep 12, 2023" },
  ];

  // ---------- upvote and downvote status
  const isUpvoted = posts?.upvotes?.includes(userId as string);
  const isDownvoted = posts?.downvotes?.includes(userId as string);

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

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Welcome back, John!</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* total posts  */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            <PenSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{posts?.data?.length}</div>
          </CardContent>
        </Card>

        {/* followers  */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Followers</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalFollowers}</div>
          </CardContent>
        </Card>

        {/* followings  */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Following</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalFollowings}</div>
          </CardContent>
        </Card>

        {/* travel points  */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Travel Points</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
          </CardContent>
        </Card>
      </div>

      {/* tabs for overview, recent posts, upcomming posts */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="posts">Recent Posts</TabsTrigger>
          <TabsTrigger value="trips">Upcoming Trips</TabsTrigger>
        </TabsList>

        {/* overview  */}
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Travel Goal Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>Visit 10 countries</div>
                  <div>7/10</div>
                </div>
                <Progress value={70} className="w-full" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <PenSquare className="h-4 w-4 mr-2" />
                  <span>You posted My Adventure in Bali </span>
                </li>
                <li className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  <span>Alex started following you</span>
                </li>
                <li className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>You added Tokyo to your travel wishlist</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        {/* posts  */}
        <TabsContent value="posts" className="space-y-4">
          {postsData?.map((post: TPost) => (
            <Card key={post?._id}>
              <CardHeader>
                <CardTitle>
                  <Link href={`/posts/${post?._id}`}>{post?.title}</Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm text-muted-foreground">
                  {/* upvote, downvote  */}
                  <div className="flex items-center space-x-2 p-2 rounded-lg text-gray-600 font-medium">
                    <ArrowBigUp
                      className={`h-6 w-6 hover:text-green-600 cursor-pointer ${
                        isUpvoted ? "text-green-600" : ""
                      }`}
                    />
                    <span>{post?.upvotes?.length}</span>
                    <ArrowBigDown
                      className={`h-6 w-6 hover:text-red-600 cursor-pointer ${
                        isDownvoted ? "text-red-600" : ""
                      }`}
                    />
                    <span>{post?.downvotes?.length}</span>
                  </div>
                  {/* comment  */}
                  <Link href={`/posts/${post?._id}`}>
                    <span className="flex">
                      <MessageCircle className="mr-1 h-4 w-4" />{" "}
                      {post?.commentCount || 0}
                    </span>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* trips  */}
        <TabsContent value="trips" className="space-y-4">
          {upcomingTrips.map((trip) => (
            <Card key={trip.id}>
              <CardHeader>
                <CardTitle>{trip.destination}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{trip.date}</span>
                </div>
              </CardContent>
            </Card>
          ))}
          <Button className="w-full">Plan a New Trip</Button>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardOverview;
