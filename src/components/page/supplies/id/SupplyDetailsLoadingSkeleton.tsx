import Skeleton from "../../../../lib/tailwind-skeleton-react";

const SupplyDetailsLoadingSkeleton = () => {
  return (
    <div className="bg-[#f4f5f6] dark:bg-black py-10">
      <div className=" max-w-screen-lg mx-auto px-5">
        <div className=" w-full rounded-md overflow-hidden relative">
          <Skeleton>
            <Skeleton.item className=" w-full h-60 md:h-96" />
          </Skeleton>
        </div>
        <div className=" bg-white dark:bg-slate-500 rounded-xl p-10 w-11/12 mx-auto shadow-sm -mt-20 relative z-10">
          <Skeleton>
            <Skeleton.item className=" w-1/3 h-5 md:w-96 md:h-10" />
          </Skeleton>
          <Skeleton>
            <Skeleton.item className="w-full h-5 md:h-10" />
          </Skeleton>
          <div className=" flex items-center justify-start gap-x-10 mt-10">
            <Skeleton className=" w-14 md:w-32">
              <Skeleton.item className=" w-14 md:w-32 h-5" />
            </Skeleton>
            <Skeleton className=" w-14 md:w-32">
              <Skeleton.item className=" w-14 md:w-32 h-5" />
            </Skeleton>
            <Skeleton className="w-14 md:w-32">
              <Skeleton.item className=" w-14 md:w-32 h-5" />
            </Skeleton>
          </div>
        </div>
        <div className=" p-5 md:p-10 md:w-11/12 mx-auto text-base">
          <Skeleton.group
            randomWidth={["w-full", "w-10/12", "w-9/12", "w-11/12"]}
            count={10}
            className=" flex flex-col"
          >
            <Skeleton.item className="h-4" />
          </Skeleton.group>
        </div>
        <div className=" p-5 md:p-10 md:w-11/12 mx-auto">
          <Skeleton>
            <Skeleton.item className=" w-32 h-10" />
          </Skeleton>
        </div>
      </div>
    </div>
  );
};

export default SupplyDetailsLoadingSkeleton;
