import Skeleton from "../../../lib/tailwind-skeleton-react";
import { cn } from "../../../lib/utils";

const SupplyItemGropuSkeleton = ({ className }: { className?: string }) => {
  return (
    <Skeleton.group
      count={6}
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5",
        className
      )}
    >
      <div className=" rounded-sm overflow-hidden">
        <Skeleton.item className=" relative w-full h-64 overflow-hidden" />
        <div className=" py-5 px-4 bg-white dark:bg-slate-700 rounded-sm">
          <Skeleton.item className=" w-48 h-5 rounded-full" />
          <Skeleton.item className="h-8 w-10/12" />
          <Skeleton.group
            count={3}
            className=" flex items-center justify-center gap-x-10 mt-5"
          >
            <Skeleton.item className="h-8" />
          </Skeleton.group>
          <Skeleton.group count={2} className=" flex gap-x-5">
            <Skeleton.item className="h-10 mt-5 " />
          </Skeleton.group>
        </div>
      </div>
    </Skeleton.group>
  );
};

export default SupplyItemGropuSkeleton;
