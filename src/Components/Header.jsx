import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className="bg-blue-600 w-full rounded-lg my-5 flex md:px-10 px-6 md:flex-row flex-col ">
      {/* left side */}
      <div className="md:w-1/2 flex flex-col justify-center gap-4 items-start py-10 m-auto md:py-[10vw] md:mb-[-30px]">
        <p className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight md:leading-tight lg:leading-tight">
          Book Appointment
          <br />
          With Trusted Doctors
        </p>
        <div className="flex md:flex-row flex-col items-center gap-3 text-white font-light text-sm">
          <img src={assets.group_profiles} className="w-28" />
          <p>
            Simply browse through our extensive list of trusted doctors, <br />
            schedule your appointment hassle-free.
          </p>
        </div>
        <Link
          to='/login'
          className="bg-white py-2 px-4 rounded-full flex items-center w-max hover:translate-x-5 transition-all duration-100 "
        >
          Book appointment <img src={assets.arrow_icon}
          className="pl-2" />
        </Link>
      </div>
      {/* right side  */}
      <div className="md:w-1/2 relative ">
        <img
          src={assets.header_img}
          className="w-full md:absolute bottom-0 rounded-lg h-auto"
        />
      </div>
    </div>
  );
};

export default Header;
