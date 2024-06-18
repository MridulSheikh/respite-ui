import { FaHandHoldingHeart, FaSitemap } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";
import Skeleton from "../../../lib/tailwind-skeleton-react";
import { useGetSupplyQuery } from "../../../redux/features/supply/supplyApi";
import { useAppSelector } from "../../../redux/hook";
import { useCurrentUser } from "../../../redux/features/auth/authSlice";
import { useGetDonationsQuery } from "../../../redux/features/donation/donationApi";
import { TDonation } from "../../../types/types";

const DashboardCardGroup = () => {
  const user = useAppSelector(useCurrentUser);
  const { data: suppliesData, isLoading: suppliesLoading } = useGetSupplyQuery(
    { createBy: user?.email },
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    }
  );
  const { data: donationData, isLoading: donationLoading } =
    useGetDonationsQuery({ supplierAccount: user?.email });
  const totalDonation = donationData?.body?.reduce(
    (accumulator: number, entry: TDonation) => {
      return accumulator + entry.amount;
    },
    0
  );
  return (
    <div className=" grid lg:grid-cols-3 gap-10">
      <div className=" border bg-white dark:bg-slate-900 dark:border-slate-700 dark:text-white shadow-md p-5 rounded-sm">
        <div className=" size-12 rounded-full bg-[#eff2f7] flex justify-center items-center">
          <FaHandHoldingHeart className=" text-2xl text-[#3c50e0]" />
        </div>
        {!donationLoading ? (
          <h1 className=" text-2xl font-bold mt-2 mb-1">
            $
            {totalDonation
              ? totalDonation
                  ?.toFixed(2)
                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
              : 0}
          </h1>
        ) : (
          <Skeleton className=" mt-2">
            <Skeleton.item />
          </Skeleton>
        )}

        <span className=" text-sm text-[#64748b]">Total Donate</span>
      </div>
      <div className=" border bg-white dark:bg-slate-900 dark:border-slate-700 dark:text-white shadow-md p-5 rounded-sm">
        <div className=" size-12 rounded-full bg-[#eff2f7] flex justify-center items-center">
          <IoPersonOutline className=" text-2xl text-[#3c50e0]" />
        </div>
        {donationLoading ? (
          <Skeleton className=" mt-2">
            <Skeleton.item />
          </Skeleton>
        ) : (
          <h1 className=" text-2xl font-bold mt-2 mb-1">
            {donationData?.body?.length}
          </h1>
        )}

        <span className=" text-sm text-[#64748b]">Total Donor</span>
      </div>
      <div className=" border bg-white dark:bg-slate-900 dark:border-slate-700 dark:text-white shadow-md p-5 rounded-sm">
        <div className=" size-12 rounded-full bg-[#eff2f7] flex justify-center items-center">
          <FaSitemap className=" text-2xl text-[#3c50e0]" />
        </div>
        {suppliesLoading ? (
          <Skeleton className=" mt-2">
            <Skeleton.item />
          </Skeleton>
        ) : (
          <h1 className=" text-2xl font-bold mt-2 mb-1">
            {suppliesData?.data?.length}
          </h1>
        )}
        <span className=" text-sm text-[#64748b]">Total Supplies</span>
      </div>
    </div>
  );
};

export default DashboardCardGroup;
