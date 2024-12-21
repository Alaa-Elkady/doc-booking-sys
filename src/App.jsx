import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Login from "./Pages/Login";
import Doctors from "./Pages/Doctors";
import MyProfile from "./Pages/MyProfile";
import MyAppointments from "./Pages/MyAppointments";
import Appointments from "./Pages/Appointments";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
function App() {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/my-appointments" element={<MyAppointments />} />
        <Route path="/appointments/:docId" element={<Appointments />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
