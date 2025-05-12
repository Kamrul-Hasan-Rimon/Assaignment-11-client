import React, { useContext } from 'react'; // Import useContext
import { Link } from 'react-router-dom';
import Rating from 'react-rating';
import { ThemeContext } from '../context/ThemeProvider';

export default function RoomCard({ room }) {
  const { darkMode } = useContext(ThemeContext);

  // Conditional classes
  const cardBaseClasses = "group relative shadow-lg rounded-2xl overflow-hidden transition-all duration-500 transform hover:scale-105 hover:shadow-2xl";
  const cardThemeClasses = darkMode
    ? "backdrop-blur-lg bg-opacity-40 bg-black"
    : "bg-white border border-gray-200";

  const descriptionTextClass = darkMode ? "text-gray-300" : "text-gray-700";
  const reviewsAndRatingColor = darkMode ? "text-yellow-400" : "text-yellow-500";

  // Availability badge classes
  const availableBadgeBase = "absolute bottom-4 right-4 text-sm font-bold py-2 px-4 rounded-full shadow-xl border-2";
  const availableBadgeClasses = room.isAvailable
    ? (darkMode
      ? 'bg-gradient-to-r from-[#FFD700] via-[#FF8C00] to-[#FFD700] text-white border-yellow-500'
      : 'bg-gradient-to-r from-green-500 via-green-600 to-green-500 text-white border-green-700'
    )
    : (darkMode
      ? 'bg-gradient-to-r from-gray-600 via-gray-800 to-gray-600 text-gray-300 border-gray-500'
      : 'bg-gray-200 text-gray-500 border-gray-300'
    );

  if (!room) {
    return null;
  }

  return (
    <Link
      to={`/roomDetails/${room._id}`}
      key={room._id} // key is usually managed by the parent when mapping
      className={`${cardBaseClasses} ${cardThemeClasses}`}
    >
      {/* Room Image */}
      <div className="relative">
        <img
          src={room.image}
          alt={room.name}
          className="w-full h-64 object-cover rounded-t-2xl transition-transform duration-500 group-hover:scale-105" // Use group-hover if Link is the target
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-50 transition duration-300"></div>
        {/* Price Badge: Assuming 'gold-400', 'gold-600' are defined in Tailwind config and work on light/dark */}
        <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white font-semibold py-2 px-4 rounded-full shadow-lg">
          ${room.price}/Night
        </div>
      </div>

      {/* Room Details */}
      <div className="p-6 md:p-8"> {/* Adjusted padding for responsiveness */}
        <h2 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-l from-[#FFD700] to-[#FF8C00] text-transparent bg-clip-text tracking-wide mb-3 transition duration-300">
          {room.name}
        </h2>
        <p className={`${descriptionTextClass} text-base md:text-lg mb-6 leading-relaxed line-clamp-3`}> {/* Added line-clamp */}
          {room.description}
        </p>
        <div className="flex items-center justify-between">
          <span className={`${reviewsAndRatingColor} font-bold text-base md:text-lg`}>
            {room.reviews?.length || 0} Reviews {/* Added optional chaining and default */}
          </span>

          {/* Rating Component */}
          <Rating
            initialRating={room.rating || 0} // Added default
            emptySymbol="☆"
            fullSymbol="★"
            readonly
            className={reviewsAndRatingColor}
          />
        </div>
      </div>

      <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400"></div>

      {/* Luxurious Availability Badge */}
      <div className={`${availableBadgeBase} ${availableBadgeClasses}`}>
        {room.isAvailable ? 'Available' : 'Not Available'}
      </div>
    </Link>
  );
}