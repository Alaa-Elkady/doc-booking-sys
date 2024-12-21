import React from "react";
import {  specialityData } from "../assets/assets";
import { Link } from "react-router-dom";

const SpecialityMenu = () => {
  return (
    <div className="flex flex-col items-center justify-center text-gray-800 py-16 gap-4">
      <div className="text-3xl font-medium ">Find by Speciality</div>
      <p className="text-center text-sm leading-tight sm:w-2/6">
        Simply browse through our extensive list of trusted doctors, schedule
        your appointment hassle-free.
      </p>
      <div className="flex gap-2 flex-wrap justify-center m-10 overflow-scroll">
        {specialityData.map((item, index) => {
         return( <Link 
         to={`/doctors/${item.speciality}`} 
         className="flex flex-col justify-center items-center m-5 cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500"
          key={index}>
            <img src={item.image} className="rounded-full w-16 sm:w-24 mb-2 " />
            <p className="text-center text-xs"> {item.speciality}</p>
          </Link>)
        })}
      </div>
    </div>
  );
};

export default SpecialityMenu;
