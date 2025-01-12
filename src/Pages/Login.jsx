import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import PopUp from "../Components/PopUp";

// Utility function for API requests
const fetchData = async (url, options = {}) => {
  const response = await fetch(url, options);
  if (!response.ok) throw new Error("Network error");
  return response.json();
};

const Login = ({ setIsUser }) => {
  const { setUserInfo } = useContext(UserContext);
  const [formState, setFormState] = useState({ email: "", name: "", password: "" });
  const [state, setState] = useState("signup");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("notification");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { email, name, password } = formState;
    if (!email || !password || (state === "signup" && !name)) {
      setMessage("Please fill in all required fields.");
      setIsOpen(true);
      return false;
    }
    if (password.length < 8) {
      setMessage("Password must be at least 8 characters.");
      setIsOpen(true);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    const { email, name, password } = formState;

    try {
      if (state === "signup") {
        const existingUsers = await fetchData(`http://localhost:3001/Users?email=${email}`);
        if (existingUsers.length > 0) {
          setMessage("Email already in use.");
          setIsOpen(true);
        } else {
          const newUser = { email, name, password };
          await fetchData("http://localhost:3001/Users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser),
          });
          setMessage("Account created successfully!");
          setIsUser(true);
          setIsOpen(true);
          setUserInfo(newUser);
          navigate(`/my-profile/${newUser.id}`);
        }
      } else if (state === "login") {
        const users = await fetchData(`http://localhost:3001/Users?email=${email}`);
        if (users.length > 0 && users[0].password === password) {
          setMessage("Login successful!");
          setIsOpen(true);
          setUserInfo(users[0]);
          setIsUser(true);
          navigate(`/my-profile/${users[0].id}`);
        } else {
          setMessage("Invalid email or password.");
          setIsOpen(true);
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setIsOpen(true);
      setMessage("Something went wrong. Please try again.");
    } finally {
 
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <PopUp isOpen={isOpen} setIsOpen={setIsOpen} message={message} setMessage={setMessage} />
      <div className="w-96 border border-gray-200 p-8 m-20 flex items-start flex-col rounded-xl shadow-lg">
        <b className="text-2xl text-gray-600 mb-4">
          {state === "signup" ? "Create Account" : "Login"}
        </b>

        <p className="text-gray-600 text-sm mb-4">
          Please {state === "signup" ? "create an account" : "log in"} to continue.
        </p>

        {state === "signup" && (
          <>
            <p className="text-gray-600 text-sm mb-2">Full Name</p>
            <input
              type="text"
              name="name"
              value={formState.name}
              onChange={handleChange}
              className="border p-2 h-10 mb-4 w-full rounded-md border-gray-300"
              required
            />
          </>
        )}

        <p className="text-gray-600 text-sm mb-2">Email</p>
        <input
          type="email"
          name="email"
          value={formState.email}
          onChange={handleChange}
          className="border h-10 p-2 mb-4 w-full rounded-md border-gray-300"
          required
        />

        <p className="text-gray-600 text-sm mb-2">Password</p>
        <input
          type="password"
          name="password"
          value={formState.password}
          onChange={handleChange}
          className="border p-2 h-10 mb-2 w-full rounded-md border-gray-300"
          required
        />
        {formState.password && (
          <span
            className={`mb-2 text-xs ${
              formState.password.length >= 8 ? "text-green-500" : "text-red-500"
            }`}
          >
            {formState.password.length >= 8
              ? "Password is valid"
              : "Password must be at least 8 characters"}
          </span>
        )}

        <button
          className="bg-blue-500 text-white py-2 rounded-md w-full mb-2"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Processing..." : state === "signup" ? "Create Account" : "Login"}
        </button>

        {state === "signup" ? (
          <p className="text-sm">
            Already have an account?{" "}
            <span
              className="text-blue-500 ml-2 underline cursor-pointer"
              onClick={() => setState("login")}
            >
              Login
            </span>
          </p>
        ) : (
          <p className="text-sm">
            Create a new account?{" "}
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
