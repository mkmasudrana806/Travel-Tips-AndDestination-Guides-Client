import baseApi from "@/redux/api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ----------- get current user
    getUserProfile: builder.query({
      query: (userId) => {
        return {
          url: `/users/${userId}`,
        };
      },
      providesTags: (result) => [{ type: "user", id: result?.data?._id }],
    }),

    // get all users
    getAllUsers: builder.query({
      query: () => {
        return {
          url: "/users",
        };
      },
      providesTags: ["users"],
    }),

    // --------- toggle user status active to blocked and vice versa
    toggleUserStatus: builder.mutation({
      query: ({ id, status }) => {
        return {
          url: `/users/toggle-user-status/${id}`,
          method: "PATCH",
          body: { status: status },
        };
      },
      invalidatesTags: ["users"],
    }),

    // --------- toggle user role user to admin and vice versa
    toggleUserRole: builder.mutation({
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
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: "user", id: arg.id }],
    }),

    // ---------- update single user
    updateUser: builder.mutation({
      query: ({ updatedUserData, userId }) => {
        return {
          url: `/users/${userId}`,
          method: "PATCH",
          body: updatedUserData,
        };
      },
      invalidatesTags: (_result, _error, arg) => [
        { type: "user", id: arg.userId },
      ],
    }),

    // follow unfollow user
    followUnfollowUser: builder.mutation({
      query: (targetUserId) => {
        return {
          url: `/users/follow-unfollow/${targetUserId}`,
          method: "PATCH",
        };
      },
      invalidatesTags: (result) => [{ type: "user", id: result?.data?._id }],
    }),

    // get user followersAndFollowings
    getUserFollowersAndFollowigs: builder.mutation({
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
  useGetAllUsersQuery,
  useToggleUserStatusMutation,
  useToggleUserRoleMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useFollowUnfollowUserMutation,
  useGetUserFollowersAndFollowigsMutation,
  useUpgradeUserMutation,
  useVerifiedUserMutation,
} = userApi;
