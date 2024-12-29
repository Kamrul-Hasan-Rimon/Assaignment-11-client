import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function RoomCard({ rooms }) {

  const navigate = useNavigate();
  return (
    <>
      {rooms.map((room) => (
        <div
          key={room.id}
          className="group relative backdrop-blur-lg bg-opacity-40 bg-black shadow-lg rounded-2xl overflow-hidden transition-all duration-500 transform hover:scale-105 hover:shadow-2xl"
          onClick={() => navigate(`${room.id}`)}
        >
          {/* Room Image */}
          <div className="relative">
            <img
              src={room.image}
              alt={room.name}
              className="w-full h-64 object-cover rounded-t-2xl  object-cover transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-50 transition duration-300"></div>
            <div className="absolute top-4 right-4 bg-gradient-to-r from-gold-400 via-yellow-500 to-gold-600 text-white font-semibold py-2 px-4 rounded-full shadow-lg">
              ${room.price}/Night
            </div>
          </div>

          {/* Room Details */}
          <div className="p-8">
            <h2 className="text-3xl font-extrabold text-yellow-600 mb-3 hover:text-to-r from-[#FFD700] to-[#FF8C00] text-transparent transition duration-300 mb-4">
              {room.name}
            </h2>
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">{room.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-yellow-400 font-bold text-lg">
                {room.reviews.length} Reviews
              </span>
        
            </div>
          </div>

          {/* Decorative Border */}
          <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-gold-400 via-yellow-500 to-gold-400"></div>
        </div>
      ))}
    </>
  )
}
