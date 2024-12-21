import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
const Banner = () => {
  return (
    <div className="bg-blue-600 w-full rounded-lg my-5 flex md:px-10 px-6 md:flex-row flex-col">
      {/* left */}
      <div className=" flex-1 py-8 md:py-16 lg:py-24 lg:pl-5">
        <div className="text-5xl font-semibold text-white">
          Book Appointment
          <br />
          With 100+ Trusted Doctors
        </div>
        <Link className=" rounded-full bg-white py-2 px-5 flex items-center w-max mt-10 hover:scale-105 transition-all duration-500"
        to='/login'>
          Create Account
        </Link>
      </div>
      {/*right  */}
      <div className="md:w-1/2 relative lg:w-[370px] md:block hidden">
        <img className="w-full absolute bottom-0 right-0 max-w-md" src={assets.appointment_img}/>
      </div>
    </div>
  );
};

export default Banner;
