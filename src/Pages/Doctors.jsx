import React, { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import { Link } from "react-router-dom";

const Doctors = () => {
  const { doctors } = useContext(AppContext);
  return (
    <div>
      <div className="w-full grid grid-cols-auto gap-4 gap-y-6 px-3 sm:px-0">
        {doctors.map((doctor, index) => {
         
            return (
              <Link
                to={`/appointments/${doctor._id}`}
                key={index}
                className=" border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
              >
                <img src={doctor.image} className="w-full bg-blue-50" />
                <div className="p-4">
                  <div className="flex items-center gap-2 text-sm  text-center text-green-500">
                    <p className="w-2 rounded-full bg-green-500 h-2"> </p>
                    <p>Available</p>
                  </div>
                  <p className="text-lg text-gray-900 font-medium">
                    {doctor.name}
                  </p>
                  <p className="text-gray-600 text-sm ">{doctor.speciality}</p>
                </div>
              </Link>
            );
          
        })}
      </div>
    </div>
  );
};

export default Doctors;
