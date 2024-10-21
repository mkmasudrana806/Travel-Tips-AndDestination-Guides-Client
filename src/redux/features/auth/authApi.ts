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

    // forgot password
    forgotPassword: builder.mutation({
      query: (newPassword) => {
        return {
          url: `/auth/forgot-password`,
          method: "POST",
          body: newPassword,
        };
      },
    }),

    // reset password
    resetPassword: builder.mutation({
      query: (newPassword) => {
        return {
          url: `/auth/reset-password`,
          method: "POST",
          body: newPassword,
        };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterUserMutation,
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
