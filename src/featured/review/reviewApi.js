import api from "../api/api";

const reviewApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addOrderReview: builder.mutation({
      query: (data) => ({
        url: "/add/product/review",
        method: "POST",
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useAddOrderReviewMutation } = reviewApi;
