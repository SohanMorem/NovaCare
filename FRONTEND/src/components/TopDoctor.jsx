import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
const TopDoctor = () => {

    const navigate=useNavigate();
    const {doctors}=useContext(AppContext)
    

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-bold text-black">Top Doctors List</h1>
      <p className=" text-center text-lg">A top doctor blends skill, empathy, lifelong learning, and ethical care to make a meaningful impact on patients' lives.</p>
      
      {/* Adjust the grid to display 5 doctors per row */}
      <div className="w-full grid grid-cols-auto  gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {
          doctors.slice(0, 10).map((item, index) => (
            <div onClick={()=>navigate(`/appointment/${item._id}`)} key={index} className="border border-blue-200 rounded-xl cursor-pointer overflow-hidden shadow-lg hover:translate-y-[-10px] transition-all duration-500">
              <img src={item.image} alt={item.name} className="bg-blue-50" />
              <div className="p-4">
                <div className="flex items-center gap-2 text-sm text-center text-green-500">
                    <p className='w-2 h-2 bg-green-500 rounded-full '></p>
                  <p className="text-sm text-green-500">Available</p>
                </div>
                <p className="text-lg font-semibold mt-2">{item.name}</p>
                <p className="text-gray-500">{item.speciality}</p>
              </div>
              </div>
          ))
        }
      </div>
      <button onClick={()=>{navigate(`/doctors`); scrollTo(0,0)}} className='bg-blue-800 text-white px-12 py-3 rounded-full mt-10'>More</button>
            
    </div>
  )
}

export default TopDoctor
