import { Swiper, SwiperSlide } from "swiper/react";
import fakePhotoGallery from "../../../constant/photogallery.fake.data";
import { Autoplay } from "swiper/modules";
import { useRef } from "react";
import SwiperCore from "swiper";
import "../../../styles/gallerySlider.css";

const GallerySlider = () => {
  const swiperRef = useRef<SwiperCore>();
  return (
    <div className="relative">
      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 5000,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          375: {
            slidesPerView: 1.5,
            slidesPerGroup: 1.5,
            spaceBetween: 5,
          },
          768: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            slidesPerGroup: 4,
            spaceBetween: 150,
          },
        }}
        loop={true}
        spaceBetween={150}
        slidesPerGroup={4}
        slidesPerView={4}
        onSwiper={(swiper) => {
          if (swiperRef.current) {
            swiperRef.current = swiper;
          }
        }}
        className="mt-10 gallery-slider"
      >
        {fakePhotoGallery.map((dt) => (
          <SwiperSlide key={dt.id}>
            <div className=" w-full h-48 md:size-60 lg:size-80 relative cursor-pointer  group hover:rounded-tl-[250px] overflow-hidden ease-in-out duration-700">
              <img
                src={dt.image}
                className=" object-cover object-center w-full h-full"
              />
              <div className=" bg-black opacity-50 hidden group-hover:block  absolute w-full h-full top-0 right-0 z-10 ease-in-out duration-700" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default GallerySlider;
