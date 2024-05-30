import { TDonationStatic, TLeaderBoardEntry } from "../../../types/types";
import { baseApi } from "../../api/baseApi";

const donationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postDonation: builder.mutation({
      query: (data) => ({
        url: "/donations",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["donation"],
    }),
    getDonationStatic: builder.query<{ data: TDonationStatic[] }, null>({
      query: () => ({
        url: "/donations/statics",
        method: "GET",
      }),
    }),
    getDonationLeaderBoard: builder.query<{ data: TLeaderBoardEntry[] }, null>({
      query: () => ({
        url: "/donations/leaderboard",
        method: "GET",
      }),
      providesTags: ["donation"],
    }),
  }),
});

export const {
  usePostDonationMutation,
  useGetDonationStaticQuery,
  useGetDonationLeaderBoardQuery,
} = donationApi;
