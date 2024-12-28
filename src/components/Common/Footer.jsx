import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#1a1a1d] to-[#4e4e50] text-gray-300 py-16">
      <div className="container mx-auto px-8 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* About Us Section */}
          <div>
            <h3 className="text-2xl font-bold text-gold mb-6">About Us</h3>
            <p className="text-gray-400">
              Experience unmatched luxury and world-class service at our hotel.
              Whether you’re traveling for leisure or business, we make every
              stay memorable.
            </p>
            <div className="mt-6 flex space-x-4">
              <a
                href="#"
                className="text-gold hover:text-yellow-400 text-2xl transition-all"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="text-gold hover:text-yellow-400 text-2xl transition-all"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="text-gold hover:text-yellow-400 text-2xl transition-all"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="text-gold hover:text-yellow-400 text-2xl transition-all"
                aria-label="YouTube"
              >
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-2xl font-bold text-gold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="/rooms"
                  className="hover:text-gold transition-all text-gray-400"
                >
                  Featured Rooms
                </a>
              </li>
              <li>
                <a
                  href="/offers"
                  className="hover:text-gold transition-all text-gray-400"
                >
                  Exclusive Offers
                </a>
              </li>
              <li>
                <a
                  href="/testimonials"
                  className="hover:text-gold transition-all text-gray-400"
                >
                  Guest Testimonials
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:text-gold transition-all text-gray-400"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information Section */}
          <div>
            <h3 className="text-2xl font-bold text-gold mb-6">
              Contact Information
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-4">
                <FaMapMarkerAlt className="text-gold text-xl" />
                <span>123 Luxury Street, Beverly Hills, CA</span>
              </li>
              <li className="flex items-center space-x-4">
                <FaPhoneAlt className="text-gold text-xl" />
                <span>+1 (123) 456-7890</span>
              </li>
              <li className="flex items-center space-x-4">
                <FaEnvelope className="text-gold text-xl" />
                <span>info@luxuryhotel.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="mt-12 border-t border-gray-700 pt-6 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Luxury Hotel. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
