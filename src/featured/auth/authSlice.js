import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: undefined,
  refreshToken: undefined,
  user: undefined,
};

// create auth Slice

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    UserLoggedIn: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.user = action.payload.user;
    },
    UserLoggedOut: (state) => {
      (state.accessToken = undefined),
        (state.refreshToken = undefined),
        (state.user = undefined);
    },
  },
});

export const { UserLoggedIn, UserLoggedOut } = authSlice.actions;

export default authSlice.reducer;
