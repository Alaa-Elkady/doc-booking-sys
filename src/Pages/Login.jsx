import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import PopUp from "../Components/PopUp";
const Login = ({  setIsUser }) => {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const [state, setState] = useState("login");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("notification");

  useEffect(() => {
    if (email) {
      fetch(`http://localhost:3001/Users?email=${email}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 0) {
            setIsUser(true);
          }
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, [email, setIsUser]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (email === "" || name === "" || password === "") {
      setIsOpen(true);
      setMessage("Please fill in all fields");
    } else {
      const newUser = { email, name, password };
      if (state === "signup") {
        try {
          const response = await fetch("http://localhost:3001/Users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser),
          });
          if (response.ok) {
            setIsOpen(true);
            setMessage("Account created successfully!");
            setUserInfo(newUser);
            navigate(`/my-profile/${newUser.id}`);
          } else {
            setIsOpen(true);
            setMessage("Error creating account.");
          }
        } catch (error) {
          console.error("Error during signup:", error);
        }
      } else if (state === "login") {
        try {
          const response = await fetch(
            `http://localhost:3001/Users?email=${email}`
          );
          const data = await response.json();
          if (data.length > 0 && data[0].password === password) {
            setIsOpen(true);
            setMessage("Login successful!");
            setUserInfo(data[0]);
            console.log(userInfo);

            navigate(`/my-profile/${data[0].id}`);
          } else {
            setIsOpen(true);
            setMessage("Invalid email or password.");
          }
        } catch (error) {
          console.error("Error during login:", error);
        }
        setIsUser(true);
      }
    }
    setLoading(false);
  }; 

  return (
    <div className="flex items-center justify-center">
      <PopUp isOpen={isOpen} setIsOpen={setIsOpen} message={message} setMessage={setMessage} />
      <div className="w-96 border border-gray-200 p-8 m-20 flex items-start flex-col rounded-xl shadow-lg">
        <b className="text-2xl text-gray-600 mb-4">
          {state === "signup" ? "Create Account" : "Login"}
        </b>

        <p className="text-gray-600 text-sm mb-4">
          Please {state === "signup" ? "create an account" : "log in"} to
          continue.
        </p>

        {state === "signup" && (
          <>
            <p className="text-gray-600 text-sm mb-2">Full Name</p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 h-10 mb-4 w-full rounded-md border-gray-300"
              required
            />
          </>
        )}

        <p className="text-gray-600 text-sm mb-2">Email</p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border h-10 p-2 mb-4 w-full rounded-md border-gray-300"
          required
        />

        <p className="text-gray-600 text-sm mb-2">Password</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 h-10 mb-2 w-full rounded-md border-gray-300"
          required
        />
        {password.length < 8 ? (
          <span className="text-red-500 mb-2 text-xs">
            The password must be at least 8 characters
          </span>
        ) : (
          <span className="text-green-500 mb-2 text-xs">
            The password is allowed
          </span>
        )}
        <button
          className="bg-blue-500 text-white py-2 rounded-md w-full mb-2"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading
            ? "Processing..."
            : state === "signup"
            ? "Create Account"
            : "Login"}
        </button>

        {state === "signup" ? (
          <p className="text-sm">
            Already have an account?
            <span
              className="text-blue-500 ml-2 underline cursor-pointer"
              onClick={() => setState("login")}
            >
              Login
            </span>
          </p>
        ) : (
          <p className="text-sm">
            Create a new account?
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
