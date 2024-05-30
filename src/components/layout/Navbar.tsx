import { GiBrokenHeartZone } from "react-icons/gi";
import { Link } from "react-router-dom";
import { logout, useCurrentToken } from "../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { SlLogout } from "react-icons/sl";
import { useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion } from "framer-motion";
import NavbarMenu from "./NavbarMenu";
import ThemeSwitcher from "../ui/ThemeSwitcher";

const Navbar = () => {
  const userToken = useAppSelector(useCurrentToken);
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
          <ThemeSwitcher />
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;
