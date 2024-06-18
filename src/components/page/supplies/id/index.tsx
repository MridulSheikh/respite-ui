import { useGetSingleSupplyQuery } from "../../../../redux/features/supply/supplyApi";
import { useParams } from "react-router-dom";
import { TSupply } from "../../../../types/types";
import SupplyDetailsLoadingSkeleton from "./SupplyDetailsLoadingSkeleton";
import DonateModal from "../../../ui/modal/DonateModal";

type TGetSingleDataQuery = {
  data: { data: TSupply };
  isLoading: boolean;
  isError: boolean;
  error: any;
};

const SupplyDetails = () => {
  const { id } = useParams();
  const { data: supply, isLoading } = useGetSingleSupplyQuery(
    id
  ) as TGetSingleDataQuery;
  if (!supply && !isLoading) {
    return (
      <div className=" bg-[#f4f5f6] h-[calc(100vh-100px)] flex flex-col justify-center items-center">
        <h1 className=" text-3xl md:text-9xl font-bold">Oops!</h1>
        <p className=" text-xl font-semibold mt-5">404 - PAGE NOT FOUND</p>
        <p className=" text-sm mt-3 md:w-1/2 lg:w-1/3 mx-auto text-center">
          The page you are looking for might have been removed had its name
          Changed or is Temporarity unavailable.
        </p>
      </div>
    );
  }
  return isLoading ? (
    <SupplyDetailsLoadingSkeleton />
  ) : (
    <div className="bg-[#f4f5f6] py-10 dark:bg-black">
      <div className=" max-w-screen-lg mx-auto px-5">
        <div className=" w-full rounded-md overflow-hidden relative">
          <img
            src={supply?.data?.image}
            className=" object-cover object-center w-full h-full"
          />
        </div>
        <div className=" bg-white dark:bg-slate-900 rounded-xl p-4 md:p-10 w-11/12 mx-auto shadow-sm -mt-20 relative z-10">
          <span className="text-white py-0.5 px-2 text-sm uppercase rounded-full bg-[#f74f22] hover:bg-[#ffac00] cursor-pointer ease-in-out duration-200">
            {supply?.data?.category}
          </span>
          <h1 className=" text-3xl md:text-5xl font-bold mt-4 dark:text-white">
            {supply?.data?.title}
          </h1>
          <div className="flex items-center gap-x-5 md:gap-x-10 mt-5 md:mt-10">
            <div>
              <h3 className=" text-md md:text-2xl font-medium dark:text-gray-400">
                Rised:
              </h3>
              <span className=" font-bold bg-gradient-to-r from-[#f74f22]  mt-0.5  to-[#eb6d4a] text-transparent bg-clip-text">
                ${supply?.data?.rised}
              </span>
            </div>
            <div className="border-x px-5 md:px-10">
              <h3 className=" text-md md:text-2xl font-medium dark:text-gray-400">
                Quantity:
              </h3>
              <span className=" font-bold bg-gradient-to-r from-[#f74f22]  mt-0.5  to-[#eb6d4a] text-transparent bg-clip-text">
                {supply?.data?.quantity}
              </span>
            </div>
            <div>
              <h3 className=" text-md md:text-2xl font-medium dark:text-gray-400">
                Goal:
              </h3>
              <span className=" font-bold bg-gradient-to-r from-[#f74f22] mt-0.5  to-[#eb6d4a] text-transparent bg-clip-text">
                ${supply?.data?.goal}
              </span>
            </div>
          </div>
        </div>
        <div className=" mt-10 md:mt-0 md:p-10 w-11/12 mx-auto text-base dark:text-gray-300">
          {supply?.data?.discription}
        </div>
        <div className="md:p-10 w-11/12 mx-auto">
          <DonateModal
            _id={id as string}
            title={supply?.data?.title}
            image={supply?.data?.image}
            category={supply?.data?.category}
            supplierAccount={supply?.data?.createBy as string}
          />
        </div>
      </div>
    </div>
  );
};

export default SupplyDetails;
