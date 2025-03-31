import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className="bg-gray-300 py-6"> {/* Reduced the padding here for reduced height */}
      <div className="max-w-screen-xl mx-auto px-6">
        
        {/* Unified Container with Border and Reduced Height */}
        <div className="flex flex-col md:flex-row items-center justify-between bg-white rounded-lg overflow-hidden shadow-lg max-w-4xl mx-auto">
          
          {/* Left Side - Content Section */}
          <div className="w-full md:w-1/2 text-center md:text-left p-4"> {/* Reduced padding here to decrease height */}
            <p className="text-2xl sm:text-3xl font-bold text-black mb-2"> {/* Reduced text size */}
              Book Appointment <br /> with Trusted Doctors
            </p>
            <p className="text-base sm:text-lg text-gray-600 mb-4"> {/* Reduced text size */}
              Your trusted healthcare partner, connecting patients with the best doctors.
            </p>

            {/* Profile Box */}
            <div className="flex flex-col items-center md:items-start justify-center bg-white shadow-lg rounded-lg p-4 mx-auto md:mx-0 mb-6 max-w-lg">
              <div className="flex items-center justify-center md:justify-start mb-4">
                <img 
                  className="w-36 h-24 sm:w-[10rem] sm:h-20 rounded-full border-4 border-black"  
                  
                  src={assets.group_profiles} 
                  alt="Doctors Group"
                />
              </div>
              <p className="text-sm sm:text-base text-gray-700 mb-3 text-center md:text-left">
                Book your next doctor's appointment in just a few clicks, anytime, anywhere.
              </p>
              {/* Book Appointment Section with Background */}
              <div className="bg-black text-white p-3 rounded-md shadow-md">
                <a 
                  href="#speciality" 
                  className="flex items-center font-semibold text-base sm:text-lg hover:text-gray-300 transition duration-300"
                >
                  Book Appointment
                  <img 
                    className="ml-2 w-5 h-5 sm:w-6 sm:h-6"  
                    src={assets.arrow_icon} 
                    alt="Arrow Icon" 
                  />
                </a>
              </div>
            </div>
          </div>

          {/* Right Side - Header Image */}
          <div className="w-full md:w-1/2">
            <img 
              className="w-full h-auto object-cover" 
              src={assets.header_img} 
              alt="Healthcare"
            />
          </div>

        </div>
      </div>
    </div>
  )
}

export default Header
