import baseApi from "../../api/baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ---------- create a payment into db
    createPayment: builder.mutation({
      query: (newPayment) => {
        return {
          url: `/payments/create-payment`,
          method: "POST",
          body: newPayment,
        };
      },
      invalidatesTags: ["payments"],
    }),

    // --------- load all payment
    loadAllPayments: builder.query({
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
          if (others[key] && others[key] !== "default") {
            params.append(key, others[key].toString());
          }
        });

        return { url: `/payments?${params.toString()}` };
      },
      providesTags: ["payments"],
    }),

    // --------- get user payments
    getUserPayments: builder.query({
      query: (userId) => {
        return { url: `/payments/my-payments-history` };
      },
      providesTags: (_result, _error, arg) => [
        { type: "user-payments", id: arg },
      ],
    }),

    // ---------- load single payment
    getPaymentById: builder.query({
      query: (id) => ({
        url: `/payments/${id}`,
      }),
      providesTags: (_result, _error, arg) => [{ type: "payment", id: arg.id }],
    }),

    // ---------- delete single payment
    deletePayment: builder.mutation({
      query: (id) => ({
        url: `/payments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: "user-payments", id: arg },
      ],
    }),

    // ---------- update single payment
    updatePayment: builder.mutation({
      query: ({ paymentId, payment }) => {
        return {
          url: `/payments/${paymentId}`,
          method: "PATCH",
          body: payment,
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: "payment", id: arg.paymentId },
      ],
    }),

    // ---------- upvote a payment
    upvotePayment: builder.mutation({
      query: (paymentId) => {
        return {
          url: `/payments/upvote/${paymentId}`,
          method: "PATCH",
        };
      },
      invalidatesTags: (_result, _error, arg) => [
        { type: "payments" },
        { type: "payment", id: arg },
      ],
    }),

    // ---------- downvote a payment
    downVotePayment: builder.mutation({
      query: (paymentId) => {
        return {
          url: `/payments/downvote/${paymentId}`,
          method: "PATCH",
        };
      },
      invalidatesTags: (_result, _error, arg) => [
        { type: "payments" },
        { type: "payment", id: arg },
      ],
    }),
  }),
});

export const {
  useCreatePaymentMutation,
  useLoadAllPaymentsQuery,
  useGetUserPaymentsQuery,
  useGetPaymentByIdQuery,
  useDeletePaymentMutation,
  useUpdatePaymentMutation,
  useUpvotePaymentMutation,
  useDownVotePaymentMutation,
} = paymentApi;

export const { loadAllPayments } = paymentApi.endpoints;
