import { ReactNode } from "react";
import { cn } from "../utils";

type TCommonProps = {
  className?: string;
  children?: ReactNode;
};

const Skeleton = ({ className, children }: TCommonProps) => {
  return (
    <div className={cn("animate-pulse w-full", className)}>{children}</div>
  );
};

const Item = ({ className }: TCommonProps) => {
  return (
    <div className={cn("h-4 w-full bg-gray-300 rounded mb-2", className)} />
  );
};

const Group = ({
  randomWidth = ["w-full"],
  className,
  count = 1,
  children,
}: {
  randomWidth?: string[];
  className?: string;
  count: number;
  children: ReactNode;
}) => {
  return (
    <div className={cn("animate-pulse w-full", className)}>
      {Array(count)
        .fill(null)
        .map((number) =>
          randomWidth ? (
            randomWidth.map((value, index) => (
              <div className={value} key={index}>
                {children}
              </div>
            ))
          ) : (
            <div key={number}>
              <>{children}</>
            </div>
          )
        )}
    </div>
  );
};

Skeleton.item = Item;
Skeleton.group = Group;

export default Skeleton;
