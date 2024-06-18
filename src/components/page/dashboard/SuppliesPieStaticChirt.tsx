/* eslint-disable @typescript-eslint/ban-ts-comment */
import Chart from "chart.js/auto";
import { useEffect, useRef } from "react";
import { useGetDonationStaticQuery } from "../../../redux/features/donation/donationApi";
import { TDonationStatic } from "../../../types/types";
import Skeleton from "../../../lib/tailwind-skeleton-react";
import { useAppSelector } from "../../../redux/hook";
import { useCurrentUser } from "../../../redux/features/auth/authSlice";
const SuppliesPieStaticChirt = () => {
  const user = useAppSelector(useCurrentUser);
  const chartRef = useRef(null);
  const chartInstance = useRef<Chart | null>(null);
  const { data: statics, isLoading } = useGetDonationStaticQuery({
    email: user?.email,
  });
  console.log(statics);
  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    let myChartRef;
    if (chartRef.current) {
      // @ts-ignore
      myChartRef = chartRef.current.getContext("2d");
    }
    const data = {
      labels: statics?.data?.map((dt: TDonationStatic) => dt._id),
      datasets: [
        {
          label: "Percentage",
          data: statics?.data?.map((dt: TDonationStatic) => dt.percentage),
          backgroundColor: ["#15803d", "#f74f22", "#2f1793"],
          hoverOffset: 4,
        },
      ],
    };
    // @ts-ignore
    chartInstance.current = new Chart(myChartRef, {
      type: "pie",
      data: data,
    });
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [statics, isLoading]);
  return (
    <div className=" p-5 rounded-sm bg-white dark:bg-slate-900 border dark:border-none shadow-md w-[340px] lg:w-[400px]">
      <div className=" flex justify-between items-center">
        <h1 className=" font-bold text-xl dark:text-white">Donation Statics</h1>
      </div>
      {isLoading ? (
        <Skeleton className=" flex items-center flex-col mt-10">
          <Skeleton.group count={3} className=" flex gap-x-5 px-10">
            <Skeleton.item className=" h-6" />
          </Skeleton.group>
          <Skeleton.item className=" size-72 rounded-full mt-10" />
        </Skeleton>
      ) : statics?.data.length != 0 ? (
        <canvas ref={chartRef} className=" mt-10" />
      ) : (
        <div className=" h-40 flex justify-center items-center">
          Donation not found!
        </div>
      )}
    </div>
  );
};

export default SuppliesPieStaticChirt;
