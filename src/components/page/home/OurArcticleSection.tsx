import { MdDateRange } from "react-icons/md";
import fakeBlogData from "../../../constant/fake.blog.data";
import { FaRegCommentDots } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";

const OurArcticleSection = () => {
  return (
    <div className=" mt-20 container mx-auto px-5 pb-20">
      <div className=" grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className=" lg:col-span-5 flex flex-col justify-center">
          <p className=" text-[#2f1793] text-lg font-bold">OUR BLOG</p>
          <h1 className=" text-4xl mt-2 font-extrabold text-[#061c3c] dark:text-white">
            Insights & Inspiration
          </h1>
          <p className=" mt-5 text-[#293543] font-medium text-lg lg:text-base dark:text-gray-400">
            Etiam interdum arcu metus, eget ultricies eros euismod ut. Aenean
            sem fermentum vestibulum risus, et volutpat elit. Suspendisse
            potenti. Fusce porttitor faucibus velit. Duis ac lorem cursus,
            sagittis enim nec, aliquam lacus. Nunc mattis interdum turpis, in{" "}
            <br />
            <br />
            varius est. Nunc mattis interdum turpis, in varius est. Morbi
            imperdiet magna etno mauris rhoncus ide iaculis odio auctor. Mauris
            at felis rhoncus nibh non aliquet tellus. Integer at convallis
            tortor porta varius nisl.
          </p>
          <div>
            <button className=" py-1.5 px-5 mt-5 bg-[#2f1793] text-white rounded-sm  ease-in-out duration-200 relative hover:scale-95 flex items-center gap-x-2 uppercase">
              View All Blog
              <div className="w-full h-full border-2 border-[#2f1793] bg-none absolute -right-1 -bottom-1 z-0" />
            </button>
          </div>
        </div>
        <div className=" lg:col-span-7 grid grid-col md:grid-cols-2 gap-x-7 mt-10 lg:mt-0">
          {fakeBlogData.map((item) => (
            <div
              key={item.id}
              className=" rounded-md overflow-hidden bg-white shadow-md dark:bg-slate-900"
            >
              <div className=" relative h-64 overflow-hidden">
                <img
                  src={item.cover}
                  className=" object-cover object-center h-full w-full"
                />
              </div>
              <div className="p-5">
                <h1 className=" text-lg font-bold text-[#061c3c] dark:text-white">
                  {item.title}
                </h1>
                <div className=" flex items-center gap-x-10 mt-2.5 text-[#f74f22]">
                  <div className=" flex items-center gap-x-2">
                    <MdDateRange className=" text-lg" />
                    <span>{item.publishDate}</span>
                  </div>
                  <div className=" flex items-center gap-x-2">
                    <FaRegCommentDots className=" text-lg" />
                    <span>{item.totalComment}</span>
                  </div>
                </div>
                <p className=" text-sm mt-4 text-[#656565] dark:text-gray-200">
                  {item.discription}
                </p>
                <button className=" uppercase mt-7 text-[#f74f22] font-semibold hover:text-[#c8664b] flex items-center gap-x-2">
                  <span>Read More</span>
                  <FaArrowRightLong />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurArcticleSection;
