import { useGetSupplyQuery } from "../../../redux/features/supply/supplyApi";
import { TSupply } from "../../../types/types";
import SupplyItemCard from "../../ui/SupplyItemCard";
import SupplyItemGropuSkeleton from "../../ui/skeleton/SupplyItemGropuSkeleton";

const SupplieItemSection = () => {
  const { data, isLoading } = useGetSupplyQuery(null, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });
  // @ts-ignore
  const supplies = data?.data as TSupply[];
  return (
    <div className="py-20">
      <div className=" container mx-auto px-5">
        {isLoading ? (
          <SupplyItemGropuSkeleton />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {supplies?.map((item: TSupply) => (
              <SupplyItemCard supplyItem={item} key={item._id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SupplieItemSection;
