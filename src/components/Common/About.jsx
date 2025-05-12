import React, { useContext } from 'react'; // Import useContext
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeProvider'; // Adjust path if necessary

const About = () => {
  const { darkMode } = useContext(ThemeContext); // Get darkMode state

  // Define conditional classes
  const pageBgClass = darkMode
    ? "bg-gradient-to-r from-[#1a1a1d] to-[#4e4e50] text-white"
    : "bg-gray-100 text-black";

  const mainHeadingColor = darkMode ? "text-gray-100" : "text-gray-900";
  const paragraphColor = darkMode ? "text-gray-300" : "text-gray-700";

  // Accent color (e.g., #f6ab3c). Let's define a light mode equivalent if needed.
  // If #f6ab3c works well on light backgrounds, you can simplify this.
  const accentColor = darkMode ? "text-[#f6ab3c]" : "text-orange-500"; // Example: using Tailwind's orange-500 for light
  const accentBorderColor = darkMode ? "border-[#f6ab3c]" : "border-orange-500"; // Example border

  const cardBgClass = darkMode ? "bg-[#1a1a1d]" : "bg-white";

  const teamMemberNameColor = darkMode ? "text-gray-100" : "text-gray-800";

  // The "Book Your Luxurious Stay" button uses a gradient that should work well in both modes.
  const bookButtonClass = "btn btn-lg bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-bold py-3 px-6 rounded-full shadow-xl font-semibold transition ease-in-out duration-200 hover:from-orange-600 hover:to-yellow-500";


  return (
    <div className={`${pageBgClass} mt-[93px] min-h-screen p-6 md:p-8`}>
      <div className="max-w-7xl mx-auto text-center">
        <h1 className={`text-4xl md:text-5xl font-extrabold ${mainHeadingColor} mb-8`}>
          Welcome to Hotel Luxe
        </h1>
        <p className={`text-lg md:text-xl ${paragraphColor} mb-12 leading-relaxed`}>
          Experience world-class luxury and impeccable service at <span className={`font-semibold ${accentColor}`}>Hotel Luxe</span>, your ultimate escape into comfort and sophistication.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          <div className={`${cardBgClass} p-8 rounded-xl shadow-xl border-2 ${accentBorderColor}`}>
            <h2 className={`text-2xl md:text-3xl font-semibold ${accentColor} mb-4`}>Our Story</h2>
            <p className={`${paragraphColor} text-base md:text-lg`}>
              For over 20 years, <span className={`font-semibold ${accentColor}`}>Hotel Luxe</span> has been a beacon of elegance and refinement. With each stay, we aim to provide an unforgettable experience that seamlessly blends luxury with personal touch.
            </p>
          </div>

          <div className={`${cardBgClass} p-8 rounded-xl shadow-xl border-2 ${accentBorderColor}`}>
            <h2 className={`text-2xl md:text-3xl font-semibold ${accentColor} mb-4`}>Our Mission</h2>
            <p className={`${paragraphColor} text-base md:text-lg`}>
              Our mission is to redefine the meaning of luxury by creating memorable experiences for our guests. From exquisite amenities to unparalleled service, we are here to exceed your every expectation and cater to your every need.
            </p>
          </div>
        </div>

        <div className="mt-16">
          <h2 className={`text-3xl md:text-4xl font-semibold ${accentColor} mb-6`}>Meet Our Esteemed Team</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {/* Team member 1 */}
            <div className={`w-full sm:w-72 ${cardBgClass} p-6 md:p-8 rounded-xl shadow-xl border-2 ${accentBorderColor} text-center`}>
              <img className="w-24 h-24 md:w-28 md:h-28 rounded-full mx-auto mb-6 shadow-lg" src="https://spor12.dk/wp-content/uploads/2017/05/speaker-1.jpg" alt="Team Member John Doe" />
              <h3 className={`text-lg md:text-xl font-semibold ${teamMemberNameColor} mb-2`}>John Doe</h3>
              <p className={`${accentColor} text-base md:text-lg`}>General Manager</p>
            </div>

            {/* Team member 2 */}
            <div className={`w-full sm:w-72 ${cardBgClass} p-6 md:p-8 rounded-xl shadow-xl border-2 ${accentBorderColor} text-center`}>
              <img className="w-24 h-24 md:w-28 md:h-28 rounded-full mx-auto mb-6 shadow-lg object-cover" src="https://scpr.brightspotcdn.com/dims4/default/73e6998/2147483647/strip/true/crop/3632x2421+0+0/resize/1584x1056!/format/webp/quality/90/?url=http%3A%2F%2Fa.scpr.org%2F128959_49a53fb0e2e8cc5b9c1bf6f60812c603_original.jpg" alt="Team Member Jane Smith" />
              <h3 className={`text-lg md:text-xl font-semibold ${teamMemberNameColor} mb-2`}>Jane Smith</h3>
              <p className={`${accentColor} text-base md:text-lg`}>Guest Services Manager</p>
            </div>
            {/* Add more team members as needed */}
          </div>
        </div>

        <div className="mt-16">
          <h2 className={`text-3xl md:text-4xl font-semibold ${accentColor} mb-8`}>Our Core Values</h2>
          <ul className={`list-disc list-inside text-left space-y-4 md:space-y-6 ${paragraphColor} text-base md:text-lg max-w-2xl mx-auto`}>
            <li>Excellence in service, beyond expectation</li>
            <li>Unwavering commitment to sustainability and elegance</li>
            <li>Attention to every detail, large and small</li>
            <li>Continuous innovation in hospitality standards</li>
            <li>Respect and care for each guest, every time</li>
          </ul>
        </div>

        <div className="mt-16">
          <Link to={'/rooms'} className={bookButtonClass}>
            Book Your Luxurious Stay
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;