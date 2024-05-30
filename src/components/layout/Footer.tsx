import React from "react";
import { GiBrokenHeartZone, GiHeartPlus } from "react-icons/gi";
import { Link } from "react-router-dom";
import fakeSocialLink from "../../constant/fake.social.link";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className=" bg-[#111111]">
      <div className=" container mx-auto px-5 py-7 grid grid-cols-1 md:grid-cols-3 gap-7">
        <div>
          <Link
            to={"/"}
            className=" text-3xl font-bold flex gap-x-2 items-center"
          >
            <GiBrokenHeartZone className="text-white mt-1" />
            <span className=" text-white">Respite</span>
          </Link>
          <p className=" text-white mt-4 text-sm font-light leading-[25.5px]">
            Core values are the fundamental beliefs of a person or organization.
            The core values are the guiding prin ples that dictate behavior and
            action suas labore saperet has there any quote for write lorem
            percit latineu.
          </p>
          <div className="mt-7 flex gap-x-5 items-center">
            {fakeSocialLink.map((dt, index) => (
              <a
                target="_blank"
                href={dt.link}
                key={index}
                className=" text-white cursor-pointer"
              >
                {React.createElement(dt.icon, {
                  className:
                    "text-2xl hover:text-[#2f1793] ease-in-out duration-200",
                })}
              </a>
            ))}
          </div>
        </div>
        <div className=" mt-10 md:mt-0 md:px-10">
          <h1 className=" text-3xl text-white font-bold">Contact</h1>
          <div className=" mt-5">
            <div className=" flex gap-x-4 items-center">
              <FaPhoneSquareAlt className=" text-[#2f1793] text-xl" />
              <span className=" text-white">+880 1883992408</span>
            </div>
            <div className=" flex gap-x-4 items-center mt-4">
              <MdEmail className=" text-[#2f1793] text-xl" />
              <span className=" text-white">needhelp@company.com</span>
            </div>
            <div className=" flex gap-x-4 mt-4">
              <FaLocationDot className=" text-[#2f1793] text-xl" />
              <span className=" text-white">
                666 road, broklyn street new york 600
              </span>
            </div>
          </div>
        </div>
        <div className="mt-10 md:mt-0 md:px-10">
          <h1 className=" text-3xl text-white font-bold">Support</h1>
          <p className="leading-[25.5px] mt-5 text-white">
            With enthusiastic employees and volunteers, we are ready to support
            you no matter any time.
          </p>
          <Link to={"/supplies"}>
            <button className=" py-1.5 px-5 bg-[#2f1793] text-white rounded-sm  ease-in-out duration-200 relative hover:scale-95 flex items-center gap-x-2 uppercase mt-4">
              <GiHeartPlus className=" text-lg" />
              Donate
              <div className="w-full h-full border-2 border-[#2f1793] bg-none absolute -right-1 -bottom-1 z-0" />
            </button>
          </Link>
        </div>
      </div>
      <div className="pb-5 mt-3 container mx-auto px-5 text-center">
        <p className=" text-sm text-white/30">
          © 2024 Respite. Trademarks and brands are the property of their
          respective owners.
        </p>
      </div>
    </div>
  );
};

export default Footer;
