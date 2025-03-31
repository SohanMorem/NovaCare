
// import React, { useContext, useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { assets } from "../assets/assets";
// import { AppContext } from "../context/AppContext";

// const Navbar = () => {
//   const [showMenu, setShowMenu] = useState(false);
//   const {token,setToken}=useContext(AppContext)
//   const navigate = useNavigate();

//   const logout=()=>{
//     setToken(false)
//     localStorage.removeItem("token")
//   }

//   return (
//     <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-gray-300 text-black font-bold px-4 md:px-10 lg:px-20 w-full max-w-screen-xl mx-auto">
//       {/* Logo and Title */}
//       <div className="flex items-center">
//         <img
//           onClick={() => navigate(`/`)}
//           className="w-12 h-8 sm:w-16 sm:h-10 md:w-20 md:h-16 cursor-pointer"
//           src={assets.novacare_logo}
//           alt=""
//         />
//         <h1
//           onClick={() => navigate(`/`)}
//           className="cursor-pointer text-xl sm:text-2xl md:text-3xl font-bold ml-3 text-purple-900 italic font-sans"
//         >
//           NovaCare
//         </h1>
//       </div>

//       {/* Desktop Menu */}
//       <ul className="hidden md:flex items-center gap-4 md:gap-6 lg:gap-8 font-medium">
//         <NavLink to="/" className="hover:text-primary transition-colors duration-300">
//           <li className="py-1">Home</li>
//           <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
//         </NavLink>
//         <NavLink to="/doctors" className="hover:text-primary transition-colors duration-300">
//           <li className="py-1">All Doctors</li>
//           <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
//         </NavLink>
//         <NavLink to="/about" className="hover:text-primary transition-colors duration-300">
//           <li className="py-1">About</li>
//           <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
//         </NavLink>
//         <NavLink to="/contact" className="hover:text-primary transition-colors duration-300">
//           <li className="py-1">Contact</li>
//           <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
//         </NavLink>
//       </ul>

//       {/* Mobile Menu Button */}
//       <button
//         className="block md:hidden focus:outline-none"
//         onClick={() => setShowMenu(!showMenu)}
//       >
//         <img src={assets.menu_icon} alt="Menu" className="w-6 h-6" />
//       </button>

      

//       {/* Mobile Menu */}
//       {showMenu && (
//         <ul className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center gap-4 py-4 md:hidden z-10 transition-transform duration-300">
//           <NavLink
//             to="/"
//             className="hover:text-primary transition-colors duration-300"
//             onClick={() => setShowMenu(false)}
//           >
//             <li>Home</li>
//           </NavLink>
//           <NavLink
//             to="/doctors"
//             className="hover:text-primary transition-colors duration-300"
//             onClick={() => setShowMenu(false)}
//           >
//             <li>All Doctors</li>
//           </NavLink>
//           <NavLink
//             to="/about"
//             className="hover:text-primary transition-colors duration-300"
//             onClick={() => setShowMenu(false)}
//           >
//             <li>About</li>
//           </NavLink>
//           <NavLink
//             to="/contact"
//             className="hover:text-primary transition-colors duration-300"
//             onClick={() => setShowMenu(false)}
//           >
//             <li>Contact</li>
//           </NavLink>
//             </ul>
//           )}

//           {/* Dropdown/Profile Section */}
//       <div className='flex items-center gap-2 sm:gap-4'>
//               {
//                     token 
//                     ?
//                         <div className='flex items-center gap-2 cursor-pointer group relative z-10'>
//                             <img className='w-8 rounded-full border border-gray-300' src={assets.profile_pic} alt="" />
//                             <img className='w-2.5 ' src={assets.dropdown_icon} alt="" />
//                             <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 hidden group-hover:block transition-opacity duration-300'>
//                                 <div className='min-w-40 bg-stone-100 rounded flex flex-col gap-2 p-3 shadow-lg'>
//                                     <p onClick={()=>navigate('/myprofile')} className='hover:text-black cursor-pointer'>My Profile</p>
//                                     <p onClick={()=>navigate('/myappointment')} className='hover:text-black cursor-pointer'>My Appointmnet</p>
//                                     <p onClick={()=>{logout(); navigate("/")}} className='hover:text-black cursor-pointer'>Logout</p>
//                                 </div>
//                             </div>
//                         </div>
//                     :
//                     <button onClick={()=>{navigate('/login')}} className='bg-black hover:bg-primary text-white rounded-full font-bold px-4 py-2 sm:px-6 sm:py-2 md:px-6 md:py-3 text-sm sm:text-base md:text-lg transition-all duration-300'>Create Account</button>
//                 }

