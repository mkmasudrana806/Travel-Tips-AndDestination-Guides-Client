import { TApiResponse } from "@/types/TApiResponse";
import baseApi from "../../api/baseApi";
import { PostQueryArgs, TPost } from "@/types/TPost";

const postApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ---------- create a post into db
    createPost: builder.mutation({
      query: (newPost) => {
        return {
          url: `/posts/create-post`,
          method: "POST",
          body: newPost,
        };
      },
      invalidatesTags: ["posts"],
    }),

    // --------- load all post
    loadAllPosts: builder.query<TApiResponse<TPost[]>, PostQueryArgs>({
      query: (args) => {
        const params = new URLSearchParams();
        Object.entries(args).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "default") {
            params.append(key, value.toString());
          }
        });

        return { url: "/posts", params };
      },
      providesTags: ["posts"],
    }),

    // --------- get user posts
    getUserPosts: builder.query({
      query: (userId) => {
        return { url: `/posts/my-posts/${userId}` };
      },
      providesTags: (_result, _error, arg) => [
        { type: "user-posts", id: arg.userId },
      ],
    }),

    // ---------- load single post
    getPostById: builder.query({
      query: (id) => ({
        url: `/posts/${id}`,
      }),
      providesTags: (_result, _error, arg) => [{ type: "post", id: arg.id }],
    }),

    // ---------- delete single post
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: "user-posts", id: arg },
      ],
    }),

    // ---------- update single post
    updatePost: builder.mutation({
      query: ({ postId, post }) => {
        return {
          url: `/posts/${postId}`,
          method: "PATCH",
          body: post,
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: "post", id: arg.postId },
      ],
    }),

    // ---------- upvote a post
    upvotePost: builder.mutation({
      query: (postId) => {
        return {
          url: `/posts/upvote/${postId}`,
          method: "PATCH",
        };
      },
      invalidatesTags: (_result, _error, arg) => [
        { type: "posts" },
        { type: "post", id: arg },
      ],
    }),

    // ---------- downvote a post
    downVotePost: builder.mutation({
      query: (postId) => {
        return {
          url: `/posts/downvote/${postId}`,
          method: "PATCH",
        };
      },
      invalidatesTags: (_result, _error, arg) => [
        { type: "posts" },
        { type: "post", id: arg },
      ],
    }),
  }),
});

export const {
  useCreatePostMutation,
  useLoadAllPostsQuery,
  useGetUserPostsQuery,
  useGetPostByIdQuery,
  useDeletePostMutation,
  useUpdatePostMutation,
  useUpvotePostMutation,
  useDownVotePostMutation,
} = postApi;

export const { loadAllPosts } = postApi.endpoints;
