import api from "../api/api";

const cartApi = api.injectEndpoints({
  tagTypes: ["Carts"],
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => ({
        url: "/user/cart",
        method: "GET",
      }),
      providesTags: ["Carts"],
    }),

    addToCart: builder.mutation({
      query: (data) => ({
        url: "/cart",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Carts"],
    }),

    removeCartItem: builder.mutation({
      query: (data) => ({
        url: "/cart/remove",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Carts"],
    }),
    incrementCartItem: builder.mutation({
      query: (data) => ({
        url: "/cart/increment",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Carts"],
    }),
    decrementCartItem: builder.mutation({
      query: (data) => ({
        url: "/cart/decrement",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Carts"],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useRemoveCartItemMutation,
  useIncrementCartItemMutation,
  useDecrementCartItemMutation,
} = cartApi;
