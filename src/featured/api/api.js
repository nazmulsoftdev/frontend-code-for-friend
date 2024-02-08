import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserLoggedIn, UserLoggedOut } from "../auth/authSlice";
import cookie from "js-cookie";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8000/api/v1/",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;
    // If we have a token set in state, let's assume that we should be passing it.
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    // try to get a new token
    const refreshResult = await baseQuery("/refreshToken", api, extraOptions);
    if (refreshResult?.data?.data) {
      const { accessToken, refreshToken, user } = result?.data?.data || {};
      // store the new token
      api.dispatch(
        UserLoggedIn({
          accessToken: accessToken,
          refreshToken: refreshToken,
          user: user,
        })
      );

      // Save the tokens to cookies for future use (accessToken)
      let now = new Date();
      now.setTime(now.getTime() + 1 * 3600 * 1000);
      cookie.set("token1", accessToken, {
        expires: now.toUTCString(),
        path: "/",
      });

      // Save the tokens to cookies for future use (refreshToken)
      cookie.set("token2", refreshToken, {
        expires: 7,
        path: "/",
      });

      // retry the initial query
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(UserLoggedOut);
    }
  }
  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});

export default api;
