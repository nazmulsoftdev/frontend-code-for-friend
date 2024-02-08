import api from "../api/api";
import { UserLoggedIn } from "./authSlice";
import cookie from "js-cookie";
const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // user register mutation
    registerUser: builder.mutation({
      query: (data) => ({
        url: "/register",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          if (result?.data) {
            const { accessToken, refreshToken, users } = result?.data?.data;

            dispatch(
              UserLoggedIn({
                accessToken: accessToken,
                refreshToken: refreshToken,
                user: users,
              })
            );
            // Save the tokens to cookies for future use (accessToken)

            cookie.set("token1", accessToken, {
              expires: 1,
              path: "/",
            });

            // Save the tokens to cookies for future use (refreshToken)
            cookie.set("token2", refreshToken, {
              expires: 7,
              path: "/",
            });

            // save user in localStorage
            localStorage.setItem("user", JSON.stringify(users));
          }
        } catch (err) {
          //
        }
      },
    }),
    // user login mutation
    loginUser: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          if (result?.data) {
            const { accessToken, refreshToken, users } = result?.data?.data;

            dispatch(
              UserLoggedIn({
                accessToken: accessToken,
                refreshToken: refreshToken,
                user: users,
              })
            );
            // Save the tokens to cookies for future use (accessToken)

            cookie.set("token1", accessToken, {
              expires: 1,
              path: "/",
            });

            // Save the tokens to cookies for future use (refreshToken)
            cookie.set("token2", refreshToken, {
              expires: 7,
              path: "/",
            });

            // save user in localStorage
            localStorage.setItem("user", JSON.stringify(users));
          }
        } catch (err) {
          //
        }
      },
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
    loggedInUserPasswordChange: builder.mutation({
      query: (data) => ({
        url: "/loggedIn/password/change",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useLogoutUserMutation,
  useLoggedInUserPasswordChangeMutation,
} = authApi;
