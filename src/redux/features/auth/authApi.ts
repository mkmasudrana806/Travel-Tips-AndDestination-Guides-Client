import baseApi from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ----------- login an user
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),

    // ----------- register an user
    registerUser: builder.mutation({
      query: (userInfo) => {
        return {
          url: "/users/create-user",
          method: "POST",
          body: userInfo,
        };
      },
    }),

    // change password
    changePassword: builder.mutation({
      query: (newPassword) => {
        return {
          url: `/auth/change-password`,
          method: "POST",
          body: newPassword,
        };
      },
      invalidatesTags: (_result, _error, arg) => [
        { type: "user", id: arg.userId },
      ],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterUserMutation,
  useChangePasswordMutation,
} = authApi;
