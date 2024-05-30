import { LuMenu } from "react-icons/lu";
import Menu from "../ui/menu";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import { GiBrokenHeartZone } from "react-icons/gi";
import { SlLogout } from "react-icons/sl";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { logout, useCurrentToken } from "../../redux/features/auth/authSlice";

const NavbarMenu = () => {
  const userToken = useAppSelector(useCurrentToken);
  const dispatch = useAppDispatch();
  return (
    <Menu>
      <Menu.toogleButton>
        <LuMenu className=" text-2xl dark:text-white" />
      </Menu.toogleButton>
      <Menu.body className="animate-fade-down animate-duration-500 dark:bg-slate-900">
        <div className=" flex justify-between items-center sticky top-0">
          <Link
            to={"/"}
            className=" text-3xl font-bold flex gap-x-2 items-center"
          >
            <GiBrokenHeartZone className="text-[#2f1793] mt-1" />
            <span className="dark:text-white">Respite</span>
          </Link>
          <Menu.toogleButton>
            <AiOutlineClose className=" text-2xl dark:text-white" />
          </Menu.toogleButton>
        </div>
        <Menu.toogleButton className=" gap-y-7 text-gray-900 dark:text-gray-100 text-base font-medium flex flex-col justify-center items-center h-full">
          <Link to={"/supplies"}>Supplies</Link>
          {!userToken ? (
            <>
              <Link to={"/login"}>Login</Link>
              <Link to="/register">
                <button className=" py-1.5 px-5 bg-[#2f1793] text-white rounded-sm  ease-in-out duration-200 relative hover:scale-95">
                  Registration
                  <div className="w-full h-full border-2 border-[#2f1793] bg-none absolute -right-1 -bottom-1 z-0" />
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link to={"/dashboard"}>Dashboard</Link>
              <button
                onClick={() => dispatch(logout())}
                className=" py-1.5 px-5 bg-[#2f1793] flex gap-x-2 items-center text-white rounded-sm  ease-in-out duration-200 relative hover:scale-95"
              >
                <SlLogout />
                Logout
                <div className="w-full h-full border-2 border-[#2f1793] bg-none absolute -right-1 -bottom-1 z-0" />
              </button>
            </>
          )}
        </Menu.toogleButton>
      </Menu.body>
    </Menu>
  );
};

export default NavbarMenu;
