import {React,useContext} from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
const TopDoctors = () => {
  const { doctors } = useContext(AppContext);
  return (
    <div className="flex flex-col items-center justify-center text-gray-800 py-16 gap-4">
      <div className="text-3xl font-medium ">Top Doctors to Book</div>
      <p className="text-center text-sm leading-tight sm:w-2/6">
        Simply browse through our extensive list of trusted doctors.
      </p>
      <div className="w-full grid grid-cols-auto gap-4 gap-y-6 px-3 sm:px-0">
        {doctors.map((doctor, index) => {
          if (
            doctor.experience === "4 Years" ||
            doctor.experience === "3 Years"
          ) {
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
          }
        })}
      </div>
      <Link to="/doctors" onClick={()=>{window.scrollTo(0,0)}} className="rounded-full  px-4  bg-blue-50 text-gray-400 py-2 w-max text-center">
        more
      </Link>
    </div>
  );
};

export default TopDoctors;