//             </div>
      
//     </div>
//   );
// };

// export default Navbar;


import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import "../styles/Navbar.css";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { token, setToken } = useContext(AppContext);
  const [page,setPage]=useState("Home")
  const navigate = useNavigate();

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
  };

  return (
    <div className="navbar">
      {/* Logo and Title */}
      <div className="logo-container" onClick={() => navigate(`/`)}>
        <img className="logo" src={assets.novacare_logo} alt="" />
        <h1 className="title">NovaCare</h1>
      </div>

      {/* Desktop Menu */}
      <ul className="menu">
        <NavLink to="/" className="menu-item">
        <li onClick={()=>setPage("Home")}>Home</li>
        <hr className={`border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden ${page === "Home" ? "!block" : ""}`}/>
        </NavLink>
        <NavLink to="/doctors" className="menu-item">
        <li onClick={()=>setPage("Doctors")}>All Doctors</li>
        <hr className={`border-none hover:hidden outline-none h-0.5 bg-primary w-3/5 m-auto hidden ${page === "Doctors" ? "!block" : ""}`}/>
        </NavLink>
        <NavLink to="/about" className="menu-item">
        <li onClick={()=>setPage("About")}>About</li>
        <hr className={`border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden ${page === "About" ? "!block" : ""}`}/>
        </NavLink>
        <NavLink to="/contact" className="menu-item">
        <li onClick={()=>setPage("Contact")}>Contact</li>
        <hr className={`border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden ${page === "Contact" ? "!block" : ""}`}/>
        </NavLink>
      </ul>

      {/* Mobile Menu Button */}
      <button className="menu-button" onClick={() => setShowMenu(!showMenu)}>
        <img src={assets.menu_icon} alt="Menu" className="menu-icon" />
      </button>

      {/* Mobile Menu */}
      {showMenu && (
        <ul className="mobile-menu">
          <NavLink to="/" className="menu-item" onClick={() => setShowMenu(false)}><li>Home</li></NavLink>
          <NavLink to="/doctors" className="menu-item" onClick={() => setShowMenu(false)}><li>All Doctors</li></NavLink>
          <NavLink to="/about" className="menu-item" onClick={() => setShowMenu(false)}><li>About</li></NavLink>
          <NavLink to="/contact" className="menu-item" onClick={() => setShowMenu(false)}><li>Contact</li></NavLink>
        </ul>
      )}

      {/* Profile Section */}
      <div className="profile-section">
        {token ? (
          <div className='flex items-center gap-2 cursor-pointer group relative z-10'>
          <img className='w-8 rounded-full border border-gray-300' src={assets.profile_pic} alt="" />
          <img className='w-2.5 ' src={assets.dropdown_icon} alt="" />
            <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 hidden group-hover:block transition-opacity duration-300'>
            <div className='min-w-40 bg-stone-100 rounded flex flex-col gap-2 p-3 shadow-lg'>
              <p onClick={() => navigate('/myprofile')} className="dropdown-item">My Profile</p>
              <p onClick={() => navigate('/myappointment')} className="dropdown-item">My Appointment</p>
              <p onClick={() => { logout(); navigate("/") }} className="dropdown-item">Logout</p>
              </div>
            </div>
          </div>
        ) : (
          <button onClick={() => navigate('/login')} className="login-button">Create Account</button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
