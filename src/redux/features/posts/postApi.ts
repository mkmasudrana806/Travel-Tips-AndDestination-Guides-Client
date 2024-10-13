import baseApi from "../../api/baseApi";

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
    loadAllPosts: builder.query({
      query: ({ searchTerm, sort, limit, page, ...others }) => {
        const params = new URLSearchParams();
        // Search term
        if (searchTerm) {
          params.append("searchTerm", searchTerm);
        }

        // Sorting
        if (sort) {
          params.append("sort", sort);
        }
        // Pagination
        if (limit) {
          params.append("limit", limit.toString());
        }
        if (page) {
          params.append("page", page.toString());
        }

        // Handle dynamic properties in "others"
        Object.keys(others).forEach((key) => {
          if (others[key]) {
            params.append(key, others[key].toString());
          }
        });

        return { url: `/posts?${params.toString()}` };
      },
      providesTags: ["posts"],
    }),

    // ---------- load single post
    getPostById: builder.query({
      query: (id) => ({
        url: `/post/${id}`,
      }),
      providesTags: (_result, _error, arg) => [{ type: "post", id: arg.id }],
    }),

    // ---------- delete single post
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/post/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: "post", id: arg.id }],
    }),

    // ---------- update single post
    updatePost: builder.mutation({
      query: ({ post, postId }) => {
        return {
          url: `/post/${postId}`,
          method: "PATCH",
          body: post,
        };
      },
      invalidatesTags: ["post"],
    }),

    // ---------- upvote a post
    upvotePost: builder.mutation({
      query: (postId) => {
        return {
          url: `/posts/upvote/${postId}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["posts"],
    }),

    // ---------- downvote a post
    downVotePost: builder.mutation({
      query: (postId) => {
        return {
          url: `/posts/downvote/${postId}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["posts"],
    }),
  }),
});

export const {
  useCreatePostMutation,
  useLoadAllPostsQuery,
  useGetPostByIdQuery,
  useDeletePostMutation,
  useUpdatePostMutation,
  useUpvotePostMutation,
  useDownVotePostMutation,
} = postApi;

export const { loadAllPosts } = postApi.endpoints;
