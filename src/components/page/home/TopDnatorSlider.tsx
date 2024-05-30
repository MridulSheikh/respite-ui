import { forwardRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "../../../styles/TopDonationSlider.css";
import { Autoplay, Pagination } from "swiper/modules";
import { BsInfoCircle } from "react-icons/bs";
import fakeTopDono from "../../../constant/top.dono.fakedata";

const TopDnatorSlider = forwardRef((_props, ref) => {
  const pagination = {
    clickable: true,
    renderBullet: function (_index: number, className: string) {
      return (
        '<div class="' +
        className +
        ' bg-[#2f1793] text-center rounded-full size-2.5 inline-block cursor-pointer">' +
        "</div>"
      );
    },
  };
  return (
    <Swiper
      pagination={pagination}
      modules={[Autoplay, Pagination]}
      autoplay={{
        delay: 5000,
        pauseOnMouseEnter: true,
      }}
      breakpoints={{
        640: {
          slidesPerView: 1.3,
          slidesPerGroup: 1,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 1.3,
          slidesPerGroup: 1,
          spaceBetween: 10,
        },
        1024: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 20,
        },
      }}
      loop={true}
      spaceBetween={20}
      onSwiper={(swiper) => {
        if (ref) {
          if (typeof ref === "function") {
            ref(swiper);
          } else {
            ref.current = swiper;
          }
        }
      }}
      className="mt-10 top-donator-slider"
    >
      {fakeTopDono.map((dt) => (
        <SwiperSlide
          key={dt.id}
          className=" bg-white dark:bg-slate-900 rounded-sm overflow-hidden"
        >
          <div className="w-full md:grid grid-cols-10">
            <div className="relative h-96 w-full md:h-[288px] col-span-4 overflow-hidden">
              <img
                src={dt.image}
                className=" object-cover object-top h-full w-full"
              />
            </div>
            <div className="p-5 col-span-6 h-full bg-white dark:bg-slate-900">
              <h1 className=" text-2xl font-bold mb-1 uppercase dark:text-white">
                {dt.name}
              </h1>
              <span className="dark:text-gray-400">
                {" "}
                <span className=" text-[#f74f22] font-bold text-sm">
                  {dt.position}
                </span>{" "}
                of {dt.company}
              </span>
              <p className=" text-sm text-gray-700 mt-4 dark:text-white">
                {dt.discription.length > 150
                  ? `${dt.discription.substring(0, 150)}...`
                  : dt.discription}
              </p>
              <p className=" mt-4 dark:text-gray-400">
                {" "}
                <span className=" font-semibold text-[#f74f22]">
                  ${dt.donateAmount}
                </span>{" "}
                Donated
              </p>
              <button className=" py-1.5 px-5 bg-[#2f1793] text-white rounded-sm  ease-in-out duration-200 relative hover:scale-95 flex items-center gap-x-2 mt-5">
                <BsInfoCircle className=" text-lg" />
                More About {dt.name}
                <div className="w-full h-full border-2 border-[#2f1793] bg-none absolute -right-1 -bottom-1 z-0" />
              </button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
});
export default TopDnatorSlider;
