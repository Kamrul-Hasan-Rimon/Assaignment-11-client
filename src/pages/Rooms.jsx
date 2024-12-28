import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

const Rooms = () => {

  const navigate = useNavigate();

   const rooms =[
    {
      id: 1,
      name: "Deluxe Suite",
      description: "A luxurious room with sea views and a king-sized bed.",
      price: 200,
      reviews: ["Amazing stay!", "Loved the view!", "Highly recommend!"],
      image: "deluxe-suite.jpg",
      isAvailable: true,
    },
    {
      id: 2,
      name: "Executive Room",
      description: "Spacious room with premium amenities and city views.",
      price: 150,
      reviews: ["Very clean!", "Great location!", "Comfortable bed."],
      image: "executive-room.jpg",
      isAvailable: true,
    },
    {
      id: 3,
      name: "Standard Room",
      description: "A cozy room with all the essentials for a comfortable stay.",
      price: 100,
      reviews: ["Affordable and clean.", "Good value for money."],
      image: "standard-room.jpg",
      isAvailable: false,
    },
   ] 
  
  return (
    <div className="p-8 mt-28 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-6">Available Rooms</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <div
            key={room.id}
            className={`card shadow-lg rounded-lg p-4 cursor-pointer ${
              room.isAvailable ? "bg-white" : "bg-gray-300"
            }`}
            onClick={() => navigate(`/rooms/${room.id}`)}
          >
            <img
              src={`/assets/images/${room.image}`}
              alt={room.name}
              className="w-full h-48 object-cover rounded-lg"
            />
            <h2 className="text-xl font-semibold mt-4">{room.name}</h2>
            <p className="text-sm text-gray-500">{room.description}</p>
            <p className="text-lg font-bold mt-2">${room.price} / night</p>
            <p className="text-sm mt-2">
              {room.reviews.length} {room.reviews.length === 1 ? "Review" : "Reviews"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rooms;
