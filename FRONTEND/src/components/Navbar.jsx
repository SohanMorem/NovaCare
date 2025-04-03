
import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import "../styles/Navbar.css";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { token, setToken } = useContext(AppContext);
  const [page, setPage] = useState("Home")
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
          <li onClick={() => setPage("Home")}>Home</li>
          <hr className={`border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden ${page === "Home" ? "!block" : ""}`} />
        </NavLink>
        <NavLink to="/doctors" className="menu-item">
          <li onClick={() => setPage("Doctors")}>All Doctors</li>
          <hr className={`border-none hover:hidden outline-none h-0.5 bg-primary w-3/5 m-auto hidden ${page === "Doctors" ? "!block" : ""}`} />
        </NavLink>
        <NavLink to="/about" className="menu-item">
          <li onClick={() => setPage("About")}>About</li>
          <hr className={`border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden ${page === "About" ? "!block" : ""}`} />
        </NavLink>
        <NavLink to="/contact" className="menu-item">
          <li onClick={() => setPage("Contact")}>Contact</li>
          <hr className={`border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden ${page === "Contact" ? "!block" : ""}`} />
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
          <button onClick={() => navigate('/login')} className="login-button">Login</button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
