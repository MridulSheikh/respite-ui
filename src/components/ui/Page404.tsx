import Footer from "../layout/Footer";
import Navbar from "../layout/Navbar";

const Page404 = () => {
  return (
    <div>
      <Navbar />
      <div className=" bg-[#f4f5f6] dark:bg-black dark:text-white  h-[calc(100vh-100px)] flex flex-col justify-center items-center">
        <h1 className=" text-3xl md:text-9xl font-bold">Oops!</h1>
        <p className=" text-xl font-semibold mt-5">404 - PAGE NOT FOUND</p>
        <p className=" text-sm mt-3 md:w-1/2 lg:w-1/3 mx-auto text-center dark:text-gray-300">
          The page you are looking for might have been removed had its name
          Changed or is Temporarity unavailable.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Page404;
