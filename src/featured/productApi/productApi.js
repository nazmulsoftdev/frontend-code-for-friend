import api from "../api/api";

const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: "/productList",
        method: "GET",
      }),
    }),

    getSingleProductItem: builder.query({
      query: (id) => ({
        url: `/productItem/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetProductsQuery, useGetSingleProductItemQuery } = productApi;
