import React from "react";
import { useState, useContext } from "react";
import { UserContext } from "./../Context/UserContext";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import PopUp from "../Components/PopUp";
const MyProfile = () => {
  const { userInfo } = useContext(UserContext);
  const [message, setMessage] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState({
    name: userInfo.name,
    // image: assets.profile_pic,
    email: userInfo.email,
    phone: userInfo.phone || "00000000",
    address: {
      line1: userInfo.address?.line1 || "Not available",
      line2: userInfo.address?.line2 || "Not available",
    },
    gender: userInfo.gender || "Not selected",
    dob: userInfo.dob || "not selected",
  });
  const { id } = useParams();
  const handleEdit = async () => {
    if (isEdit) {
      try {
        const response = await fetch(`http://localhost:3001/Users/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        });
        if (response.ok) {
          const updatedUser = await response.json();
          setUserData(updatedUser); // Update context
          setIsOpen(true);
          setMessage("Profile updated successfully!");
        } else {
          setIsOpen(true);
          setMessage("Failed to update profile. Please try again.");
        }
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    }
    setIsEdit(!isEdit);
  };

  const [isEdit, setIsEdit] = useState(false);
  return (
    <div className="flex flex-col items-start md:w-1/3">
      <PopUp isOpen={isOpen} setIsOpen={setIsOpen} message={message} />
      <img
        className="w-40 h-40 rounded-lg mt-12 mb-6"
        src={assets.profile_pic}
        alt=""
      />
      {isEdit ? (
        <input
          type="text"
          className="border border-gray-200 rounded-lg w-50 px-2 py-1 my-3"
          placeholder={userData.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          value={userData.name}
        />
      ) : (
        <h2 className="text-3xl font-semibold  ">{userData.name}</h2>
      )}
      <h2 className="text-gray-600 underline uppercase text-sm my-3 border-t border-black pt-3 w-full">
        Contact Information
      </h2>
      <div className="w-full flex justify-between flex-row">
        <span className="text-gray-600 text-sm m-3 w-1/2">Email</span>
        {isEdit ? (
          <input
            type="email"
            className="border border-gray-200 rounded-lg  px-2 py-1 my-3"
            placeholder={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
            value={userData.email}
          />
        ) : (
          <div className="w-1/2 text-blue-700 font-light">{userData.email}</div>
        )}
      </div>
      <div className="w-full flex justify-between flex-row ">
        <span className="text-gray-600 text-sm m-3 w-1/2">Phone</span>
        {isEdit ? (
          <input
            type="phone"
            className="border border-gray-200 rounded-lg w-1/2 px-2 py-1 my-3"
            placeholder={userData.phone}
            onChange={(e) =>
              setUserData({ ...userData, phone: e.target.value })
            }
            value={userData.phone}
          />
        ) : (
          <div className="w-1/2 text-blue-700 font-light">{userData.phone}</div>
        )}
      </div>
      <div className="w-full flex justify-between flex-row">
        <span className="text-gray-600 text-sm m-3 w-1/2">Address</span>
        {isEdit ? (
          <div className="flex flex-col w-1/2">
            <input
              type="text"
              className="border border-gray-200 rounded-lg w-full px-2 py-1 my-1"
              placeholder={userData.address.line1}
              onChange={(e) =>
                setUserData({ ...userData, address: e.target.address.line1 })
              }
              value={userData.address.line1}
            />
            <input
              type="text"
              className="border border-gray-200 rounded-lg w-full px-2 py-1 "
              placeholder={userData.address.line2}
              onChange={(e) =>
                setUserData({ ...userData, address: e.target.address.line2 })
              }
              value={userData.address.line2}
            />
          </div>
        ) : (
          <div className="w-1/2 text-sm">
            {userData.address.line1}
            <br />
            {userData.address.line2}
          </div>
        )}
      </div>
      <h2 className="text-gray-600 underline uppercase text-sm my-3">
        Basic Information
      </h2>
      <div className="w-full  flex justify-between flex-row">
        <span className="text-gray-600 text-sm w-1/2 m-3">Gender</span>
        {isEdit ? (
          <select
            type="text"
            className="border border-gray-200 rounded-lg w-1/2 px-2 py-1 my-3"
            placeholder={userData.gender}
            onChange={(e) =>
              setUserData({ ...userData, gender: e.target.value })
            }
            value={userData.gender}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        ) : (
          <div className="w-1/2">{userData.gender}</div>
        )}
      </div>
      <div className="w-full flex justify-between flex-row">
        <span className="text-gray-600 text-sm w-1/2 m-3">Date of Birth</span>
        {isEdit ? (
          <input
            type="date"
            className="border border-gray-200 rounded-lg w-1/2 px-2 py-1 my-3"
            placeholder={userData.dob}
            onChange={(e) => setUserData({ ...userData, dob: e.target.value })}
            value={userData.dob}
          />
        ) : (
          <h3 className="w-1/2">{userData.dob}</h3>
        )}
      </div>
      <button
        className="px-8 py-2 text-sm font-medium border rounded-full border-blue-600 hover:bg-blue-600 hover:text-white text-black transition-all duration-500 mt-10"
        onClick={handleEdit}
      >
        {isEdit ? "Save information" : "Edit"}
      </button>
    </div>
  );
};

export default MyProfile;
