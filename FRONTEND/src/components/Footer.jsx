// Footer.js
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8 mt-[4rem]">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {/* About Section */}
        <div>
          <h3 className="text-xl font-bold mb-3">About Us</h3>
          <p className="text-sm text-gray-300 leading-relaxed">
            Our <strong className="font-bold">NovaCare</strong> is designed to streamline patient care, improve operational efficiency, and ensure seamless medical record handling.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="/" className="text-gray-300 hover:text-white transition-colors duration-200">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="text-gray-300 hover:text-white transition-colors duration-200">
                About
              </a>
            </li>
            <li>
              <a href="/contact" className="text-gray-300 hover:text-white transition-colors duration-200">
                Contact
              </a>
            </li>
            <li>
              <a href="/privacypolicy" className="text-gray-300 hover:text-white transition-colors duration-200">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-bold mb-3">Contact Us</h3>
          <address className="not-italic text-sm text-gray-300 leading-relaxed">
            123 Health St., Surat , Gujarat<br />
            Phone: <a href="tel:1234567890" className="hover:text-white">123-456-7890</a><br />
            Email: <a href="mailto:novacare2308@hospital.com" className="hover:text-white">novacare@gmail.com</a>
          </address>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-white-400">
        <p>&copy; {new Date().getFullYear()} NovaCare. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
