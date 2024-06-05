import React, { useContext } from "react";
import { FaChevronLeft, FaHouseUser } from "react-icons/fa";
import { FaSitemap } from "react-icons/fa6";
import { GiBrokenHeartZone } from "react-icons/gi";
import { MdOutlineDashboard } from "react-icons/md";
import { Link, NavLink, useLocation } from "react-router-dom";
import { cn } from "../../lib/utils";
import { SidebarContext, TSideBarContext } from "./DashboardLayout";

const sidebarLinks = [
  {
    icon: MdOutlineDashboard,
    name: "Dahboard",
    link: "/dashboard",
  },
  {
    icon: FaSitemap,
    name: "Supplies",
    link: "/dashboard/supplies",
  },
  {
    icon: FaHouseUser,
    name: "Profile",
    link: "/dashboard/profile",
  },
];

const Sidebar = () => {
  const { isSidebarOpen, setIsSidebarOpen } = useContext(
    SidebarContext
  ) as TSideBarContext;
  const { pathname } = useLocation();
  return (
    <div
      className={cn(
        " bg-[#1c2434] dark:bg-slate-900 h-screen w-0 lg:w-[370px] overflow-y-scroll scrollbar-none fixed lg:sticky left-0 top-0 z-50 ease-in-out duration-300",
        { "w-screen ": isSidebarOpen }
      )}
    >
      <div className=" p-5 sticky top-0 flex justify-between items-center">
        <Link to={"/"} className=" text-4xl  flex gap-x-2 items-center">
          <GiBrokenHeartZone className="text-[#3c50e0] mt-1" />
          <span className=" text-white font-semibold text-4xl">Respite</span>
        </Link>
        <button
          className="inline lg:hidden"
          onClick={() => setIsSidebarOpen((prev) => !prev)}
        >
          <FaChevronLeft className=" text-2xl text-white" />
        </button>
      </div>
      <div className="py-10 px-5">
        <h2 className=" text-md font-semibold uppercase text-[#8a99af] px-5">
          Menu
        </h2>
        <div
          onClick={() => setIsSidebarOpen((prev) => !prev)}
          className=" mt-5 text-white"
        >
          {sidebarLinks.map((data) => (
            <NavLink
              to={data.link}
              className={cn(
                "flex gap-x-3 items-center text-lg px-5 py-2 hover:bg-[#333a48] rounded-sm my-2",
                {
                  "bg-[#333a48]": pathname === data.link,
                }
              )}
            >
              {React.createElement(data.icon, { className: "text-lg" })}
              <p>{data.name}</p>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
