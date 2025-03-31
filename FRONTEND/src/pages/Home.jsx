import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctor from '../components/TopDoctor'
import SlideImage from '../components/SlideImage'

const Home = () => {
  return (
    <>
    <div className="bg-gray-100">
      <SlideImage></SlideImage>
    <Header/>
    <SpecialityMenu/>
    <TopDoctor/>
    </div>   
   </>
  )
}

export default Home
