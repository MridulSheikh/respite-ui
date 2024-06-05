import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.mutation({
      query: (token) => ({
        url: "user",
        method: "POST",
        headers: {
          token: token,
        },
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: "user/update",
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const { useGetUserMutation, useUpdateUserMutation } = userApi;
