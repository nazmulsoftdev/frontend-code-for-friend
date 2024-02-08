import api from "../api/api";

const orderApi = api.injectEndpoints({
  tagTypes: ["Order"],
  endpoints: (builder) => ({
    getOrder: builder.query({
      query: () => ({ url: "/user/orders", method: "GET" }),
      providesTags: ["Order"],
    }),
    addOrder: builder.mutation({
      query: (data) => ({ url: "/add/order", method: "POST", body: data }),
      invalidatesTags: ["Order"],
    }),
    removeOrder: builder.mutation({
      query: (data) => ({
        url: "/remove/user/order",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Order"],
    }),

    updateUserOrder: builder.mutation({
      query: (data) => ({
        url: "/update/user/order",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Order"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetOrderQuery,
  useAddOrderMutation,
  useRemoveOrderMutation,
  useUpdateUserOrderMutation,
} = orderApi;
