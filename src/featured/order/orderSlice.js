import { createSlice } from "@reduxjs/toolkit";

//  initial state
const initialState = {
  paymentMethod: undefined,
  paymentAmount: undefined,
};

// create slice

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    AddPaymentMethod(state, action) {
      state.paymentMethod = action.payload;
    },
    // Payment amount is added to the existing amount in the cart
    AddPaymentAmout(state, action) {
      state.paymentAmount = action.payload;
    },
  },
});

export const { AddPaymentMethod, AddPaymentAmout } = orderSlice.actions;

export default orderSlice.reducer;
