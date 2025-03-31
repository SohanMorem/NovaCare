import { Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import ListDoctor from "./Pages/ListDoctor";
import AddDoctor from "./Pages/AddDoctor";
import Login from "./Pages/Login";
import Navbar from "./Components/Navbar";
import { useContext } from "react";
import { AdminContext } from "./context/AdminContextProvider";
import Slidebar from "./Components/Slidebar";
import ListAppointment from "./Pages/ListAppointment";
import { DoctorContext } from "./context/DoctorContextProvider";
import DoctorAppointment from "./Pages/DoctorAppointment";
import DoctorDashboard from "./Pages/DoctorDashboard";
import Profile from "./Pages/Profile";

function App() {
  const { atoken } = useContext(AdminContext);
  const { dtoken } = useContext(DoctorContext);

  if (atoken) {
    return (
      <div>
        <Navbar />
        <div className="flex items-start">
          <Slidebar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/adminDashboard" element={<Dashboard />} />
            <Route path="/allAppointments" element={<ListAppointment />} />
            <Route path="/addDoctor" element={<AddDoctor />} />
            <Route path="/ListDoctor" element={<ListDoctor />} />
          </Routes>
        </div>
      </div>
    );
  }

  if (dtoken) {
    return (
      <div>
        <Navbar />
        <div className="flex items-start">
          <Slidebar />
          <Routes>
            <Route path="/" element={<DoctorDashboard />} />
            <Route path="/doctorDashboard" element={<DoctorDashboard />} />
            <Route path="/Appointments" element={<DoctorAppointment />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    );
  }

  return <Login />;
}

export default App;
