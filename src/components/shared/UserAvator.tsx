import { cn } from "../../lib/utils";

const UserAvator = ({
  src,
  className,
}: {
  src?: string | undefined;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        " relative size-10 bg-slate-500 rounded-full overflow-hidden",
        className
      )}
    >
      <img
        src={src ? src : "/image/login/user.jpg"}
        className=" object-cover w-full"
        referrerPolicy="no-referrer"
      />
    </div>
  );
};

export default UserAvator;
