import { GiBrokenHeartZone } from "react-icons/gi";
import { Link } from "react-router-dom";
import {
  logout,
  useCurrentToken,
  useCurrentUser,
} from "../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { SlLogout } from "react-icons/sl";
import { useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion } from "framer-motion";
import NavbarMenu from "./NavbarMenu";
import ThemeSwitcher from "../ui/ThemeSwitcher";
import UserAvator from "../shared/UserAvator";

const Navbar = () => {
  const userToken = useAppSelector(useCurrentToken);
  const user = useAppSelector(useCurrentUser);
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (previous) {
      if (latest > previous && latest > 10) setHidden(true);
      else setHidden(false);
    }
  });
  return (
    <motion.div
      variants={{
        visible: { y: 0, opacity: "100%" },
        hidden: { y: "-100%" },
      }}
      initial={{ opacity: "0%" }}
      animate={hidden ? "hidden" : "visible"}
      transition={{
        duration: 0.35,
        ease: "easeInOut",
        opacity: {
          duration: 0.8,
        },
      }}
      className=" h-20 flex items-center bg-white dark:bg-[#050505] sticky top-0 z-50"
    >
      <div className=" container mx-auto flex justify-between items-center px-5">
        <Link
          to={"/"}
          className=" text-3xl font-bold flex gap-x-2 items-center hover:scale-105 ease-in-out duration-200"
        >
          <GiBrokenHeartZone className="text-[#2f1793] mt-1" />
          <span className="dark:text-white">Respite</span>
        </Link>
        <div className=" flex items-center gap-x-2 lg:hidden">
          <NavbarMenu />
          <ThemeSwitcher />
        </div>
        <div className=" gap-x-7 items-center text-gray-900 text-base font-medium hidden lg:flex">
          <span className="relative">
            <Link
              to={"/supplies"}
              className="after:content-[''] after:bg-[#2f1793] after:h-[3px] after:w-[0%] after:left-0 after:-bottom-[5px] after:rounded-xl after:absolute after:duration-300 hover:after:w-[100%] hover:text-[#2f1793] dark:text-white dark:hover:text-[#2f1793]"
            >
              Supplies
            </Link>
          </span>
          <span className="relative">
            <Link
              to={"/leaderboard"}
              className="after:content-[''] after:bg-[#2f1793] after:h-[3px] after:w-[0%] after:left-0 after:-bottom-[5px] after:rounded-xl after:absolute after:duration-300 hover:after:w-[100%] hover:text-[#2f1793] dark:text-white dark:hover:text-[#2f1793]"
            >
              Leaderboard
            </Link>
          </span>
          <span className="relative">
            <Link
              to={"/community"}
              className="after:content-[''] after:bg-[#2f1793] after:h-[3px] after:w-[0%] after:left-0 after:-bottom-[5px] after:rounded-xl after:absolute after:duration-300 hover:after:w-[100%] hover:text-[#2f1793] dark:text-white dark:hover:text-[#2f1793]"
            >
              Community
            </Link>
          </span>

          {!userToken ? (
            <>
              <span className="relative">
                <Link
                  to={"/login"}
                  className="after:content-[''] after:bg-[#2f1793] after:h-[3px] after:w-[0%] after:left-0 after:-bottom-[5px] after:rounded-xl after:absolute after:duration-300 hover:after:w-[100%] hover:text-[#2f1793] dark:text-white dark:hover:text-[#2f1793]"
                >
                  Login
                </Link>
              </span>

              <Link to="/register">
                <button className=" py-1.5 px-5 bg-[#2f1793] text-white rounded-sm  ease-in-out duration-200 relative hover:scale-95">
                  Registration
                  <div className="w-full h-full border-2 border-[#2f1793] bg-none absolute -right-1 -bottom-1 z-0" />
                </button>
              </Link>
            </>
          ) : (
            <>
              <span className=" relative">
                <Link
                  to={"/dashboard"}
                  className="after:content-[''] after:bg-[#2f1793] after:h-[3px] after:w-[0%] after:left-0 after:-bottom-[5px] after:rounded-xl after:absolute after:duration-300 hover:after:w-[100%] hover:text-[#2f1793] dark:text-white dark:hover:text-[#2f1793]"
                >
                  Dashboard
                </Link>
              </span>

              <div
                onClick={() => setOpen((Prev) => !Prev)}
                className=" flex items-center gap-x-1.5 rounded-sm cursor-pointer relative"
              >
                <UserAvator src={user?.img} className="size-9" />

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
            </>
          )}
          <ThemeSwitcher />
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;
