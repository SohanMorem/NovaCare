// import { useState } from "react";

// import { useContext } from "react";
// import { AdminContext } from "../context/AdminContextProvider";
// import { useNavigate } from "react-router-dom";
// import { assets } from "../assets/assets.js";
// import { DoctorContext } from "../context/DoctorContextProvider.jsx";

//  function Navbar() {
//   const {atoken,setAtoken} =useContext(AdminContext)
//   const {dtoken,setDtoken}= useContext(DoctorContext)
//   const navigate=useNavigate()

//   const logout=()=>{
//     navigate("/")
//     atoken && setAtoken("")
//     atoken && localStorage.removeItem('atoken')
//     dtoken && setDtoken("")
//     dtoken && localStorage.removeItem('dtoken')
//   }

//   return (
//       <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-gray-100">
//         <div className="flex items-center gap-4 text-xs">
//           {/* Logo */}
//           <img
//             src={assets.HospitalLogo}
//             alt="Logo"
//             className="sm:w-16 w-16 cursor-pointer "
//           />
          
//           {/* Name */}
  
//           <span className="text-black font-bold text-3xl">NovaCare</span>

//           {/* Role Selection */}
//           <p className="border px-2.5 py-0.5 mb-4 rounded-full border-gray-500 text-black">{atoken?"Admin":"Doctor"}</p>
//         </div>

//         {/* Logout Button */}
//         <button className="bg-blue-600 text-white hover:bg-blue-700 px-10 py-2 rounded-full" onClick={logout}>
//           Logout
//         </button>
//       </div>
//   );
// }

// export default Navbar

import { useContext } from "react";
import { AdminContext } from "../context/AdminContextProvider";
import { DoctorContext } from "../context/DoctorContextProvider.jsx";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets.js";

function Navbar() {
  const { atoken, setAtoken } = useContext(AdminContext);
  const { dtoken, setDtoken } = useContext(DoctorContext);
  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
    if (atoken) {
      setAtoken("");
      localStorage.removeItem("atoken");
    }
    if (dtoken) {
      setDtoken("");
      localStorage.removeItem("dtoken");
    }
  };

  return (
    <div className="flex flex-wrap justify-between items-center px-4 sm:px-10 py-3 border-b bg-gray-100">
      {/* Left Section: Logo & Name */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Logo */}
        <img
          src={assets.HospitalLogo}
          alt="Logo"
          className="w-12 sm:w-16 cursor-pointer"
        />

        {/* Name */}
        <span className="text-black font-bold text-2xl sm:text-3xl">
          NovaCare
        </span>

        {/* Role Indicator */}
        <p className="border px-3 py-1 rounded-full border-gray-500 text-black text-sm sm:text-base">
          {atoken ? "Admin" : "Doctor"}
        </p>
      </div>

      {/* Logout Button */}
      <button
        className="bg-blue-600 text-white hover:bg-blue-700 px-6 sm:px-10 py-2 rounded-full text-sm sm:text-base"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;
