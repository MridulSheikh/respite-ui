import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import DashboardNavbar from "./DashboardNavbar";
import { Dispatch, SetStateAction, createContext, useState } from "react";
import useOnAuthChange from "../../hooks/useOnAuthChange";

export type TSideBarContext = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
};

export const SidebarContext = createContext<TSideBarContext | null>(null);

const DashboardLayout = () => {
  useOnAuthChange();
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  return (
    <SidebarContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
      <div className=" flex bg-[#f1f5f9] dark:bg-slate-950">
        <Sidebar />
        <div className="w-full">
          <DashboardNavbar />
          <div className=" w-full bg-[#f1f5f9] dark:bg-slate-950 h-[calc(100vh-72px)] overflow-y-scroll scrollbar-thin">
            <Outlet />
          </div>
        </div>
      </div>
    </SidebarContext.Provider>
  );
};

export default DashboardLayout;
