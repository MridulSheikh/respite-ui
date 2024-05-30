const BannerSection = () => {
  return (
    <div className=" h-[260px] items-center relative overflow-hidden">
      <div className="absolute z-10 h-full w-full flex flex-col justify-center items-center ">
        <h1 className="text-white font-semibold uppercase text-3xl  md:text-5xl">
          Supply Items
        </h1>
        <h2 className="text-white/55 uppercase  text-xl mt-2">
          HOME / SUPPLIES
        </h2>
      </div>

      <div className=" bg-black/60 absolute w-full h-full" />
      <img
        src="/image/supplies/banner.jpg"
        className=" object-cover object-center w-full h-full"
      />
    </div>
  );
};

export default BannerSection;
