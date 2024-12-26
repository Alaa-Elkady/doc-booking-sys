import React from "react";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div className="mb-40">
      <div className="w-full font-semibold text-2xl flex justify-center mt-16">
        <p className="text-gray-500 mr-2 font-normal">CONTACT</p>
        <p className="text-black font-medium">US</p>
      </div>
      <div className="flex md:flex-row flex-col items-center justify-center mt-10 ">
        <img src={assets.contact_image} className="w-96 " />
        <div className="md:ml-10  text-gray-600 font-normal  m-3">
          <p className="text-lg font-semibold mb-5">OUR OFFICE</p>
          <p className="mb-5">
            00000 Willms Station
            <br />
            Suite 000, Washington, USA
          </p>
          <p className="mb-5">
            Tel: (000) 000-0000
            <br />
            Email: greatstackdev@gmail.com
          </p>
          <p className="mb-5 font-semibold">CAREERS AT PRESCRIPTO</p>
          <p className="mb-3">Learn more about our teams and job openings.</p>
          <button className="w-36 h-14 border border-black hover:bg-black hover:text-white text-black transition-all duration-500">
            Explore Jobs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
