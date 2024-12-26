import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [state, setState] = useState("login");
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [paasword, setPassword] = useState();
  const handleSubmit = async (event) => {
    event.preventDefault();
  };
  return (
    <div className="flex items-center justify-center">
      <div className="w-96 border border-gray-200 p-8 m-20 flex items-start flex-col rounded-xl shadow-lg">
        <b className="text-2xl text-gray-600 mb-4">
          {state === "signup" ? "Create Account" : "Login"}
        </b>

        <p className="text-gray-600 text-sm mb-4">
          Please {state === "signup" ? "create account" : "log in"} to book
          appointment
        </p>

        {state === "signup" && (
          <>
            <p className="text-gray-600 text-sm mb-2">Full Name</p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border h-10 mb-4 w-full rounded-md border-gray-300"
            />
          </>
        )}

        <p className="text-gray-600 text-sm mb-2">Email</p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border h-10 mb-4 w-full rounded-md border-gray-300"
        />

        <p className="text-gray-600 text-sm mb-2">Password</p>
        <input
          value={paasword}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="border h-10 mb-4 w-full rounded-md border-gray-300"
        />

        <button className="bg-blue-500 text-white py-2 rounded-md w-full mb-2">
          {state === "signup" ? "Create Account" : "Login"}
        </button>

        {state === "signup" ? (
          <p className="text-sm">
            Already have an account?
            <span
              className="text-blue-500 ml-2 underline cursor-pointer"
              onClick={() => setState("login")}
            >
              {" "}
              Login
            </span>{" "}
          </p>
        ) : (
          <p className="text-sm">
            Create an new account?
            <span
              className="text-blue-500 ml-2 underline cursor-pointer"
              onClick={() => setState("signup")}
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
