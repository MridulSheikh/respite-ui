const WhatWeDoSection = () => {
  return (
    <div className=" container mx-auto px-5 mt-20">
      <div className=" grid grid-cols-1 lg:grid-cols-7 gap-y-14 lg:gap-y-0 gap-x-5 py-10">
        <div className=" lg:col-span-3">
          <h1 className=" font-extrabold  text-[#061c3c] text-3xl uppercase dark:text-white">
            What We Do?
          </h1>
          <p className=" text-[#1c4260] mt-7 text-base lg:text-base dark:text-gray-400">
            At Respite, we are dedicated to driving positive change and creating
            a brighter future for all. Through our diverse range of initiatives,
            we address critical needs in communities affected by disaster,
            poverty, and adversity. From providing emergency relief and
            distributing essential supplies to implementing sustainable
            development projects and fostering community resilience, our work
            spans across various areas of humanitarian aid. We collaborate with
            local partners, volunteers, and supporters to ensure our efforts are
            impactful, sustainable, and tailored to the unique needs of each
            community.
          </p>
          <div>
            <button className=" py-1.5 px-5 bg-[#2f1793] text-white rounded-sm  ease-in-out duration-200 relative hover:scale-95 flex items-center gap-x-2 mt-5">
              Learn More
              <div className="w-full h-full border-2 border-[#2f1793] bg-none absolute -right-1 -bottom-1 z-0" />
            </button>
          </div>
        </div>
        <div className="relative lg:col-span-4">
          <img
            src="/image/home/what_we_do/group_image.png"
            className=" object-contain w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default WhatWeDoSection;
