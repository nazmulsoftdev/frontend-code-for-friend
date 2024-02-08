import { createSlice } from "@reduxjs/toolkit";

// initial state

const initialState = {
  infoName: undefined,
  infoPhone: undefined,
  infoPostCode: undefined,
  infoDivision: undefined,
  infoLocation: undefined,
};

// create shippingSlice

const shippingSlice = createSlice({
  name: "shipping",
  initialState,
  reducers: {
    addShippingNameInfo: (state, action) => {
      state.infoName = action.payload;
    },

    addShippingPhoneInfo: (state, action) => {
      state.infoPhone = action.payload;
    },
    addShippingPostCodeInfo: (state, action) => {
      state.infoPostCode = action.payload;
    },
    addShippingDivisionInfo: (state, action) => {
      state.infoDivision = action.payload;
    },
    addShippingLocationInfo: (state, action) => {
      state.infoLocation = action.payload;
    },
  },
});

export const {
  addShippingNameInfo,
  addShippingPhoneInfo,
  addShippingPostCodeInfo,
  addShippingDivisionInfo,
  addShippingLocationInfo,
} = shippingSlice.actions;

export default shippingSlice.reducer;
