import React, { useContext } from "react"; // Import useContext
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEnvelope,
} from "react-icons/fa";
import { ThemeContext } from "../context/ThemeProvider"; // Import ThemeContext

const Footer = () => {
  const { darkMode } = useContext(ThemeContext); // Get darkMode state

  // Define conditional classes
  const footerBgClass = darkMode
    ? "bg-gradient-to-r from-[#1a1a1d] to-[#4e4e50]"
    : "bg-gray-100"; // Light gray background for light mode

  const mainTextColor = darkMode ? "text-gray-300" : "text-gray-700"; // General text
  const lightTextColor = darkMode ? "text-gray-400" : "text-gray-600"; // Lighter paragraphs, links

  // 'text-gold' is used for headings and icons. Let's make it conditional for better contrast.
  // If 'text-gold' is a custom class that works on both, you can simplify this.
  const goldAccentColor = darkMode ? "text-gold" : "text-yellow-600"; // Assuming 'text-gold' is your dark mode gold
  const goldAccentHoverColor = darkMode ? "hover:text-yellow-400" : "hover:text-yellow-500";

  const borderColor = darkMode ? "border-gray-700" : "border-gray-300";

  return (
    <footer className={`${footerBgClass} ${mainTextColor} py-16`}>
      <div className="container mx-auto px-8 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* About Us Section */}
          <div>
            <h3 className={`text-2xl font-bold ${goldAccentColor} mb-6`}>About Us</h3>
            <p className={lightTextColor}>
              Experience unmatched luxury and world-class service at our hotel.
              Whether you’re traveling for leisure or business, we make every
              stay memorable.
            </p>
            <div className="mt-6 flex space-x-4">
              <a
                href="#" // Replace with actual links
                className={`${goldAccentColor} ${goldAccentHoverColor} text-2xl transition-all`}
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>
              <a
                href="#" // Replace with actual links
                className={`${goldAccentColor} ${goldAccentHoverColor} text-2xl transition-all`}
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
              <a
                href="#" // Replace with actual links
                className={`${goldAccentColor} ${goldAccentHoverColor} text-2xl transition-all`}
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="#" // Replace with actual links
                className={`${goldAccentColor} ${goldAccentHoverColor} text-2xl transition-all`}
                aria-label="YouTube"
              >
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className={`text-2xl font-bold ${goldAccentColor} mb-6`}>Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="/rooms"
                  className={`${lightTextColor} ${goldAccentHoverColor} transition-all`}
                >
                  Featured Rooms
                </a>
              </li>
              <li>
                <a
                  href="/offers" // Assuming you have an offers page/section
                  className={`${lightTextColor} ${goldAccentHoverColor} transition-all`}
                >
                  Exclusive Offers
                </a>
              </li>
              <li>
                <a
                  href="/testimonials" // Assuming you have a testimonials page/section
                  className={`${lightTextColor} ${goldAccentHoverColor} transition-all`}
                >
                  Guest Testimonials
                </a>
              </li>
              <li>
                <a
                  href="/contact" // Assuming you have a contact page/section
                  className={`${lightTextColor} ${goldAccentHoverColor} transition-all`}
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information Section */}
          <div>
            <h3 className={`text-2xl font-bold ${goldAccentColor} mb-6`}>
              Contact Information
            </h3>
            <ul className={`space-y-4 ${lightTextColor}`}> {/* Apply lightTextColor to the ul for its children */}
              <li className="flex items-center space-x-4">
                <FaMapMarkerAlt className={`${goldAccentColor} text-xl`} />
                <span>123 Luxury Street, Beverly Hills, CA</span>
              </li>
              <li className="flex items-center space-x-4">
                <FaPhoneAlt className={`${goldAccentColor} text-xl`} />
                <span>+1 (123) 456-7890</span>
              </li>
              <li className="flex items-center space-x-4">
                <FaEnvelope className={`${goldAccentColor} text-xl`} />
                <span>info@luxuryhotel.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className={`mt-12 border-t ${borderColor} pt-6 text-center`}>
          <p className={lightTextColor}>
            © {new Date().getFullYear()} Luxury Hotel. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;