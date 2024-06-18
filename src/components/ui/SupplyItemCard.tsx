import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";
import { TSupply } from "../../types/types";
import DonateModal from "./modal/DonateModal";
import { GiHeartPlus } from "react-icons/gi";

type TSupplyItemCard = {
  supplyItem: TSupply;
};

const SupplyItemCard = ({ supplyItem }: TSupplyItemCard) => {
  const { _id, image, title, category, quantity, rised, goal, createBy } =
    supplyItem;
  return (
    <div className=" rounded-sm overflow-hidden">
      <div className=" relative w-full h-64 overflow-hidden">
        <img
          src={image}
          className=" object-cover object-center w-full h-full"
        />
      </div>
      <div className=" py-5 px-4 bg-white dark:bg-slate-900 rounded-sm">
        <span
          className={cn(
            "text-white py-0.5 px-2 text-sm uppercase rounded-full bg-[#f74f22] hover:bg-[#ffac00] cursor-pointer ease-in-out duration-200",
            {
              "bg-green-700": category === "hygen products",
              "bg-[#2f1793]": category === "baby essentials",
            }
          )}
        >
          {category}
        </span>
        <h2 className="mt-5 font-semibold text-2xl dark:text-white">{title}</h2>
        <div className=" flex items-center justify-center gap-x-5 lg:gap-x-10 mt-5">
          <div>
            <h3 className=" text-sm font-medium dark:text-gray-400">Rised:</h3>
            <span className=" font-bold bg-gradient-to-r from-[#f74f22]  mt-0.5  to-[#eb6d4a] text-transparent bg-clip-text">
              ${rised}
            </span>
          </div>
          <div className=" border-x px-5 md:px-10">
            <h3 className=" text-sm font-medium dark:text-gray-400">
              Quantity:
            </h3>
            <span className=" font-bold bg-gradient-to-r from-[#f74f22]  mt-0.5  to-[#eb6d4a] text-transparent bg-clip-text">
              {quantity}
            </span>
          </div>
          <div>
            <h3 className=" text-sm font-medium dark:text-gray-400">Goal:</h3>
            <span className=" font-bold bg-gradient-to-r from-[#f74f22] mt-0.5  to-[#eb6d4a] text-transparent bg-clip-text">
              ${goal}
            </span>
          </div>
        </div>
        <div className=" flex flex-col lg:flex-row gap-x-5">
          <DonateModal
            _id={_id}
            title={title}
            image={image}
            category={category}
            supplierAccount={createBy as string}
          >
            <button className=" py-1.5 px-5 bg-[#2f1793] text-white rounded-sm  ease-in-out duration-200 relative hover:scale-95 flex items-center gap-x-2 mt-5 justify-center lg:justify-start w-full">
              <GiHeartPlus className=" text-lg" />
              Donate Now
              <div className="w-full h-full border-2 border-[#2f1793] bg-none absolute -right-1 -bottom-1 z-0" />
            </button>
          </DonateModal>
          <Link to={`/supplies/${_id}`}>
            <button className=" py-1.5 px-5 bg-[#f74f22] text-white rounded-sm  ease-in-out duration-200 relative hover:scale-95 flex items-center gap-x-2 mt-5 w-full justify-center lg:justify-start">
              <FaEye />
              View Details
              <div className="w-full h-full border-2 border-[#f74f22] bg-none absolute -right-1 -bottom-1 z-0" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SupplyItemCard;
