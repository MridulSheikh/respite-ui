import { useState } from "react";
import { useGetSupplyQuery } from "../../../redux/features/supply/supplyApi";
import { TSupply } from "../../../types/types";
import SupplyItemCard from "../../ui/SupplyItemCard";
import SupplyItemGropuSkeleton from "../../ui/skeleton/SupplyItemGropuSkeleton";
import { LuListFilter } from "react-icons/lu";

const options = [
  {
    text: "All",
    value: "",
  },
  { text: "food", value: "food" },
  { text: "baby essentials", value: "baby essentials" },
  { text: "hygen products", value: "hygen products" },
];

const SupplieItemSection = () => {
  const [category, setCategory] = useState({ text: "All", value: "" });
  const [searchText, setSearchText] = useState("");
  const { data, isLoading } = useGetSupplyQuery(
    { category: category.value },
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    }
  );
  // @ts-ignore
  let supplies = data?.data;
  if (searchText) {
    supplies = supplies.filter(
      (item: TSupply) =>
        item.title.toLowerCase().includes(searchText.toLowerCase()) ||
        item.category.toLocaleLowerCase().includes(searchText.toLowerCase())
    );
  }
  return (
    <div className="py-20">
      <div className=" container mx-auto px-5">
        <div className=" md:flex justify-between mb-10">
          <div className=" w-auto lg:w-2/12 text-gray-900 dark:text-gray-100">
            <div className="relative w-full  group">
              <label className="text-xs text-gray-400">Select Category</label>
              <button className="py-2.5 px-3 w-full md:text-sm text-site bg-white dark:bg-slate-900 border border-dimmed  focus:border-brand focus:outline-none focus:ring-0 peer flex items-center justify-start gap-x-3 rounded font-semibold">
                <LuListFilter /> {category.text}
              </button>
              <div className="absolute z-[99] top-[100%] left-[50%] translate-x-[-50%] rounded-md overflow-hidden shadow-lg min-w-[200px] w-max peer-focus:visible peer-focus:opacity-100 opacity-0 invisible duration-200 p-1 bg-gray-100 dark:bg-gray-800  border border-dimmed text-xs md:text-sm">
                {options.map((option) => (
                  <div
                    onClick={() =>
                      setCategory({ text: option.text, value: option.value })
                    }
                    className=" w-full block cursor-pointer hover:bg-white dark:hover:bg-gray-900 dark:bg-gray-800 hover:text-link px-3 py-2 rounded-md"
                  >
                    {option.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <input
              onChange={(e) => setSearchText(e.target.value)}
              className=" px-3 py-2.5 rounded-md border w-full lg:w-80 dark:text-slate-200 dark:bg-slate-900 mt-5 dark:border-slate-600"
              placeholder="Search by title & category"
              type="search"
            />
          </div>
        </div>

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
