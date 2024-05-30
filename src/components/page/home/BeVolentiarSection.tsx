import { FaHandHoldingHeart } from "react-icons/fa";

const BeVolentiarSection = () => {
  return (
    <div className="h-[100vh] md:h-[50vh] lg:h-[calc(100vh-80px)] relative overflow-hidden mt-20">
      <div className=" absolute top-0 z-10 w-full h-full">
        <div className=" grid lg:grid-cols-2 container mx-auto h-full px-5">
          <div className=" flex flex-col justify-center h-full">
            <p className=" uppercase text-sm font-bold text-[#2f1793]">
              Volunteer and Transform Lives
            </p>
            <h1 className=" text-2xl md:text-5xl leading-tight font-bold mt-2 mb-8 text-[#061c3c] dark:text-white">
              Spark Big Changes, One Act of Kindness at a Time.
            </h1>
            <p className="font-semibold text-[#1c4260] text-base lg:text-sm md:w-4/5 lg:w-3/4 dark:text-gray-400">
              We believe in the power of nourishment to uplift communities
              during times of crisis. Our platform connects donors, volunteers,
              and those in need, providing a lifeline of support through food
              distribution and donation initiatives.
            </p>
            <div className="flex gap-x-4 mt-5">
              <button className=" py-1.5 px-5 bg-[#2f1793] text-white rounded-sm  ease-in-out duration-200 relative hover:scale-95 flex items-center gap-x-2 uppercase">
                <FaHandHoldingHeart className="text-lg" />
                Be A Volunteer
                <div className="w-full h-full border-2 border-[#2f1793] bg-none absolute -right-1 -bottom-1 z-0" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className=" absolute top-0 w-full h-full bg-gradient-to-r dark:from-black from-white to-transparent" />
      <img
        src="/image/home/volanteer/bg.jpg"
        className=" object-cover object-center w-full h-full"
      />
    </div>
  );
};

export default BeVolentiarSection;
