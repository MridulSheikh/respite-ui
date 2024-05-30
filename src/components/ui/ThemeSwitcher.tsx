import { useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { toogle, useTheme } from "../../redux/features/Theme/themeSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hook";

const ThemeSwitcher = () => {
  const theme = useAppSelector(useTheme);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);
  const handleThemeSwitcher = () => {
    dispatch(toogle());
  };
  console.log(theme);
  return (
    <div
      className="flex items-center gap-x-2 cursor-pointer"
      onClick={handleThemeSwitcher}
    >
      {theme === "light" ? (
        <FaMoon className=" text-xl dark:text-white" />
      ) : (
        <FaSun className=" text-xl dark:text-white" />
      )}
    </div>
  );
};

export default ThemeSwitcher;
