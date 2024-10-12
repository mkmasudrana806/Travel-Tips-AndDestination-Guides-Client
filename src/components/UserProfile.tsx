"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThumbsUp, MessageCircle, MapPin, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";

// Mock data (replace with actual API calls in a real application)
const userData = {
  id: "1",
  name: "Jane Traveler",
  username: "janetraveler",
  avatar: "/placeholder.svg?height=200&width=200",
  bio: "Passionate traveler | Photography enthusiast | 30 countries and counting",
  location: "New York, USA",
  joinedDate: "2023-01-15",
  postsCount: 45,
  followersCount: 1230,
  followingCount: 385,
  isVerified: true,
};

const userPosts = [
  {
    id: 1,
    title: "Exploring the Hidden Gems of Kyoto",
    likes: 245,
    comments: 32,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    title: "A Foodie's Guide to Barcelona",
    likes: 189,
    comments: 27,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    title: "Trekking the Inca Trail: Tips and Tricks",
    likes: 312,
    comments: 45,
    image: "/placeholder.svg?height=200&width=300",
  },
];

const followers = [
  {
    id: 1,
    name: "Alex Hiker",
    username: "alexhiker",
    avatar: "/placeholder.svg?height=50&width=50",
  },
  {
    id: 2,
    name: "Sarah Explorer",
    username: "sarahexplorer",
    avatar: "/placeholder.svg?height=50&width=50",
  },
  {
    id: 3,
    name: "Mike Adventurer",
    username: "mikeadventurer",
    avatar: "/placeholder.svg?height=50&width=50",
  },
];

const following = [
  {
    id: 1,
    name: "Emma Photographer",
    username: "emmaphotographer",
    avatar: "/placeholder.svg?height=50&width=50",
  },
  {
    id: 2,
    name: "David Foodie",
    username: "davidfoodie",
    avatar: "/placeholder.svg?height=50&width=50",
  },
  {
    id: 3,
    name: "Lisa Backpacker",
    username: "lisabackpacker",
    avatar: "/placeholder.svg?height=50&width=50",
  },
];

export default function UserProfilePage() {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(userData.followersCount);
  const router = useRouter();

  useEffect(() => {
    // Simulating data fetching based on the user ID
    // In a real application, you would fetch the user data here
    console.log("Fetching user data for ID:", router);
  }, [router]);

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
    setFollowerCount(isFollowing ? followerCount - 1 : followerCount + 1);
    // In a real application, you would send this update to your backend
  };

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <Avatar className="w-32 h-32">
              <AvatarImage src={userData.avatar} alt={userData.name} />
              <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="text-center md:text-left space-y-2">
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <CardTitle className="text-2xl">{userData.name}</CardTitle>
                {userData.isVerified && (
                  <Badge variant="secondary">Verified</Badge>
                )}
              </div>
              <CardDescription>@{userData.username}</CardDescription>
              <p className="text-sm text-muted-foreground">{userData.bio}</p>
              <div className="flex items-center justify-center md:justify-start space-x-4 text-sm text-muted-foreground">
                <span className="flex items-center">
                  <MapPin className="mr-1 h-4 w-4" /> {userData.location}
                </span>
                <span className="flex items-center">
                  <Calendar className="mr-1 h-4 w-4" /> Joined{" "}
                  {new Date(userData.joinedDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <span>
                <strong>{userData.postsCount}</strong> Posts
              </span>
              <span>
                <strong>{followerCount}</strong> Followers
              </span>
              <span>
                <strong>{userData.followingCount}</strong> Following
              </span>
            </div>
            <Button
              onClick={handleFollowToggle}
              variant={isFollowing ? "secondary" : "default"}
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="posts" className="mt-8">
        <TabsList>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="followers">Followers</TabsTrigger>
          <TabsTrigger value="following">Following</TabsTrigger>
        </TabsList>
        <TabsContent value="posts">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {userPosts.map((post) => (
              <Card key={post.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={300}
                    height={200}
                    className="rounded-md mb-4"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span className="flex items-center">
                      <ThumbsUp className="mr-1 h-4 w-4" /> {post.likes}
                    </span>
                    <span className="flex items-center">
                      <MessageCircle className="mr-1 h-4 w-4" /> {post.comments}
                    </span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" asChild className="w-full">
                    <Link href={`/post/${post.id}`}>View Post</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="followers">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {followers.map((follower) => (
              <Card key={follower.id}>
                <CardContent className="flex items-center space-x-4 py-4">
                  <Avatar>
                    <AvatarImage src={follower.avatar} alt={follower.name} />
                    <AvatarFallback>{follower.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{follower.name}</p>
                    <p className="text-sm text-muted-foreground">
                      @{follower.username}
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" asChild className="w-full">
                    <Link href={`/profile/${follower.id}`}>View Profile</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="following">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {following.map((followedUser) => (
              <Card key={followedUser.id}>
                <CardContent className="flex items-center space-x-4 py-4">
                  <Avatar>
                    <AvatarImage
                      src={followedUser.avatar}
                      alt={followedUser.name}
                    />
                    <AvatarFallback>
                      {followedUser.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{followedUser.name}</p>
                    <p className="text-sm text-muted-foreground">
                      @{followedUser.username}
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" asChild className="w-full">
                    <Link href={`/profile/${followedUser.id}`}>
                      View Profile
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
