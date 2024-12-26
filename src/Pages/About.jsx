import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div>
      <div className="w-full font-semibold text-2xl flex justify-center mt-16">
        <p className="text-gray-500 mr-2 font-normal">ABOUT</p>
        <p className="text-black font-medium">US</p>
      </div>

      <div className="flex md:flex-row flex-col items-center mt-10 ">
        <img src={assets.about_image} className="w-96 " />
        <div className="md:ml-10 text-sm text-gray-700 font-normal w-2/4 m-3">
          <p className="mb-10">
            Welcome to Prescripto, your trusted partner in managing your
            healthcare needs conveniently and efficiently. At Prescripto, we
            understand the challenges individuals face when it comes to
            scheduling doctor appointments and managing their health records.
          </p>
          <p className="mb-10">
            Prescripto is committed to excellence in healthcare technology. We
            continuously strive to enhance our platform, integrating the latest
            advancements to improve user experience and deliver superior
            service. Whether you're booking your first appointment or managing
            ongoing care, Prescripto is here to support you every step of the
            way.
          </p>
          <p className="mb-8 font-bold text-gray-900">Our Vision</p>
          <p className="mb-10">
            Our vision at Prescripto is to create a seamless healthcare
            experience for every user. We aim to bridge the gap between patients
            and healthcare providers, making it easier for you to access the
            care you need, when you need it.
          </p>
        </div>
      </div>
      <div className="mb-28">
        <div className="text-gray-900 font-semibold text-xl flex justify-start mb-4 mt-8">
          <p className="font-normal">WHY </p>
          <p className="font-medium ml-2"> CHOOSE US</p>
        </div>
        <div className="flex md:flex-row flex-col items-center text-gray-600">
          <div className="md:w-1/3 border h-52 flex flex-col items-start justify-center p-10 px-20 hover:bg-blue-500 hover:text-white ">
            <p className="text-md font-bold ">EFFICIENCY:</p>
            <p className="mt-5 text-sm font-medium">
              Streamlined appointment scheduling that fits into your busy
              lifestyle.
            </p>
          </div>

          <div className="md:w-1/3 border h-52 flex flex-col items-start justify-center p-10 px-20 hover:bg-blue-500 hover:text-white ">
            <p className="text-md font-bold ">CONVENIENCE:</p>
            <p className="mt-5 text-sm font-medium">
              Access to a network of trusted healthcare professionals in your
              area.
            </p>
          </div>

          <div className="md:w-1/3 border h-52 flex flex-col items-start justify-center p-10 px-20 hover:bg-blue-500 hover:text-white ">
            <p className="text-md font-bold ">PERSONALIZATION:</p>
            <p className="mt-5 text-sm font-medium">
              Tailored recommendations and reminders to help you stay on top of
              your health..
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
