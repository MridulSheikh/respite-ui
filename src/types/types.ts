import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";

export enum CategoryEnum {
  food = "food",
  hygenProducts = "hygen products",
  BabyEssentials = "baby essentials",
}

export type TSupply = {
  _id: string;
  image: string;
  title: string;
  category: CategoryEnum;
  quantity: number;
  rised: number;
  goal: number;
  discription: string;
  createBy?: string;
};

export type TSupplyQueries = {
  data: TSupply[];
};

export const isFetchBaseQueryErrorType = (
  error: any
): error is FetchBaseQueryError => "status" in error;

export type TDonationStatic = {
  _id: string;
  total: number;
  percentage: number;
};

export interface TLeaderBoardEntry {
  userEmail: string;
  name: string;
  totalDonations: number;
  highestDonation: number;
  lastDonationDate: string;
}

export type TCommunityPosts = {
  userImage: string;
  name: string;
  userEmail: string;
  _id: string;
  text: string;
  img: string;
  like: {
    email: string;
  }[];
  dislike: {
    email: string;
  }[];
  comment: string[];
  date: string;
};

export type TDonation = {
  _id: string;
  name: string;
  address: string;
  phone: string;
  amount: 20000;
  userEmail: string;
  supplyId: string;
  category: string;
  suppliredAccount: string;
};
