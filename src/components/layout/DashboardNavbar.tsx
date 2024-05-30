// import { FiSearch } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { logout, useCurrentUser } from "../../redux/features/auth/authSlice";
import { SlLogout } from "react-icons/sl";
import { useContext, useState } from "react";
import { LuMenu } from "react-icons/lu";
import { SidebarContext, TSideBarContext } from "./DashboardLayout";
import { Link } from "react-router-dom";
import ThemeSwitcher from "../ui/ThemeSwitcher";

const DashboardNavbar = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(useCurrentUser);
  const [open, setIsOpen] = useState<boolean>(false);
  const { setIsSidebarOpen } = useContext(SidebarContext) as TSideBarContext;
  return (
    <div className=" w-full px-5 py-4 sticky top-0 z-40 bg-white dark:bg-slate-950 shadow-md flex justify-between">
      <button
        onClick={() => setIsSidebarOpen(true)}
        className=" inline-block lg:hidden"
      >
        <LuMenu className=" text-2xl dark:text-white" />
      </button>
      <div className="flex items-center px-3 py-1 rounded-sm lg:w-96">
        {/* <button>
          <FiSearch className=" text-gray-500 text-lg hover:text-[#2f1793]" />
        </button>
        <input
          type="search"
          className="px-3 py-1 outline-none w-full"
          placeholder="Search..."
        /> */}
      </div>
      <div className=" flex items-center gap-x-5">
        {user && (
          <div
            onClick={() => setIsOpen((Prev) => !Prev)}
            className=" flex items-center gap-x-1.5 rounded-sm cursor-pointer relative"
          >
            <div className=" relative size-8 bg-slate-500 rounded-full overflow-hidden">
              <img
                src="/image/login/user.jpg"
                className=" object-cover w-full"
              />
            </div>

            {open && (
              <div className=" bg-white dark:bg-slate-900 dark:border-none dark:text-white rounded-md absolute p-3 top-[60px] right-0  shadow-sm border animate-fade-down animate-duration-500 w-40">
                <Link
                  to={"/dashboard/profile"}
                  className="py-2 px-3 w-full block  hover:bg-gray-100 dark:hover:bg-slate-800 rounded-sm  ease-in-out duration-200"
                >
                  Your Profile
                </Link>
                <Link
                  to={"/dashboard/setting"}
                  className="py-2 px-3 w-full block  hover:bg-gray-100 dark:hover:bg-slate-800 rounded-sm  ease-in-out duration-200"
                >
                  Settings
                </Link>
                <button
                  onClick={() => dispatch(logout())}
                  className="flex items-center gap-x-2 py-2 px-3 w-full  hover:bg-gray-100 dark:hover:bg-slate-800 rounded-sm  ease-in-out duration-200"
                >
                  <SlLogout />
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
        <ThemeSwitcher />
      </div>
    </div>
  );
};

export default DashboardNavbar;
