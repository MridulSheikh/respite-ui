import { Link } from "react-router-dom";
import SupplyItemCard from "../../ui/SupplyItemCard";
import { useGetSupplyQuery } from "../../../redux/features/supply/supplyApi";
import { TSupply } from "../../../types/types";
import SupplyItemGropuSkeleton from "../../ui/skeleton/SupplyItemGropuSkeleton";

const SupplieItemSection = () => {
  const { data, isLoading } = useGetSupplyQuery(
    { category: "" },
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    }
  );
  // @ts-ignore
  const supplies = data?.data as TSupply[];
  return (
    <div className="mt-20">
      <div className=" container mx-auto px-5">
        <h1 className=" text-3xl font-extrabold text-[#061c3c] text-center dark:text-white">
          Supply Items
        </h1>
        <p className=" text-center md:w-3/5 lg:w-2/5 mx-auto mt-3 text-[#293543] font-medium dark:text-gray-400">
          With your support, we can reach more communities, deliver more aid,
          and make a greater impact.
        </p>
        {isLoading ? (
          <SupplyItemGropuSkeleton className="mt-10" />
        ) : (
          <div className=" mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {supplies?.slice(0, 6).map((item: TSupply) => (
              <SupplyItemCard supplyItem={item} key={item._id} />
            ))}
          </div>
        )}

        <div className=" text-center">
          <Link to="/supplies">
            <button className=" mt-10 text-xl font-medium text-[#f74f22] hover:underline">
              See More Supplies &gt;&gt;
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SupplieItemSection;
