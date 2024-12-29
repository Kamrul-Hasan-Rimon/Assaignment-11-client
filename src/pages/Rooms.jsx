import React, { useContext, useEffect, useState } from "react";
import RoomCard from "../components/Room/RoomCard";
import axios from "axios";

const Rooms = () => {
  const [rooms, setRooms] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const respone = await axios.get('http://localhost:4000/rooms')
        console.log(respone.data)
        setRooms(respone.data)
      } catch (error) {
        console.error('failed to fetching data')
      }
    }
    fetchData()
  }, [])
  return (
    <div className="min-h-screen mt-16 bg-gradient-to-r from-[#1a1a1d] to-[#4e4e50] text-white">
      <div className="container mx-auto py-16 px-6">
        <h1 className="text-6xl font-bold text-center mb-16 bg-gradient-to-r from-[#FFD700] to-[#FF8C00] text-transparent bg-clip-text tracking-wide">
          Experience Ultimate Luxury
        </h1>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-12">
          <RoomCard rooms={rooms}></RoomCard>
        </div>
      </div>
    </div>
  );
};

export default Rooms;
