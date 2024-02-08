import api from "../api/api";

const userApi = api.injectEndpoints({
  tagTypes: ["User"],
  endpoints: (builder) => ({
    //get user information

    UserInfo: builder.query({
      query: () => ({ url: "/user/info", method: "GET" }),
      providesTags: ["User"],
    }),

    // upload user avatar mutation request
    uploadUserAvatar: builder.mutation({
      query: (data) => ({
        url: "/user/avatar/upload",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useUserInfoQuery, useUploadUserAvatarMutation } = userApi;
