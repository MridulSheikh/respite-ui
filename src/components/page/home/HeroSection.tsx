import { GiHeartPlus } from "react-icons/gi";
import PlayVideoModal from "../../ui/modal/PlayVideoModal";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ParentVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const childrenVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const HeroSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
  });
  return (
    <div className=" h-[100vh] md:h-[50vh] lg:h-[calc(100vh-80px)] relative overflow-hidden">
      <div className=" absolute top-0 z-10 w-full h-full">
        <div className=" grid lg:grid-cols-2 container mx-auto h-full px-5">
          <motion.div
            ref={ref}
            variants={ParentVariant}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{
              duration: 0.8,
              delayChildren: 0.5,
              staggerChildren: 0.5,
            }}
            className=" flex flex-col justify-center h-full"
          >
            <motion.p
              variants={childrenVariant}
              className=" uppercase text-sm font-bold text-[#2f1793]"
            >
              Join Us in Making a Difference
            </motion.p>
            <motion.h1
              variants={childrenVariant}
              className=" text-3xl md:text-5xl leading-tight font-bold mt-2 mb-8 text-[#061c3c] dark:text-white"
            >
              Help The Needy People. Make big changes & help the world
            </motion.h1>
            <motion.p
              variants={childrenVariant}
              className="font-semibold text-[#1c4260] text-base lg:text-sm md:w-3/4 dark:text-gray-100"
            >
              We believe in the power of nourishment to uplift communities
              during times of crisis. Our platform connects donors, volunteers,
              and those in need, providing a lifeline of support through food
              distribution and donation initiatives.
            </motion.p>
            <motion.div
              variants={childrenVariant}
              className="flex gap-x-4 mt-5"
            >
              <Link to={"/supplies"}>
                <button className=" py-1.5 px-5 bg-[#2f1793] text-white rounded-sm  ease-in-out duration-200 relative hover:scale-95 flex items-center gap-x-2">
                  <GiHeartPlus className=" text-lg" />
                  Donate Now
                  <div className="w-full h-full border-2 border-[#2f1793] bg-none absolute -right-1 -bottom-1 z-0" />
                </button>
              </Link>

              <PlayVideoModal />
            </motion.div>
          </motion.div>
        </div>
      </div>
      <div className=" absolute top-0 w-full h-full bg-gradient-to-r from-white dark:from-black to-transparent" />
      <img
        src="/image/home/hero_banner.jpg"
        className=" object-cover object-center w-full h-full"
      />
    </div>
  );
};

export default HeroSection;
