import { IoIosAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import SuppliesUpdateModal from "../../../ui/modal/SuppliesUpdateModal";
import DeleteModal from "../../../ui/modal/DeleteModal";
import { TSupply } from "../../../../types/types";
import { cn } from "../../../../lib/utils";
import { Toaster, toast } from "sonner";
import Skeleton from "../../../../lib/tailwind-skeleton-react";
import {
  useDeleteSupplyMutation,
  useGetSupplyQuery,
} from "../../../../redux/features/supply/supplyApi";
import { useState } from "react";

const ManageSupplies = () => {
  const [searchText, setSearchText] = useState("");
  const { data, isLoading, isError } = useGetSupplyQuery(
    { category: "" },
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
  const [deleteSupply] = useDeleteSupplyMutation();
  const handleDeleteSupply = async (id: string) => {
    const toastID = toast.loading("Pending...");
    try {
      const response = await deleteSupply(id);
      if ("data" in response && response.data.success) {
        toast.success(response.data.message, { id: toastID });
      }
    } catch (erorr) {
      toast.error("Something went wrong", { id: toastID });
    }
  };
  console.log(searchText);
  return (
    <div className="p-5">
      <Toaster />
      <div className=" lg:flex justify-between items-center dark:text-white">
        <h1>Dashboard / Supplies</h1>
        <div className=" lg:flex gap-x-3 items-center">
          <div>
            <input
              onChange={(e) => setSearchText(e.target.value)}
              className=" px-3 py-2 rounded-md border w-full lg:w-80 dark:bg-slate-800 dark:border-slate-600 my-5 lg:my-0"
              placeholder="Search by title & category"
              type="search"
            />
          </div>
          <Link to={"/dashboard/create-supply"} className="">
            <button className=" px-3 py-2 bg-[#3c50e0] text-white rounded-sm hover:opacity-90 flex items-center gap-x-1">
              <IoIosAdd className=" text-2xl" />
              Create Supply
            </button>
          </Link>
        </div>
      </div>

      {/* for small device */}
      <div className=" block lg:hidden mt-10">
        {isLoading ? (
          <Skeleton.group
            count={12}
            className=" grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            <Skeleton className="grid grid-cols-3 rounded-sm border overflow-hidden bg-white">
              <Skeleton.item className="col-span-1 h-full border-none" />
              <div className=" p-4 col-span-2">
                <Skeleton.item className=" w-2/6" />
                <Skeleton.item className=" h-7" />
                <div className=" flex gap-x-5">
                  <Skeleton.item className=" h-7" />
                  <Skeleton.item className=" h-7" />
                </div>
              </div>
            </Skeleton>
          </Skeleton.group>
        ) : (
          <>
            {supplies?.length === 0 && (
              <div className=" w-full h-40 flex justify-center items-center">
                <p className=" text-gray-600">Empty!</p>
              </div>
            )}
            {isError && (
              <div className=" w-full h-40 flex justify-center items-center">
                <p className=" text-gray-600">Something Went Wrong!</p>
              </div>
            )}
            <div className=" grid grid-cols-1 md:grid-cols-2 gap-5">
              {supplies?.map((item: TSupply) => (
                <div
                  className=" bg-white rounded-sm border overflow-hidden shadow-sm grid grid-cols-3"
                  key={item._id}
                >
                  <div className="relative">
                    <img
                      src={item.image}
                      className=" h-full object-cover w-full object-center"
                      alt=""
                    />
                  </div>
                  <div className="p-4  col-span-2">
                    <div>
                      <span
                        className={cn(
                          "text-white py-0.5 px-2 text-xs uppercase rounded-full bg-[#f74f22] hover:bg-[#ffac00] cursor-pointer ease-in-out duration-200",
                          {
                            "bg-green-700": item.category === "hygen products",
                            "bg-[#2f1793]": item.category === "baby essentials",
                          }
                        )}
                      >
                        {item.category}
                      </span>
                    </div>
                    <h1 className=" mt-1 text-xl font-medium">{item.title}</h1>
                    <div className=" flex gap-x-2 mt-5">
                      <SuppliesUpdateModal
                        _id={item._id}
                        title={item.title}
                        rised={item.rised}
                        quantity={item.quantity}
                        goal={item.goal}
                        image={item.image}
                        category={item.category}
                        discription={item.discription}
                      />
                      <DeleteModal
                        action={() => handleDeleteSupply(item._id)}
                        description="Are you sure want to delete this Supply?"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* for large device */}
      <div className=" hidden lg:block bg-white dark:bg-slate-900 rounded-sm border dark:border-none dark:text-white mt-10">
        <div className="grid-cols-5 px-5 py-3 grid border-b dark:border-b-slate-500">
          <div className=" col-span-2">Title</div>
          <div>Category</div>
          <div>Quantity</div>
        </div>
        {isLoading ? (
          <Skeleton.group count={7} className=" mt-5 px-5">
            <div className=" grid grid-cols-5 gap-x-2  px-5 my-2">
              <div className="col-span-2 flex gap-x-2">
                <Skeleton.item className=" size-10 " />
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
        ) : (
          <>
            {supplies?.length === 0 && (
              <div className=" w-full h-40 flex justify-center items-center">
                <p className=" text-gray-600">Empty!</p>
              </div>
            )}
            {isError && (
              <div className=" w-full h-40 flex justify-center items-center">
                <p className=" text-gray-600">Something Went Wrong!</p>
              </div>
            )}
            {supplies?.map((item: TSupply) => (
              <div className=" grid grid-cols-5 px-5 py-3 my-2">
                <div className=" col-span-2 flex  gap-x-3">
                  <div className=" size-10 overflow-hidden relative z-30">
                    <img
                      src={item.image}
                      className="object-cover object-center w-full h-full"
                    />
                  </div>
                  <h1 className=" text-md font-semibold">{item.title}</h1>
                </div>
                <div>
                  <span
                    className={cn(
                      "text-white py-0.5 px-2 text-sm uppercase rounded-full bg-[#f74f22] hover:bg-[#ffac00] cursor-pointer ease-in-out duration-200",
                      {
                        "bg-green-700": item.category === "hygen products",
                        "bg-[#2f1793]": item.category === "baby essentials",
                      }
                    )}
                  >
                    {item.category}
                  </span>
                </div>
                <div>{item.quantity}</div>
                <div className=" flex items-center gap-x-5">
                  <SuppliesUpdateModal
                    _id={item._id}
                    title={item.title}
                    rised={item.rised}
                    quantity={item.quantity}
                    goal={item.goal}
                    image={item.image}
                    category={item.category}
                    discription={item.discription}
                  />
                  <DeleteModal
                    action={() => handleDeleteSupply(item._id)}
                    description="Are you sure want to delete this Supply?"
                  />
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ManageSupplies;
