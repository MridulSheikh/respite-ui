import Skeleton from "../../../lib/tailwind-skeleton-react";
import { useGetDonationLeaderBoardQuery } from "../../../redux/features/donation/donationApi";

type TLeaderBoard = {
  name: string;
  userEmail: string;
  highestDonation: number;
  totalDonations: number;
};

const LeaderBoard = () => {
  const { data, isLoading } = useGetDonationLeaderBoardQuery(null);
  return (
    <div className="bg-[#f1f5f9] dark:bg-black py-10">
      <div className=" container mx-auto p-5">
        <h1 className="dark:text-white">Leaderboard</h1>
        {!isLoading ? (
          <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-100 uppercase bg-gray-500 border-b dark:border-b-0 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Rank
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Highest Donation
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Total Donation
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {data?.data?.map((dt: TLeaderBoard, index) => (
                    <tr className="border-b bg-white dark:bg-slate-900 dark:border-gray-700">
                      <td className="px-6 py-4">{index + 1}</td>
                      <td
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {dt.name}
                      </td>
                      <td className="px-6 py-4">{dt.userEmail}</td>
                      <td className="px-6 py-4">
                        $
                        {dt.highestDonation
                          .toFixed(2)
                          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
                      </td>
                      <td className="px-6 py-4">
                        $
                        {dt.totalDonations
                          .toFixed(2)
                          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {data?.data?.length === 0 && (
              <div className=" h-72 w-full flex justify-center items-center">
                <p className="dark:text-gray-500">Donor Not Found!</p>
              </div>
            )}
          </>
        ) : (
          <Skeleton.group count={7} className=" mt-5">
            <div className=" grid grid-cols-5 gap-x-2 my-2">
              <div className="col-span-2 flex gap-x-2">
                <Skeleton.item className=" h-4 " />
              </div>
              <Skeleton.item className=" h-4" />
              <Skeleton.item className=" h-4 " />
              <div className=" flex gap-x-3">
                <Skeleton.item className=" h-4" />
                <Skeleton.item className=" h-4" />
              </div>
            </div>
          </Skeleton.group>
        )}
      </div>
    </div>
  );
};

export default LeaderBoard;
