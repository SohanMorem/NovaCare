import React, { useContext, useState } from 'react';
import { DoctorContext } from '../context/DoctorContextProvider';
import { assets } from '../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const Profile = () => {
    const [isEdit, setIsedit] = useState(false);
    const [image, setImage] = useState(false);

    const { dtoken, backendurl, doctorData, setDoctorData, getDoctorDetail } = useContext(DoctorContext);
    const {  changeAvailable} = useContext(DoctorContext);
    const updateDoctorDetail = async () => {
        try {
            console.log("clicked");
            const formData = new FormData();

            formData.append("name", doctorData.name);
            formData.append("speciality", doctorData.speciality);
            formData.append("experience", doctorData.experience);
            formData.append("fees", doctorData.fees);
            formData.append("degree", doctorData.degree);
            formData.append("about", doctorData.about);
            formData.append("address", JSON.stringify(doctorData.address));

            if (image) formData.append("image", image);

            const { data } = await axios.post(backendurl + "/api/doctor/updatedoctorprofile", formData, { headers: { dtoken } });

            if (data.success) {
                console.log("hello")
                toast.success(data.message);
                await getDoctorDetail();
                setImage(false);
                setIsedit(false);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    useEffect(()=>{
        getDoctorDetail()
        
},[dtoken])

    return doctorData && (
        <div className='max-w-lg flex flex-col gap-4 text-sm'>

            {/* Profile Image Section */}
            <div className="relative w-36 h-36 mx-auto">
                <label htmlFor="image">
                    <div className="relative cursor-pointer">
                        <img className='w-36 h-36 rounded-full object-cover' src={image ? URL.createObjectURL(image) : doctorData.image} alt="" />
                        {isEdit && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                                <img className='w-10 h-10' src={assets.upload_icon} alt="Upload" />
                            </div>
                        )}
                    </div>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" name="image" id="image" hidden />
                </label>
            </div>

            {/* Availability Toggle */}
            <div className="flex items-center gap-3">
                <p className="text-gray-700 font-medium">Available:</p>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        checked={doctorData.available}
                        onChange={() => {
                            changeAvailable(doctorData._id);
                            setDoctorData(prev => ({ ...prev, available: !prev.available }));  // <-- Fix: Updates UI instantly
                        }}
                        className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
            </div>

            {/* Name */}
            <div className="text-center">
                {isEdit ? (
                    <input className='bg-gray-200 text-2xl font-medium text-center p-1 rounded' type="text" value={doctorData.name} onChange={e => setDoctorData(prev => ({ ...prev, name: e.target.value }))} />
                ) : (
                    <p className='font-medium text-3xl text-black'>{doctorData.name}</p>
                )}
            </div>

            <hr className='bg-gray-400 h-[1px] border-none' />

            {/* Contact Information */}
            <div>
                <p className='text-black underline mt-3'>Contact Information</p>
                <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
                    <p className='font-medium'>Email:</p>
                    <p className='text-blue-500'>{doctorData.email}</p>

                    <p className='font-medium'>Address:</p>
                    {isEdit ? (
                        <p>
                            <input type="text" className='bg-gray-100 max-w-52' value={doctorData.address.line1} onChange={(e) => setDoctorData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} />
                            <br />
                            <input type="text" className='bg-gray-100 max-w-52' value={doctorData.address.line2} onChange={(e) => setDoctorData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} />
                        </p>
                    ) : (
                        <p className='text-black'>{doctorData.address.line1}<br />{doctorData.address.line2}</p>
                    )}
                </div>
            </div>

            {/* Professional Information */}
            <div>
                <p className='text-black underline mt-3'>Professional Information</p>
                <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
                    <p className='font-medium'>Speciality:</p>
                    {isEdit ? (
                        <select className='bg-gray-100 max-w-52' value={doctorData.speciality} onChange={(e) => setDoctorData(prev => ({ ...prev, speciality: e.target.value }))}>
                            <option value="General Physician">General Physician</option>
                            <option value="Gynecologist">Gynecologist</option>
                            <option value="Dermatologist">Dermatologist</option>
                            <option value="Pediatrician">Pediatrician</option>
                            <option value="Neurologist">Neurologist</option>
                            <option value="Gastroenterologist">Gastroenterologist</option>
                        </select>
                    ) : (
                        <p className='text-black'>{doctorData.speciality}</p>
                    )}

                    <p className='font-medium'>Experience (years):</p>
                    {isEdit ? (
                        <input className='bg-gray-100 max-w-20' type="number" value={doctorData.experience} onChange={(e) => setDoctorData(prev => ({ ...prev, experience: e.target.value }))} />
                    ) : (
                        <p className='text-black'>{doctorData.experience}</p>
                    )}

                    <p className='font-medium'>Consultation Fees:</p>
                    {isEdit ? (
                        <input className='bg-gray-100 max-w-28' type="number" value={doctorData.fees} onChange={(e) => setDoctorData(prev => ({ ...prev, fees: e.target.value }))} />
                    ) : (
                        <p className='text-black'>₹{doctorData.fees}</p>
                    )}

                    <p className='font-medium'>Degree:</p>
                    {isEdit ? (
                        <input className='bg-gray-100 max-w-52' type="text" value={doctorData.degree} onChange={(e) => setDoctorData(prev => ({ ...prev, degree: e.target.value }))} />
                    ) : (
                        <p className='text-black'>{doctorData.degree}</p>
                    )}
                </div>
            </div>

            {/* About Section */}
            <div>
                <p className='text-black underline mt-3'>About</p>
                {isEdit ? (
                    <textarea className='bg-gray-100 w-full p-2 rounded' value={doctorData.about} onChange={(e) => setDoctorData(prev => ({ ...prev, about: e.target.value }))}></textarea>
                ) : (
                    <p className='text-black'>{doctorData.about || "No information available"}</p>
                )}
            </div>

            {/* Buttons */}
            <div className="text-center">
                {isEdit ? (
                    <button className='border border-blue-600 px-8 py-2 rounded-full hover:bg-blue-600 hover:text-white transition-all mb-10' onClick={updateDoctorDetail}>
                        Save Information
                    </button>
                ) : (
                    <button className='border border-blue-600 px-8 py-2 rounded-full hover:bg-blue-700 hover:text-white transition-all mb-10' onClick={() => setIsedit(true)}>
                        Edit
                    </button>
                )}
            </div>
        </div>
    );
};

export default Profile;
