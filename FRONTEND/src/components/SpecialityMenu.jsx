import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
    <div id='speciality' className="py-12 bg-blue-50">
      <div className="max-w-screen-xl mx-auto px-6">
        {/* Title Section */}
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-black mb-4">
          Speciality Available Here.
        </h1>
        <p className="text-lg sm:text-xl text-center text-gray-600 mb-8">
          Find and connect with experienced, board-certified doctors who specialize in a variety of fields.
        </p>

        {/* Specialities Horizontal Scroll Section */}
        <div className="flex overflow-x-auto space-x-6 py-4">
          {
            specialityData.map((item, index) => (
              <Link 
                onClick={()=>scrollTo(0,0)}
                key={index} 
                to={`/doctors/${item.speciality}`} 
                className="flex flex-col items-center bg-gray-200 shadow-lg rounded-lg p-4 transition duration-300 transform hover:scale-105 hover:shadow-xl w-32 sm:w-36 md:w-40"
              >
                <img 
                  src={item.image} 
                  alt={item.speciality} 
                  className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-20 lg:h-20 object-cover mb-2 rounded-full"
                />
                <p className="text-sm sm:text-md font-semibold text-center text-blue-600">{item.speciality}</p>
              </Link>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default SpecialityMenu
