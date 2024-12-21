import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";

const Appointments = () => {
  const { docId } = useParams();
  const { doctors } = useContext(AppContext);
  const [docInfo, setDocInfo] = useState(null);
  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
    console.log(docInfo);
  };
  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);
  return (
    docInfo && (
      <div>
        {/* top */}
        <div className="flex flex-col md:flex-row gap-4 py-10 w-full  text-gray-500">
          <img src={docInfo.image} className="bg-blue-600 w-full sm:max-w-72 rounded-lg" />

          <div className=" border border-gray-500 p-10 rounded-lg w-full">
            <p className="text-3xl font-semibold text-gray-900 mb-1 flex ">
              {docInfo.name}
              <img src={assets.verified_icon} className="m-1 w-5" />
            </p>
            <div className=" text-md mb-3 ">
              {docInfo.degree} -{docInfo.speciality}
              <button className="border rounded-full px-2 text-sm ml-2">
                {docInfo.experience}
              </button>
            </div>
            <div>
              <p className="flex font-semibold text-sm text-gray-700">
                About <img className="w-3 ml-1" src={assets.info_icon} alt="" />
              </p>
              <p className="text-sm  my-2">{docInfo.about}</p>
            </div>
            <div className='my-3 font-semibold  text-gray-700'>
              Appointment fee : <span> ${docInfo.fees}</span>
            </div>
          </div>
        </div>
        {/* slots */}
        <div></div>
        {/* bottom */}
        <div></div>
      </div>
    )
  );
};

export default Appointments;
