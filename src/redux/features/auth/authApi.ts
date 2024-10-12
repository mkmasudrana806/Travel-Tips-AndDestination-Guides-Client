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
  }),
});

export const { useLoginMutation, useRegisterUserMutation } = authApi;
