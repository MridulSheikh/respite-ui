import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

const MainLayout = () => {
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
