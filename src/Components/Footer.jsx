import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="flex  flex-col items-center mx-4">
      <div className="flex flex-col md:flex-row gap-10 py-10 w-full border-b border-b-gray-200">
        <div className="md:w-2/4">
          <img src={assets.logo} className="w-44" />
          <p className="mt-6 text-sm  font-light w-3/4">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>
        <div className="md:w-1/4 ">
          <div className="font-semibold text-2xl my-3">COMPANY</div>
          <ul className="font-light text-md">
            <li>Home</li>
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="md:w-1/4">
          <div  className="font-semibold text-2xl my-3">Get In Touch</div>
          <ul className="font-light text-md">
            <li>+1-212-456-7890</li>
            <li>greatstackdev@gmail.com</li>
          </ul>
        </div>
      </div>
      <div className="py-5 text-md">Copyright © 2024 GreatStack - All Right Reserved</div>
    </div>
  );
};

export default Footer;
