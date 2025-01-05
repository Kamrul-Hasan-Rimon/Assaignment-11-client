import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="bg-gradient-to-r from-[#1a1a1d] to-[#4e4e50] text-white mt-[93px] min-h-screen p-8">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-5xl font-extrabold text-gray-100 mb-8">
          Welcome to Hotel Luxe
        </h1>
        <p className="text-xl text-gray-300 mb-12 leading-relaxed">
          Experience world-class luxury and impeccable service at <span className="font-semibold text-[#f6ab3c]">Hotel Luxe</span>, your ultimate escape into comfort and sophistication.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="bg-[#1a1a1d] p-8 rounded-xl shadow-xl border-2 border-[#f6ab3c]">
            <h2 className="text-3xl font-semibold text-[#f6ab3c] mb-4">Our Story</h2>
            <p className="text-gray-300 text-lg">
              For over 20 years, <span className="font-semibold text-[#f6ab3c]">Hotel Luxe</span> has been a beacon of elegance and refinement. With each stay, we aim to provide an unforgettable experience that seamlessly blends luxury with personal touch.
            </p>
          </div>

          <div className="bg-[#1a1a1d] p-8 rounded-xl shadow-xl border-2 border-[#f6ab3c]">
            <h2 className="text-3xl font-semibold text-[#f6ab3c] mb-4">Our Mission</h2>
            <p className="text-gray-300 text-lg">
              Our mission is to redefine the meaning of luxury by creating memorable experiences for our guests. From exquisite amenities to unparalleled service, we are here to exceed your every expectation and cater to your every need.
            </p>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-4xl font-semibold text-[#f6ab3c] mb-6">Meet Our Esteemed Team</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {/* Team member 1 */}
            <div className="w-72 bg-[#1a1a1d] p-8 rounded-xl shadow-xl border-2 border-[#f6ab3c] text-center">
              <img className="w-28 h-28 rounded-full mx-auto mb-6 shadow-lg" src="https://spor12.dk/wp-content/uploads/2017/05/speaker-1.jpg" alt="Team Member" />
              <h3 className="text-xl font-semibold text-gray-100 mb-2">John Doe</h3>
              <p className="text-[#f6ab3c] text-lg">General Manager</p>
            </div>

            {/* Team member 2 */}
            <div className="w-72 bg-[#1a1a1d] p-8 rounded-xl shadow-xl border-2 border-[#f6ab3c] text-center">
              <img className="w-28 h-28 rounded-full mx-auto mb-6 shadow-lg object-cover" src="https://scpr.brightspotcdn.com/dims4/default/73e6998/2147483647/strip/true/crop/3632x2421+0+0/resize/1584x1056!/format/webp/quality/90/?url=https%3A%2F%2Fa.scpr.org%2F128959_49a53fb0e2e8cc5b9c1bf6f60812c603_original.jpg" alt="Team Member" />
              <h3 className="text-xl font-semibold text-gray-100 mb-2">Jane Smith</h3>
              <p className="text-[#f6ab3c] text-lg">Guest Services Manager</p>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-4xl font-semibold text-[#f6ab3c] mb-8">Our Core Values</h2>
          <ul className="list-disc list-inside text-left space-y-6 text-gray-300 text-lg">
            <li>Excellence in service, beyond expectation</li>
            <li>Unwavering commitment to sustainability and elegance</li>
            <li>Attention to every detail, large and small</li>
            <li>Continuous innovation in hospitality standards</li>
            <li>Respect and care for each guest, every time</li>
          </ul>
        </div>

        <div className="mt-16">
          <Link to={'/rooms'} className="btn btn-lg bg-[#f6ab3c] text-gray-900 hover:bg-[#f6ab3c]/80 py-3 px-6 rounded-full shadow-xl font-semibold transition ease-in-out duration-200">
            Book Your Luxurious Stay
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
