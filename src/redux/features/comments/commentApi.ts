import baseApi from "../../api/baseApi";

const commentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ---------- create a comment into db
    createComment: builder.mutation({
      query: (newComment) => {
        return {
          url: `/comments/create-comment`,
          method: "POST",
          body: newComment,
        };
      },
      invalidatesTags: ["comments"],
    }),

    // ---------- get comments of a post
    loadCommentsOfPost: builder.query({
      query: (commentId) => {
        return { url: `/comments/${commentId}` };
      },
      providesTags: ["comments-post"],
    }),

    // --------- load all comment
    loadAllComments: builder.query({
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

        return { url: `/comment?${params.toString()}` };
      },
      providesTags: ["comments"],
    }),

    // ---------- load single comment
    getCommentById: builder.query({
      query: (id) => ({
        url: `/comment/${id}`,
      }),
      providesTags: (_result, _error, arg) => [{ type: "comment", id: arg.id }],
    }),

    // ---------- delete single comment
    deleteComment: builder.mutation({
      query: (id) => ({
        url: `/comment/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: "comment", id: arg.id },
      ],
    }),

    // ---------- update single comment
    updateComment: builder.mutation({
      query: ({ comment, commentId }) => {
        return {
          url: `/comment/${commentId}`,
          method: "PATCH",
          body: comment,
        };
      },
      invalidatesTags: ["comment"],
    }),
  }),
});

export const {
  useCreateCommentMutation,
  useLoadAllCommentsQuery,
  useLoadCommentsOfPostQuery,
  useGetCommentByIdQuery,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} = commentApi;
