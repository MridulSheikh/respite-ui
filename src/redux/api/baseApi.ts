import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TAuthState } from "../features/auth/authSlice";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://respite-ui-2-0.vercel.app/api/v1",
    prepareHeaders: (headers, { getState }) => {
      const { auth } = getState() as { auth: TAuthState };
      const authHeader = "bearer" + " " + auth.token;
      headers.set("authorization", authHeader ? authHeader : "");
      return headers;
    },
  }),
  tagTypes: ["supply", "donation", "posts"],
  endpoints: () => ({}),
});
