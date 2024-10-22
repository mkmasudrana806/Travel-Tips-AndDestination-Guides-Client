import baseApi from "../../api/baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // --------- load all payment
    loadAllPayments: builder.query({
      query: () => {
        return { url: `/payments` };
      },
      providesTags: ["payments"],
    }),

    // --------- get user payments
    getUserPayments: builder.query({
      query: () => {
        return { url: `/payments/my-payments-history` };
      },
      providesTags: (_result, _error, arg) => [
        { type: "user-payments", id: arg },
      ],
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
  }),
});

export const {
  useLoadAllPaymentsQuery,
  useGetUserPaymentsQuery,
  useDeletePaymentMutation,
  useUpdatePaymentMutation,
} = paymentApi;

export const { loadAllPayments } = paymentApi.endpoints;
