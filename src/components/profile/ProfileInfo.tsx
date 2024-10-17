"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar } from "lucide-react";
import {
  useFollowUnfollowUserMutation,
  useGetUserProfileQuery,
} from "@/redux/features/users/userApi";
import { useAppSelector } from "@/redux/hooks";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  id: string;
  totalPosts: number;
};

// ------------------ profile info component
const ProfileInfo: React.FC<Props> = ({ id, totalPosts }) => {
  // ------------ redux
  const { data: user = { data: {} } } = useGetUserProfileQuery(id, {
    skip: !id,
  });
  const [followUnfollowUser, { isLoading }] = useFollowUnfollowUserMutation();
  const loggedInUser = useAppSelector((state) => state.auth.user);

  // -------------- react
  const router = useRouter();
  // destructure the user
  const {
    address,
    email,
    createdAt,
    isVerified,
    profilePicture,
    followers,
    followings,
    name,
  } = user?.data || {};

 
  // check if viewer is following the profile owner
  const isFollowing = followers?.includes(loggedInUser?.userId as string);

  // --------------- handle follow and unfollow user
  const handleFollowToggle = async () => {
    // if the user is not logged in, redirect to login page
    if (!loggedInUser?.userId) {
      router.push("/login");
      return;
    }
    try {
      if (isFollowing) {
        await followUnfollowUser(id);
      } else {
        await followUnfollowUser(id);
      }
    } catch (error) {
      console.log("in catch error: ", error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
          <Avatar className="w-32 h-32">
            <AvatarImage src={profilePicture} alt={name} />
            <AvatarFallback>{name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="text-center md:text-left space-y-2">
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <CardTitle className="text-2xl">{name}</CardTitle>
              {isVerified && <Badge variant="secondary">Verified</Badge>}
            </div>
            <CardDescription>@{email?.split("@")[0]}</CardDescription>
            <p className="text-sm text-muted-foreground">
              {"bio Not availabe at this moment"}
            </p>
            <div className="flex items-center justify-center md:justify-start space-x-4 text-sm text-muted-foreground">
              <span className="flex items-center">
                <MapPin className="mr-1 h-4 w-4" /> {address}
              </span>
              <span className="flex items-center">
                <Calendar className="mr-1 h-4 w-4" /> Joined{" "}
                {new Date(createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <span>
              <strong>{totalPosts || 0}</strong> Posts
            </span>
            <span>
              <strong>{followers?.length || 0}</strong> Followers
            </span>
            <span>
              <strong>{followings?.length || 0}</strong> Following
            </span>
          </div>

          {/* if loggedin user and profile user not same then show button   */}
          {id !== loggedInUser?.userId && (
            <Button
              disabled={isLoading}
              onClick={handleFollowToggle}
              variant={isFollowing ? "secondary" : "default"}
            >
              {isFollowing ? (
                isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Unfollowing...
                  </>
                ) : (
                  "Unfollow"
                )
              ) : isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Following...
                </>
              ) : (
                "Follow"
              )}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileInfo;
