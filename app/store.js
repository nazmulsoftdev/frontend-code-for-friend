import { configureStore } from "@reduxjs/toolkit";
import api from "../src/featured/api/api";
import authSliceReducer from "../src/featured/auth/authSlice";
import orderSliceReducer from "../src/featured/order/orderSlice";
import shippingSliceReducer from "../src/featured/shipping/shippingSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authSliceReducer,
    order: orderSliceReducer,
    shipping: shippingSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
