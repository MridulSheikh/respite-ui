import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import TopDnatorSlider from "./TopDnatorSlider";
import { useRef } from "react";
import SwiperCore from "swiper";

const TopDonatorSection = () => {
  const swiperRef = useRef<SwiperCore>();
  return (
    <div className="container mx-auto px-5 mt-20">
      <div className=" flex  justify-between">
        <div>
          <h1 className=" font-extrabold  text-[#061c3c] text-3xl dark:text-white">
            Top Donor
          </h1>
          <p className="mt-3 text-[#293543] font-medium dark:text-gray-400">
            In the heart of our humanitarian efforts lies the invaluable support
            of <br />
            our top donators.{" "}
          </p>
        </div>
        <div className="hidden md:flex items-center gap-x-3">
          <button
            onClick={() => swiperRef?.current?.slidePrev()}
            className=" size-12 rounded-full border-2 text-[#061c3c] hover:bg-[#2f1793] hover:text-white border-[#2f1793] flex items-center justify-center ease-in-out duration-200"
          >
            <FaChevronLeft className=" text-xl" />
          </button>
          <button
            onClick={() => swiperRef?.current?.slideNext()}
            className=" size-12 rounded-full border-2 text-[#061c3c] hover:bg-[#2f1793] hover:text-white border-[#2f1793] flex items-center justify-center ease-in-out duration-200"
          >
            <FaChevronRight className=" text-xl" />
          </button>
        </div>
      </div>
      <TopDnatorSlider ref={swiperRef} />
    </div>
  );
};

export default TopDonatorSection;
