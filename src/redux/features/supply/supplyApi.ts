import { TSupply } from "../../../types/types";
import { baseApi } from "../../api/baseApi";

const supplyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSupply: builder.query<TSupply[], null>({
      query: () => ({
        url: "/supplies",
        method: "GET",
      }),
      providesTags: ["supply"],
    }),
    postSupply: builder.mutation({
      query: (data) => ({
        url: "/supplies",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["supply"],
    }),
    deleteSupply: builder.mutation({
      query: (id) => ({
        url: `supplies/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["supply"],
    }),
    updateSupply: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `supplies/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["supply"],
    }),
    getSingleSupply: builder.query({
      query: (id) => {
        return {
          url: `/supplies/${id}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useDeleteSupplyMutation,
  useGetSupplyQuery,
  useUpdateSupplyMutation,
  usePostSupplyMutation,
  useGetSingleSupplyQuery,
} = supplyApi;
