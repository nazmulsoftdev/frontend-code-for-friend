import api from "../api/api";

const adminApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addNewProduct: builder.mutation({
      query: (data) => ({
        url: "/addNewProduct",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useAddNewProductMutation } = adminApi;
