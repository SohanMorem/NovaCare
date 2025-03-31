import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const Doctors = () => {

  const {speciality}=useParams();
  const {doctors}=useContext(AppContext)
  const [filterDoc,setFilterDoc]=useState([])
  const navigate=useNavigate();

  const applyFilter=()=>{
      if(speciality){
        setFilterDoc(doctors.filter(doc=>doc.speciality===speciality))
      }else{
           setFilterDoc(doctors)
      }
  }

  useEffect(()=>{
    applyFilter()
  },[speciality,doctors])

  return (
    <div>
      <p className='text-black font-medium'>Explore our specialists and choose the right doctor for your needs with selection buttons</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'  >
        <div className='flex flex-col gap-4 text-sm text-gray-600'>
          <p onClick={()=> speciality === 'General physician' ? navigate('/doctors') : navigate('/doctors/General physician')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 text-black rounded transition-all cursor-pointer ${speciality === "General physician" ? "bg-yellow-200" : ""}`}>General physician</p>

          <p onClick={()=> speciality=== 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all text-black cursor-pointer ${speciality === "Gynecologist" ? "bg-yellow-200" : ""}`}>Gynecologist</p>

          <p onClick={()=> speciality=== 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all text-black cursor-pointer ${speciality === "Dermatologist" ? "bg-yellow-200" : ""}`}>Dermatologist</p>

          <p onClick={()=> speciality=== 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all text-black cursor-pointer
            ${speciality === "Pediatricians" ? "bg-yellow-200" : ""}`}>Pediatricians</p>

          <p onClick={()=> speciality=== 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border text-black border-gray-300 rounded transition-all cursor-pointer ${speciality === "Neurologist" ? "bg-yellow-200" : ""}`}>Neurologist</p>

          <p onClick={()=> speciality=== 'Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 text-black   rounded transition-all cursor-pointer ${speciality === "Gastroenterologist" ? "bg-yellow-200" : ""}`}>Gastroenterologist</p>

        </div>
        <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
          {
            filterDoc.map((item, index) => (
              <div onClick={()=>navigate(`/appointment/${item._id}`)} key={index} className="border border-blue-200 rounded-xl cursor-pointer overflow-hidden shadow-lg hover:translate-y-[-10px] transition-all duration-500">
                <img src={item.image} alt={item.name} className="bg-blue-50" />
                <div className="p-4">
                <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : 'text-red-500'}`}>

                    <p className={` ${item.available ? 'w-2 h-2 bg-green-500 rounded-full' : 'w-2 h-2 bg-red-500 rounded-full'}`}></p>
                    <p className={`${item.available ? 'text-green-500' : 'text-red-500'}`}>{item.available?"Available":"UnAvailable"}</p>
                  </div>
                  <p className="text-lg font-semibold mt-2">{item.name}</p>
                  <p className="text-gray-500">{item.speciality}</p>
                </div>
                </div>
                
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Doctors
