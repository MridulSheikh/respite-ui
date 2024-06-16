import { FaHandHoldingHeart, FaSitemap } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";
import { useGetDonationLeaderBoardQuery } from "../../../redux/features/donation/donationApi";
import Skeleton from "../../../lib/tailwind-skeleton-react";
import { useGetSupplyQuery } from "../../../redux/features/supply/supplyApi";
import { useGetTotalUserQuery } from "../../../redux/features/user/userApi";

const DashboardCardGroup = () => {
  const { data: totalUserData, isLoading: totalUserLoading } =
    useGetTotalUserQuery(null);
  const { data: suppliesData, isLoading: suppliesLoading } = useGetSupplyQuery(
    { category: "" },
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    }
  );
  const { data: donationData, isLoading: donationLoading } =
    useGetDonationLeaderBoardQuery(null);
  const totalDonation = donationData?.data.reduce(
    (accumulator: number, entry) => {
      return accumulator + entry.totalDonations;
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
              ?.toFixed(2)
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
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
        {totalUserLoading ? (
          <Skeleton className=" mt-2">
            <Skeleton.item />
          </Skeleton>
        ) : (
          <h1 className=" text-2xl font-bold mt-2 mb-1">
            {totalUserData.totalUser}
          </h1>
        )}

        <span className=" text-sm text-[#64748b]">Total Account</span>
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
