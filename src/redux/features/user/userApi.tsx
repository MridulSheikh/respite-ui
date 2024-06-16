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
    getTotalUser: builder.query({
      query: () => ({
        url: "user/total",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetUserMutation,
  useUpdateUserMutation,
  useGetTotalUserQuery,
} = userApi;
