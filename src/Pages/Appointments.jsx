import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import { UserContext } from "../Context/UserContext";
import { assets } from "../assets/assets";
import PopUp from "../Components/PopUp";
const Appointments = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const { docId } = useParams();
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const [date, setDate] = useState("");
  const [sameSpeciality, setSameSpeciality] = useState([]);
  const daysOfTheWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("notification");
  // Fetch doctor information
  useEffect(() => {
    const doc = doctors.find((doctor) => doctor._id === docId);
    setDocInfo(doc);
  }, [docId, doctors]);

  // Generate available slots
  useEffect(() => {
    if (docInfo) generateAvailableSlots();
  }, [docInfo]);

  const generateAvailableSlots = () => {
    const today = new Date();
    const slots = [];

    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(today);
      currentDay.setDate(today.getDate() + i);

      const endOfDay = new Date(currentDay);
      endOfDay.setHours(21, 0, 0, 0);

      if (i === 0) {
        currentDay.setHours(Math.max(10, currentDay.getHours() + 1));
        currentDay.setMinutes(currentDay.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDay.setHours(10, 0, 0, 0);
      }

      const daySlots = [];
      while (currentDay < endOfDay) {
        daySlots.push({
          dateTime: new Date(currentDay),
          time: currentDay.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        });
        currentDay.setMinutes(currentDay.getMinutes() + 30);
      }

      if (daySlots.length > 0) {
        slots.push(daySlots);
      }
    }

    setDocSlots(slots);
  };

  // Filter same specialty doctors
  useEffect(() => {
    if (docInfo) {
      const same = doctors.filter(
        (doctor) => doctor.speciality === docInfo.speciality && doctor._id !== docId
      );
      setSameSpeciality(same);
    }
  }, [docInfo, doctors]);

  // Book an appointment
  const bookAppointment = async () => {
    if (!date || !slotTime) return alert("Please select a date and time slot!");

    const newAppointment = {
      docId,
      date,
      time: slotTime,
      ...docInfo,
    };

    try {
      const currentAppointments = userInfo.appointments || []; // Fallback if undefined
      const updatedUser = {
        ...userInfo,
        appointments: [...currentAppointments, newAppointment],
      };

      // Update the user on the server
      const response = await fetch(`http://localhost:3001/Users/${userInfo.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) throw new Error("Failed to update user");

      setUserInfo(updatedUser); // Update local state
      setIsOpen(true);
      setMessage("Appointment booked successfully!");
    } catch (error) {
      console.error("Error booking appointment:", error);
      setIsOpen(true);
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    docInfo && (
      <div>
        {/* popup */}
        <PopUp isOpen={isOpen} setIsOpen={setIsOpen} message={message} setMessage={setMessage} />
     
        {/* Doctor Details */}
        <div className="flex flex-col md:flex-row gap-4 py-10 w-full text-gray-500">
          <img
            src={docInfo.image}
            alt={docInfo.name}
            className="bg-blue-600 w-full sm:max-w-72 rounded-lg"
          />
          <div className="border border-gray-500 p-10 rounded-lg w-full">
            <p className="text-3xl font-semibold text-gray-900 mb-1 flex items-center">
              {docInfo.name}
              <img src={assets.verified_icon} className="ml-2 w-5" alt="Verified" />
            </p>
            <p className="text-md mb-3">
              {docInfo.degree} - {docInfo.speciality}
              <button className="border rounded-full px-2 text-sm ml-2">
                {docInfo.experience} Years
              </button>
            </p>
            <p className="text-sm my-2">{docInfo.about}</p>
            <p className="my-3 font-semibold text-gray-700">
              Appointment Fee: <span>${docInfo.fees}</span>
            </p>
          </div>
        </div>

        {/* Booking Slots */}
        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
          <p>Booking Slots</p>
          {docSlots.length > 0 ? (
            <>
              <div className="flex gap-3 w-full mt-4 overflow-x-scroll">
                {docSlots.map((slots, index) => {
                  if (slots.length === 0) return null;
                  return (
                    <div
                      key={index}
                      className={`text-lg text-center rounded-full p-2 min-w-16 py-6 cursor-pointer ${
                        slotIndex === index ? "bg-blue-500 text-white" : "border border-gray-300"
                      }`}
                      onClick={() => {
                        setSlotIndex(index);
                        setDate(slots[0].dateTime.toDateString());
                      }}
                    >
                      <p>{daysOfTheWeek[slots[0].dateTime.getDay()]}</p>
                      <p>{slots[0].dateTime.getDate()}</p>
                    </div>
                  );
                })}
              </div>

              <div className="flex gap-3 w-full mt-4 overflow-x-scroll items-center">
                {docSlots[slotIndex]?.map((slot, index) => (
                  <p
                    key={index}
                    className={`text-sm font-light flex-shrink-0 cursor-pointer ${
                      slot.time === slotTime
                        ? "bg-blue-500 text-white"
                        : "text-gray-700 border border-gray-300"
                    } px-5 py-2 rounded-full`}
                    onClick={() => setSlotTime(slot.time)}
                  >
                    {slot.time}
                  </p>
                ))}
              </div>
              <button
                onClick={bookAppointment}
                className="bg-blue-600 text-white py-3 px-14 my-5 rounded-full flex items-center text-center font-light text-sm"
              >
                Book an Appointment
              </button>
            </>
          ) : (
            <p>No available slots at the moment. Please try again later.</p>
          )}
        </div>

        {/* Related Doctors */}
        <div className="flex flex-col items-center justify-center text-gray-800 py-16 gap-4">
          <div className="text-3xl font-medium">Related Doctors</div>
          <p className="text-center text-sm leading-tight sm:w-2/6">
            Browse through our extensive list of trusted doctors.
          </p>
          <div className="w-full flex justify-start gap-4 gap-y-6 px-3 sm:px-0">
            {sameSpeciality.map((doctor, index) => (
              <div
                key={index}
                onClick={() => navigate(`/appointments/${doctor._id}`)}
                className="w-60 border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
              >
                <img src={doctor.image} alt={doctor.name} className="w-full bg-blue-50" />
                <div className="p-4">
                  <p className="text-lg text-gray-900 font-medium">{doctor.name}</p>
                  <p className="text-gray-600 text-sm">{doctor.speciality}</p>
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
