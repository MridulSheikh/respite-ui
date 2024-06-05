import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import useOnAuthChange from "../../hooks/useOnAuthChange";

const MainLayout = () => {
  useOnAuthChange();
  return (
    <div className=" font-poppine">
      <Navbar />
      <Outlet />
      <Footer />
      <Toaster />
    </div>
  );
};

export default MainLayout;
