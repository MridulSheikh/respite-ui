import { FaHandHoldingHeart, FaSitemap } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";
import { MdOutlineRemoveRedEye } from "react-icons/md";

const DashboardCardGroup = () => {
  return (
    <div className=" grid grid-cols-4 gap-x-10">
      <div className=" border bg-white shadow-md p-5 rounded-sm">
        <div className=" size-12 rounded-full bg-[#eff2f7] flex justify-center items-center">
          <MdOutlineRemoveRedEye className=" text-2xl text-[#3c50e0]" />
        </div>
        <h1 className=" text-2xl font-bold mt-2 mb-1">40,000</h1>
        <span className=" text-sm text-[#64748b]">Total views</span>
      </div>
      <div className=" border bg-white shadow-md p-5 rounded-sm">
        <div className=" size-12 rounded-full bg-[#eff2f7] flex justify-center items-center">
          <FaHandHoldingHeart className=" text-2xl text-[#3c50e0]" />
        </div>
        <h1 className=" text-2xl font-bold mt-2 mb-1">$40,000</h1>
        <span className=" text-sm text-[#64748b]">Total Donate</span>
      </div>
      <div className=" border bg-white shadow-md p-5 rounded-sm">
        <div className=" size-12 rounded-full bg-[#eff2f7] flex justify-center items-center">
          <IoPersonOutline className=" text-2xl text-[#3c50e0]" />
        </div>
        <h1 className=" text-2xl font-bold mt-2 mb-1">10,00,000</h1>
        <span className=" text-sm text-[#64748b]">Total Account</span>
      </div>
      <div className=" border bg-white shadow-md p-5 rounded-sm">
        <div className=" size-12 rounded-full bg-[#eff2f7] flex justify-center items-center">
          <FaSitemap className=" text-2xl text-[#3c50e0]" />
        </div>
        <h1 className=" text-2xl font-bold mt-2 mb-1">16</h1>
        <span className=" text-sm text-[#64748b]">Total Supplies</span>
      </div>
    </div>
  );
};

export default DashboardCardGroup;
