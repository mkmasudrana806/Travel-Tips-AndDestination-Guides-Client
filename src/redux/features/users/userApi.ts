/* eslint-disable @typescript-eslint/no-unused-vars */
import baseApi from "@/redux/api/baseApi";
import { TApiResponse } from "@/types/TApiResponse";
import { TFollowersFollowing } from "@/types/TFollowersFollowing";
import { TQueryArgs } from "@/types/TPost";
import { TUser } from "@/types/TUser";

type TUserStatusChanged = {
  id: string;
  status: string;
};

type TUserRoleChanged = {
  id: string;
  role: string;
};

type TFollowersFollowingReq = {
  followers: string[] | undefined;
  followings: string[] | undefined;
};

const userApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // ----------- get a user profile ------------
    getUserProfile: builder.query<TApiResponse<TUser>, string>({
      query: (userId) => {
        return {
          url: `/users/${userId}`,
        };
      },
      providesTags: (result) => [{ type: "user", id: result?.data?._id }],
    }),

    // ----------- get my profile ----------
    getMyProfile: builder.query<TApiResponse<TUser>, void>({
      query: () => {
        return {
          url: `/users/getMe`,
        };
      },
      providesTags: (result) => [{ type: "user", id: result?.data?._id }],
    }),

    // ----------- update user profile -----------
    updateUserProfilePicture: builder.mutation<TApiResponse<TUser>, FormData>({
      query: (file) => {
        return {
          url: `/users/update-profile-picture`,
          method: "PATCH",
          body: file,
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: "user", id: result?.data?._id },
      ],
    }),

    // get all users
    getAllUsers: builder.query<TApiResponse<TUser[]>, TQueryArgs>({
      query: () => {
        return {
          url: "/users",
        };
      },
      providesTags: ["users"],
    }),

    // --------- toggle user status active to blocked and vice versa
    toggleUserStatus: builder.mutation<TApiResponse<TUser>, TUserStatusChanged>(
      {
        query: ({ id, status }) => {
          return {
            url: `/users/toggle-user-status/${id}`,
            method: "PATCH",
            body: { status: status },
          };
        },
        invalidatesTags: ["users"],
      },
    ),

    // --------- toggle user role user to admin and vice versa
    toggleUserRole: builder.mutation<TApiResponse<string>, TUserRoleChanged>({
      query: ({ id, role }) => {
        return {
          url: `/users/toggle-user-role/${id}`,
          method: "PATCH",
          body: { role: role },
        };
      },
      invalidatesTags: ["users"],
    }),

    // ---------- delete single user
    deleteUser: builder.mutation<TApiResponse<boolean>, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: "user", id: arg }],
    }),

    // ---------- update single user
    updateUser: builder.mutation<TApiResponse<TUser>, Partial<TUser>>({
      query: (updatedUserData) => {
        return {
          url: `/users/update-profile`,
          method: "PATCH",
          body: updatedUserData,
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: "user", id: result?.data?._id },
      ],
    }),

    // follow unfollow user
    followUnfollowUser: builder.mutation<TApiResponse<TUser>, string>({
      query: (targetUserId) => {
        return {
          url: `/users/follow-unfollow/${targetUserId}`,
          method: "PATCH",
        };
      },
      invalidatesTags: (result) => [{ type: "user", id: result?.data?._id }],
    }),

    // get user followersAndFollowings
    getUserFollowersAndFollowigs: builder.mutation<
      TApiResponse<TFollowersFollowing>,
      TFollowersFollowingReq
    >({
      query: (userids) => {
        return {
          url: `/users/followers-followings`,
          method: "POST",
          body: userids,
        };
      },
    }),

    // upgrade user
    upgradeUser: builder.mutation({
      query: ({ paymentData, userId }) => {
        return {
          url: `/users/premium-access`,
          method: "POST",
          body: paymentData,
        };
      },
      invalidatesTags: (_result, _error, arg) => [
        { type: "user", id: arg.userId },
      ],
    }),

    // verified user
    verifiedUser: builder.mutation({
      query: ({ paymentData, userId }) => {
        return {
          url: `/users/user-verified`,
          method: "POST",
          body: paymentData,
        };
      },
      invalidatesTags: (_result, _error, arg) => [
        { type: "user", id: arg.userId },
      ],
    }),
  }),
});

export const {
  useGetUserProfileQuery,
  useGetMyProfileQuery,
  useGetAllUsersQuery,
  useUpdateUserProfilePictureMutation,
  useToggleUserStatusMutation,
  useToggleUserRoleMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useFollowUnfollowUserMutation,
  useGetUserFollowersAndFollowigsMutation,
  useUpgradeUserMutation,
  useVerifiedUserMutation,
} = userApi;
