import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context/AppContext";
import { Link, useNavigate, useParams } from "react-router-dom";

const Doctors = () => {
  const { doctors } = useContext(AppContext);
  const { speciality } = useParams();
  const [fliterDocs, setFliterDocs] = useState([]);
  const navigate = useNavigate();
  const filter = () => {
    if (speciality) {
      setFliterDocs(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFliterDocs(doctors);
    }
  };
  useEffect(() => {
    filter();
  }, [doctors, speciality]);
  return (
    <div>
      <div className="my-3 text-gray-600 text-md">
        Browse through the doctors specialist.
      </div>
      <div className="flex md:items-start  md:flex-row flex-col gap-3 ">
        <h1 className="md:hidden text-sm  capitalize font-semibold">filter by speciality</h1>
        <ul className="flex md:flex-col flex-wrap flex-row justify-center">
          <li
            onClick={() =>
              speciality === "General physician"
                ? navigate("/doctors")
                : navigate(`/doctors/General physician`)
            }
            className="border rounded border-gray-300 py-2 px-3 w-48 cursor-pointer my-2 mr-3 text-gray-600 text-sm"
          >
            General physician
          </li>
          <li
            onClick={() =>
              speciality === "Gynecologist"
                ? navigate("/doctors")
                : navigate(`/doctors/Gynecologist`)
            }
            className="border rounded border-gray-300 py-2 px-3 w-48 cursor-pointer my-2 mr-3 text-gray-600 text-sm"
          >
            Gynecologist
          </li>
          <li
            onClick={() =>
              speciality === "Dermatologist"
                ? navigate("/doctors")
                : navigate(`/doctors/Dermatologist`)
            }
            className="border rounded border-gray-300 py-2 px-3 w-48 cursor-pointer my-2 mr-3 text-gray-600 text-sm"
          >
            Dermatologist
          </li>
          <li
            onClick={() =>
              speciality === "Pediatricians"
                ? navigate("/doctors")
                : navigate(`/doctors/Pediatricians`)
            }
            className="border rounded border-gray-300 py-2 px-3 w-48 cursor-pointer my-2 mr-3 text-gray-600 text-sm"
          >
            Pediatricians
          </li>
          <li
            onClick={() =>
              speciality === "Neurologist"
                ? navigate("/doctors")
                : navigate(`/doctors/Neurologist`)
            }
            className="border rounded border-gray-300 py-2 px-3 w-48 cursor-pointer my-2 mr-3 text-gray-600 text-sm"
          >
            Neurologist
          </li>
          <li
            onClick={() =>
              speciality === "Gastroenterologist"
                ? navigate("/doctors")
                : navigate(`/doctors/Gastroenterologist`)
            }
            className="border rounded-md border-gray-200 py-2 px-3 w-48 cursor-pointer my-2 mr-3 text-gray-600 text-sm"
          >
            Gastroenterologist
          </li>
        </ul>
        <div className="w-full flex md:items-start justify-center flex-wrap gap-3 gap-y-4 px-3 my-3">
          {fliterDocs.map((doctor, index) => {
            return (
              <Link
                to={`/appointments/${doctor._id}`}
                key={index}
                className="md:w-56 w-44  border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
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
    </div>
  );
};

export default Doctors;
