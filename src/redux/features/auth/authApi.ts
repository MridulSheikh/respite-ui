import { baseApi } from "../../api/baseApi";

type TResponseUser = {
  data: {
    message: string;
    success: boolean;
    token: string;
  };
};

type TPayload = {
  email: string;
  name: string;
};

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    userRegistration: builder.mutation({
      query: (data) => ({
        url: "/register",
        method: "POST",
        body: data,
      }),
    }),
    loginUser: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
    }),
    verifyToken: builder.query({
      query: () => ({
        url: "/tokenverify",
        method: "GET",
      }),
    }),
    oAuthLogin: builder.mutation<TResponseUser, TPayload>({
      query: (data) => ({
        url: "/login/oauth",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useUserRegistrationMutation,
  useLoginUserMutation,
  useVerifyTokenQuery,
  useOAuthLoginMutation,
} = authApi;
