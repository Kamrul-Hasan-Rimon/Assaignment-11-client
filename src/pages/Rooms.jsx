import React, { useEffect, useState, useContext } from "react"; // Import useContext
import RoomCard from "../components/Room/RoomCard"; // Assuming RoomCard is theme-aware or will be made so
import axios from "axios";
import { ThemeContext } from "../components/context/ThemeProvider"; // Import ThemeContext

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const { darkMode } = useContext(ThemeContext); // Get darkMode state

  const fetchData = async () => {
    try {
      const params = {};
      if (minPrice) params.minPrice = minPrice;
      if (maxPrice) params.maxPrice = maxPrice;

      const response = await axios.get(`https://modern-hotel-server.vercel.app/rooms`, {
        params,
      });
      setRooms(response.data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      // Optionally, set rooms to an empty array or show an error message
      // setRooms([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Initial fetch

  // Handle apply filter button click
  const handleApplyFilter = () => {
    fetchData();
  };

  // Define conditional classes
  const pageBgClass = darkMode
    ? "bg-gradient-to-r from-[#1a1a1d] to-[#4e4e50] text-white"
    : "bg-gray-100 text-black";

  const inputClasses = darkMode
    ? "bg-gray-700 text-white border-gray-600 focus:ring-orange-500 placeholder-gray-400"
    : "bg-white text-black border-gray-300 focus:ring-orange-500 placeholder-gray-500";

  // The filter button styling is a gradient, which might look good in both modes.
  // If not, you can make it conditional:
  const filterButtonClasses = darkMode
    ? "bg-gradient-to-r from-orange-500 to-yellow-400 text-white hover:from-orange-600 hover:to-yellow-500"
    : "bg-orange-500 hover:bg-orange-600 text-white"; // Example for light mode


  return (
    <div className={`min-h-screen mt-16 pt-10 ${pageBgClass}`}> {/* Added pt-10 for spacing from fixed navbar */}
      <div className="container mx-auto py-12 px-6">
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-12 md:mb-16 bg-gradient-to-r from-[#FFD700] to-[#FF8C00] text-transparent bg-clip-text tracking-wide">
          Experience Ultimate Luxury
        </h1>

        {/* Filter Form */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8 p-4 rounded-lg">
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className={`w-full sm:w-32 p-2 border rounded-md focus:outline-none focus:ring-2 ${inputClasses}`}
          />
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className={`w-full sm:w-32 p-2 border rounded-md focus:outline-none focus:ring-2 ${inputClasses}`}
          />
          <button
            onClick={handleApplyFilter} // Use this handler
            className={`px-6 py-2 font-bold rounded-md transition w-full sm:w-auto ${filterButtonClasses}`}
          >
            Apply Filter
          </button>
        </div>

        {/* Room Cards */}
        {rooms.length > 0 ? (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8 md:gap-12">
            {/*
              Assuming RoomCard component takes a single 'room' prop.
              And each room object has a unique '_id' or 'id'.
            */}
            {rooms.map((room) => (
              <RoomCard key={room._id || room.id} room={room} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              No rooms available matching your criteria. Please try adjusting your filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Rooms;