import { TUser } from "./TUser";

export type TFollowersFollowing = {
  followerLists: Partial<TUser>[];
  followingLists: Partial<TUser>[];
};