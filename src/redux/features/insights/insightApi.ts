import baseApi from "../../api/baseApi";

const insightApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // --------- get admin insight
    getAdminInsights: builder.query({
      query: () => {
        return { url: `/insights/admin-insights` };
      },
      providesTags: [{ type: "admin-insights" }],
    }),

    // --------- get admin insight
    getUserInsights: builder.query({
      query: () => {
        return { url: `/insights/user-insights` };
      },
      providesTags: [{ type: "user-insights" }],
    }),

    // --------------- get monthly overview
    getMonthlyOverview: builder.query({
      query: () => {
        return { url: `/insights/monthly-overview` };
      },
      providesTags: [{ type: "monthly-overview" }],
    }),
  }),
});

export const { useGetAdminInsightsQuery, useGetUserInsightsQuery, useGetMonthlyOverviewQuery } = insightApi;
