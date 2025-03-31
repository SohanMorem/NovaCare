// import React, { useContext, useEffect } from 'react';
// import { AdminContext } from '../context/AdminContextProvider';

// const ListDoctor = () => {
//   const { doctors, atoken, getAllDoctors,changeAvailable } = useContext(AdminContext);

//   useEffect(() => {
//     if (atoken) {
//       getAllDoctors();
//     }
//   }, [atoken]);

//   return (
//     <div className="m-5 max-h-[90vh] overflow-y-scroll">
//       <h1 className="text-2xl font-semibold mb-4">All Doctors</h1>
//       <div className="w-full flex flex-wrap gap-10 pt-5 gap-y-6">
//         {doctors.map((item, index) => (
//           <div 
//             key={index}
//             className="border border-indigo-200 rounded-xl max-w-56 overflow-hidden"
//           >
//             <img
//               src={item.image}
//               alt={item.name}
//               className="bg-indigo-50 hover:bg-blue-600 transition-all duration-500 cursor-pointer"
//             />
//             <div className="p-4">
//               <p className="text-lg font-medium">{item.name}</p>
//               <p className="text-gray-500 text-sm">{item.speciality}</p>
//               <div className="flex items-center mt-2 gap-1 text-sm">
//                 <input
//                   type="checkbox"
//                   onChange={()=>changeAvailable(item._id)}
//                   checked={item.available}
                  
//                 />
//                 <p className="ml-2 text-gray-700">Available</p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ListDoctor;



import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../context/AdminContextProvider';

const ListDoctor = () => {
  const { doctors, atoken, getAllDoctors, changeAvailable, removeDoctor } = useContext(AdminContext);

  useEffect(() => {
    if (atoken) {
      getAllDoctors();
    }
  }, [atoken]);

  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-2xl font-semibold mb-4">All Doctors</h1>
      <div className="w-full flex flex-wrap gap-10 pt-5 gap-y-6">
        {doctors.map((item, index) => (
          <div
            key={index}
            className="group border border-indigo-200 rounded-xl max-w-56 overflow-hidden"
          >
            <img
              src={item.image}
              alt={item.name}
              className="bg-indigo-50 group-hover:bg-blue-600 transition-all duration-500 cursor-pointer"
            />
            <div className="p-4">
              <p className="text-lg font-medium">{item.name}</p>
              <p className="text-gray-500 text-sm">{item.speciality}</p>
              <div className="flex items-center mt-2 gap-1 text-sm">
                <input
                  type="checkbox"
                  onChange={() => changeAvailable(item._id)}
                  checked={item.available}
                />
                <p className="ml-2 text-gray-700">Available</p>
                <button
                  onClick={() => removeDoctor(item._id)}
                  className="ml-4 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListDoctor;
