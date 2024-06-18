import {
  TDonation,
  TDonationStatic,
  TLeaderBoardEntry,
} from "../../../types/types";
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
    getDonationStatic: builder.query<
      { data: TDonationStatic[] },
      { [key: string]: string | any }
    >({
      query: (query) => ({
        url: "/donations/statics",
        method: "GET",
        params: query,
      }),
    }),
    getDonationLeaderBoard: builder.query<{ data: TLeaderBoardEntry[] }, null>({
      query: () => ({
        url: "/donations/leaderboard",
        method: "GET",
      }),
      providesTags: ["donation"],
    }),
    getDonations: builder.query<
      { body: TDonation[] },
      { [key: string]: string | any }
    >({
      query: (query) => ({
        url: "/donations",
        method: "GET",
        params: query,
      }),
      providesTags: ["donation"],
    }),
  }),
});

export const {
  usePostDonationMutation,
  useGetDonationStaticQuery,
  useGetDonationLeaderBoardQuery,
  useGetDonationsQuery,
} = donationApi;
