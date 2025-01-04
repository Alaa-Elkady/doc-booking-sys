import React, { useContext, useState } from "react";
import { AppContext } from "./../Context/AppContext";

const MyAppointments = () => {
  const { doctors } = useContext(AppContext);
  const [isCancel, setIsCancel] = useState(false);
  return (
    <div>
      <div className="text-gray-600 font-semibold my-10 text-lg">
        My Appointments
      </div>
      {doctors.slice(0, 3).map((doctor, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row  items-center justify-between w-full border-b border-gray-200"
        >
          <div className=" my-5 flex flex-row items-start md:w-8/12">
            <img
              src={doctor.image}
              className="w-32 rounded bg-indigo-100"
              alt=""
            />
            <div className="ml-5 md:w-5/12 text-sm capitalize">
              <div className="font-semibold">{doctor.name}</div>
              <div>{doctor.speciality}</div>
              <div>
                <div className="font-semibold">address</div>
                <div>{doctor.address.line1}</div>
                <div>{doctor.address.line2}</div>
              </div>
              <div className="flex flex-row">
                <div className="font-semibold mr-1">Date & Time:</div>
                <div> 26 undefined 2024 | 07:00 PM</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col  md:w-2/12 mb-3">
            {isCancel ? (
              <button className="w-full  border py-2 px-4 rounded  border-red-500 text-red-500 text-sm">
                Appointment Cancelled
              </button>
            ) : (
              <>
                <button className="w-full mb-5 border py-2 px-4 rounded border-gray-200 text-sm hover:bg-blue-600 hover:text-white text-gray-600 transition-all duration-500 mr-5">
                  Pay online
                </button>
                <button
                  onClick={() => setIsCancel(true)}
                  className="w-full  border py-2 px-4 rounded  border-gray-200 text-sm hover:bg-red-500 hover:text-white text-gray-600 transition-all duration-500"
                >
                  Cancel Appointment
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyAppointments;
