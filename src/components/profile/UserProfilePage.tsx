"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileInfo from "./ProfileInfo";
import {
  useGetUserFollowersAndFollowigsMutation,
  useGetUserProfileQuery,
} from "@/redux/features/users/userApi";
import { useGetUserPostsQuery } from "@/redux/features/posts/postApi";
import { TPost } from "@/types/postType";
import UserPostCard from "./UserPostCard";

export default function UserProfilePage({ id }: { id: string }) {
  // Fetch user profile with RTK Query
  const { data: user = { data: {} }, isLoading: userLoading } =
    useGetUserProfileQuery(id, {
      skip: !id,
    });
  // Mutation to send followers and followings
  const [getUserFollowersAndFollowigs] =
    useGetUserFollowersAndFollowigsMutation();
  // fetch user posts
  const {
    data: userPosts = { data: [] },
    isLoading: postsLoading,
    refetch,
  } = useGetUserPostsQuery(id, {
    skip: !id,
  });

  // followers and followings users
  const [followers, setFollowers] = useState([]);
  const [followings, setFollowings] = useState([]);

  // followers and followings data fetch
  useEffect(() => {
    const fetchFollowersFollowings = async () => {
      const result = await getUserFollowersAndFollowigs({
        followers: user?.data?.followers,
        followings: user?.data?.followings,
      });
      setFollowers(result?.data?.data?.followerLists);
      setFollowings(result?.data?.data?.followingLists);
    };
    fetchFollowersFollowings();
  }, [
    user?.data?.followers,
    user?.data?.followings,
    id,
    getUserFollowersAndFollowigs,
  ]);

  if (userLoading || postsLoading) {
    return <div>Loading...</div>; // Show loading state
  }

  return (
    <div className="container mx-auto py-8">
      {/* user profile information  */}
      <ProfileInfo totalPosts={userPosts?.data?.length} id={id} />

      {/* followers, following and posts tabs  */}
      <Tabs defaultValue="posts" className="mt-8">
        <TabsList>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="followers">Followers</TabsTrigger>
          <TabsTrigger value="following">Following</TabsTrigger>
        </TabsList>

        {/* user posts container  */}
        <TabsContent value="posts">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {userPosts?.data?.map((post: TPost) => (
              <UserPostCard refetch={refetch} key={post?._id} post={post} />
            ))}
            {!userPosts?.data?.length && (
              <h1 className="text-2xl text-green-6000  ">No Posts</h1>
            )}
          </div>
        </TabsContent>

        {/* followers  */}
        <TabsContent value="followers">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {followers?.map((follower: any) => (
              <Card key={follower?._id}>
                <CardContent className="flex items-center space-x-4 py-4">
                  <Avatar>
                    <AvatarImage
                      src={follower?.profilePicture}
                      alt={follower?.name}
                    />
                    <AvatarFallback>{follower?.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{follower?.name}</p>
                    <Link href={`/profile/${follower?._id}`}>
                      <p className="text-sm text-muted-foreground">
                        @{follower?.name?.split("@")[0]}
                      </p>
                    </Link>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" asChild className="w-full">
                    <Link href={`/profile/${follower?._id}`}>View Profile</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
            {!followers?.length && (
              <h1 className="text-2xl text-green-6000  ">No followers</h1>
            )}
          </div>
        </TabsContent>

        {/* followings  */}
        <TabsContent value="following">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {followings?.map((followedUser: any) => (
              <Card key={followedUser?._id}>
                <CardContent className="flex items-center space-x-4 py-4">
                  <Avatar>
                    <AvatarImage
                      src={followedUser?.profilePicture}
                      alt={followedUser?.name}
                    />
                    <AvatarFallback>
                      {followedUser?.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{followedUser?.name}</p>
                    <Link href={`/profile/${followedUser?._id}`}>
                      <p className="text-sm text-muted-foreground">
                        @{followedUser?.email?.split("@")[0]}
                      </p>
                    </Link>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" asChild className="w-full">
                    <Link href={`/profile/${followedUser?._id}`}>
                      View Profile
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
            {!followings?.length && (
              <h1 className="text-2xl text-green-6000  ">No following users</h1>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
