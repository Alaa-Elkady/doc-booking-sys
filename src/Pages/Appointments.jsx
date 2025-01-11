import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import { UserContext } from "../Context/UserContext";
const Appointments = ({ isUser }) => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const { docId } = useParams();
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);
  const [docInfo, setDocInfo] = useState(null);
  const [docSlot, setDocSlot] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const daysOfTheweek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const [sameSpeciality, setSameSpecialty] = useState([]);
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [appointments, setAppointments] = useState([userInfo.appointments]);
  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };

  const getAvailableSlot = async () => {
    setDocSlot([]);
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      // getting date with index
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      // setting the end time of the date of index
      let endTime = new Date(today);
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);
      // setting hours
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.getMinutes(0);
      }
      let timeSlots = [];
      while (currentDate < endTime) {
        const formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        timeSlots.push({
          dateTime: new Date(currentDate),
          time: formattedTime,
        });
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      setDocSlot((prev) => [...prev, timeSlots]);
    }
  };
  const bookAppointment = async () => {
    const newBook = {
      docId: docId,
      date: date,
      time: time,
      name: docInfo.name,
      image: docInfo.image,
      speciality: docInfo.speciality,
      fees: docInfo.fees,
      address: docInfo.address,
    };
    const responseUser = await fetch(`http://localhost:3001/Users/${userInfo.id}`)
   setUserInfo(await responseUser.json())

    setAppointments([ ...userInfo.appointments,newBook]);
    const response = await fetch(`http://localhost:3001/Users/${userInfo.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify( {
        appointments: appointments}),
    });
    console.log(response);
    
  };
  const fliteredSpec = () => {
    let same = doctors.filter(
      (doc) => doc.speciality === docInfo.speciality && doc._id !== docId
    );
    setSameSpecialty(same);
  };
  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);
  useEffect(() => {
    if (doctors && docInfo) {
      fliteredSpec();
    }
  }, [doctors, docInfo]);
  useEffect(() => {
    getAvailableSlot();
  }, [docInfo]);
  useEffect(() => {
    console.log(appointments);
  }, [appointments]);

  return (
    docInfo && (
      <div>
        {/* top */}
        <div className="flex flex-col md:flex-row gap-4 py-10 w-full  text-gray-500">
          <img
            src={docInfo.image}
            className="bg-blue-600 w-full sm:max-w-72 rounded-lg"
          />

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
            <div className="my-3 font-semibold  text-gray-700">
              Appointment fee : <span> ${docInfo.fees}</span>
            </div>
          </div>
        </div>
        {/* slots */}
        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
          <p> Booking Slots</p>

          <div className="flex gap-3 w-full mt-4 overflow-x-scroll">
            {docSlot.length &&
              docSlot.slice(1, 7).map((item, index) => {
                return (
                  <div
                    key={index}
                    className={`text-lg text-center rounded-full p-2 min-w-16 py-6 cursor-pointer ${
                      slotIndex === index
                        ? "bg-blue-500 text-white"
                        : " border border-gray-300"
                    }`}
                    onClick={() => {
                      setSlotIndex(index);
                      setDate(item[0].dateTime.toDateString());
                    }}
                  >
                    <p>{item[0] && daysOfTheweek[item[0].dateTime.getDay()]}</p>
                    <p>{item[0] && item[0].dateTime.getDate()}</p>
                  </div>
                );
              })}
          </div>

          <div className="flex gap-3 w-full mt-4 overflow-x-scroll items-center">
            {docSlot.length &&
              docSlot[slotIndex].map((item, index) => {
                return (
                  <p
                    className={`text-sm font-light flex-shrink-0 cursor-pointer ${
                      item.time === slotTime
                        ? "bg-blue-500 text-white"
                        : "text-gray-700 border border-gray-300"
                    } px-5 py-2 rounded-full`}
                    key={index}
                    onClick={() => {
                      setSlotTime(item.time);
                      setTime(item.time.toLowerCase());
                    }}
                  >
                    {item.time.toLowerCase()}
                  </p>
                );
              })}
          </div>
          <button
            onClick={bookAppointment}
            className="bg-blue-600 text-white py-3 px-14 my-5 rounded-full flex items-center text-center font-light text-sm "
          >
            Book an appointment{" "}
          </button>
        </div>

        <div className="flex flex-col items-center justify-center text-gray-800 py-16 gap-4">
          <div className="text-3xl font-medium ">Related Doctors</div>
          <p className="text-center text-sm leading-tight sm:w-2/6">
            Simply browse through our extensive list of trusted doctors.
          </p>
          <div className="w-full flex justify-start gap-4 gap-y-6 px-3 sm:px-0">
            {sameSpeciality.length > 0 &&
              sameSpeciality.slice(0, 5).map((doctor, index) => (
                <div
                  onClick={() => {
                    navigate(`/appointments/${doctor._id}`);
                    window.scrollTo(0, 0);
                  }}
                  key={index}
                  className="w-60 border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
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
                    <p className="text-gray-600 text-sm ">
                      {doctor.speciality}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    )
  );
};

export default Appointments;
