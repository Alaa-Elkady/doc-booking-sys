import React, { useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";

const NavBar = ({ isUser }) => {
  const nav = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(true);
  return (
    <div className="flex justify-between items-center text-sm py-4 border-b border-b-gray-400 w-full">
      <img className="w-44 cursor-pointer" src={assets.logo} alt="logo" />
      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink to="/">
          <li className="py-1">Home</li>
          <hr className="border-none outline-none h-0.5 bg-blue-600 w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/doctors">
          <li className="py-1">All Doctors</li>
          <hr className="border-none outline-none h-0.5 bg-blue-600 w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/about">
          <li className="py-1">About</li>
          <hr className="border-none outline-none h-0.5 bg-blue-600 w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/contact">
          <li className="py-1">Contact</li>
          <hr className="border-none outline-none h-0.5 bg-blue-600 w-3/5 m-auto hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-4 ">
        {isUser === true && (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img src={assets.profile_pic} className="w-8 rounded-full" />
            <img src={assets.dropdown_icon} className="w-2.5" />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                <p
                  onClick={() => nav("/my-profile")}
                  className="hover:text-black cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => nav("/my-appointments")}
                  className="hover:text-black cursor-pointer"
                >
                  My Appointments
                </p>
                <p
                  onClick={() => setToken(false)}
                  className="hover:text-black cursor-pointer"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        )}
        {isUser === false && (
          <button
            className="bg-blue-600 text-white px-8 py-3 rounded-full font-light hidden md:block"
            onClick={() => nav("/login")}
          >
            Create Account
          </button>
        )}
        <img
          src={assets.menu_icon}
          className="md:hidden w-6 cursor-pointer"
          onClick={() => setShowMenu(true)}
        />
        <div
          className={`md:hidden absolute z-20 top-0 left-0 w-full h-full overflow-hidden bg-white flex flex-col items-start gap-10 duration-500 ease-in-out transition-all ${
            showMenu ? "translate-x-0 fixed" : "-translate-x-full"
          }`}
        >
          <div className="flex items-start justify-between w-full px-10 mt-10">
            <img src={assets.logo} alt="" className="w-44" />
            <img
              className="w-6 cursor-pointer"
              src={assets.cross_icon}
              onClick={() => setShowMenu(false)}
              alt=""
            />
          </div>
          <ul className="flex flex-col items-start gap-5 text-xl font-medium mx-10">
            <NavLink to={"/"}>Home</NavLink>
            <NavLink to={"/doctors"}>All Doctors</NavLink>
            <NavLink to={"/about"}> About</NavLink>
            <NavLink to={"/contact"}> Contact</NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
