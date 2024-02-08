import api from "../api/api";

const forgotpasswordApi = api.injectEndpoints({
  endpoints: (builder) => ({
    sendResetPasswordEmail: builder.mutation({
      query: (data) => ({
        url: `/auth/forgot-password`,
        method: "POST",
        body: data,
      }),
    }),

    verifyCode: builder.mutation({
      query: (data) => ({
        url: `/auth/forgot-password/verify`,
        method: "POST",
        body: data,
      }),
    }),
    userChangePassword: builder.mutation({
      query: (data) => ({
        url: `/auth/change-password`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useSendResetPasswordEmailMutation,
  useVerifyCodeMutation,
  useUserChangePasswordMutation,
} = forgotpasswordApi;
