import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <>
      {/* About Us Section */}
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-center -m-[3rem] text-3xl font-bold mb-8 text-gray-800">
          ABOUT <span className="text-blue-500">US</span>
        </h2>

        <div className="flex flex-col md:flex-row items-center">
          {/* Image */}
          <div className="w-full md:w-1/2 mb-6 md:mb-0">
            <img
              src={assets.about_image} // Replace with actual image
              alt="About Hospital"
              className="rounded-lg shadow-lg w-96 h-96"
            />
          </div>

          {/* Content */}
          <div className="w-96 md:w-1/2 px-4">
            <p className="text-black leading-relaxed mb-4">
            Welcome to <strong className='text-black'>NovaCare</strong>, your reliable ally in simplifying healthcare management with ease and efficiency. At NovaCare, we recognize the difficulties people encounter while booking doctor appointments and maintaining their health records.
            </p>
            <p className="text-black mb-4">
              Our mission is to provide seamless healthcare experiences with the help of advanced technology and
              superior service.
            </p>
            
            <p className="text-Black">
              Our vision at <strong>NovaCare</strong> is to bridge the gap between patients and healthcare providers,
              making it easier to access the care you need, when you need it.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="container mx-auto px-6 py-8 bg-white rounded-lg shadow-lg">
        <h3 className="text-center text-2xl font-bold text-gray-800 mb-6">
          WHY <span className="text-blue-500">CHOOSE US</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="p-4 border rounded-lg shadow hover:shadow-md">
            <h4 className="text-xl font-semibold text-gray-800 mb-2">EFFICIENCY</h4>
            <p className="text-stone-900 text-sm">
            At NovaCare, we prioritize efficiency to ensure your healthcare needs are met with speed and precision
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-4 border rounded-lg shadow hover:shadow-md">
            <h4 className="text-xl font-semibold text-gray-800 mb-2">CONVENIENCE</h4>
            <p className="text-stone-900 text-sm">
            At NovaCare, we focus on providing convenience, making it easier for you to manage your healthcare with minimal effort
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-4 border rounded-lg shadow hover:shadow-md">
            <h4 className="text-xl font-semibold text-gray-800 mb-2">PERSONALIZATION</h4>
            <p className="text-stone-900 text-sm">
            At NovaCare, we offer personalized healthcare solutions tailored to meet your unique needs and preferences
            </p>
          </div>
        </div>
      </section>
      </>
  )
}

export default About

