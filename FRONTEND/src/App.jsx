import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import MyAppointment from './pages/MyAppointment'
import MyProfile from './pages/MyProfile'
import Appointments from './pages/Appointments'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ForgotPassword from './pages/ForgotPassword'
import EnterOtp from './pages/EnterOtp'
import ResetPassword from './pages/ResetPassword'
import Success from './components/Success'
import Cancel from './components/Cancel'


function App() {

  return(
    <>
    
    <div className='mx-4 sm:mx-[10%]'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/success' element={<Success />} />
        <Route path='/cancel' element={<Cancel />} />
        <Route path='/doctors/:speciality' element={<Doctors/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/myappointment' element={<MyAppointment/>} />
        <Route path='/myprofile' element={<MyProfile/>} />
        <Route path='/appointment/:docId' element={<Appointments/>} />
        <Route path='/forgotPassword' element={<ForgotPassword/>} />
        <Route path='/enterotp' element={<EnterOtp/>} />
        <Route path='/resetpassword' element={<ResetPassword/>} />
      </Routes>
    <Footer/>
    </div>
    </>
  )

}

export default App
