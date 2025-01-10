import React from "react";
import { assets } from "./../assets/assets";

const PopUp = ({ setIsOpen, message, isOpen }) => {
  return (
    <>
      {isOpen && (
        <div className={`w-80 bg-white text-slate-700 shadow-lg rounded m-5 py-5 p-3 top-0 right-0 fixed  capitalize  items-center flex border-b-red-500 border-2 `}>
          <img
            src={assets.cross_icon}
            className="w-5 cursor-pointer top-0 right-0 m-7 fixed"
            onClick={() => setIsOpen(false)}
          />
          <p className="flex gap-2 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-exclamation-circle-fill text-red-500 "
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4m.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2" />
            </svg>
            {message}
          </p>
        </div>
      )}
    </>
  );
};

export default PopUp;
