import React, { useEffect, useState } from "react";
import RoomCard from "../components/Room/RoomCard";
import axios from "axios";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const fetchData = async () => {
    try {
      console.log('Fetching data with parameters:', { minPrice, maxPrice });

      // Ensure the `params` object is properly formatted
      const response = await axios.get(`${import.meta.env.VITE_API}/rooms`, {
        params: {
          minPrice: minPrice || undefined, // Only include if a value exists
          maxPrice: maxPrice || undefined,
        },
      });

      console.log('Response data:', response.data);
      setRooms(response.data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };


  useEffect(() => {
    fetchData();
  }, [minPrice, maxPrice]);

  return (
    <div className="min-h-screen mt-16 bg-gradient-to-r from-[#1a1a1d] to-[#4e4e50] text-white">
      <div className="container mx-auto py-16 px-6">
        <h1 className="text-6xl font-bold text-center mb-16 bg-gradient-to-r from-[#FFD700] to-[#FF8C00] text-transparent bg-clip-text tracking-wide">
          Experience Ultimate Luxury
        </h1>

        {/* Filter Form */}
        <div className="flex justify-center items-center gap-4 mb-8">
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-32 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 bg-gray-900 text-white"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-32 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 bg-gray-900 text-white"
          />
          <button
            onClick={fetchData}
            className="px-6 py-2 bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-bold rounded-md hover:from-orange-600 hover:to-yellow-500 transition"
          >
            Apply Filter
          </button>
        </div>

        {/* Room Cards */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-12">
          <RoomCard rooms={rooms}></RoomCard>
        </div>
      </div>
    </div>
  );
};

export default Rooms;
