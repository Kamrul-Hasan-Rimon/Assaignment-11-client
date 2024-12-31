import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../components/context/AuthProvider";
import Swal from "sweetalert2";

const MyBookings = () => {
  const { user } = useContext(AuthContext)
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API}/myRooms/${user?.email}`);
        console.log(response.data);
        setBookings(response.data);
      } catch (error) {
        console.error("Failed to fetch data");
      }
    };
    fetchData();
  }, []);

  const handleCancel = async (bookingId) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API}/myRooms/${bookingId}`)
      console.log(response)
      Swal.fire({
        title: "Success!",
        text: "Successfully deleted ",
        icon: "success",
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to delete",
        icon: "error",
      });
    }
  };
  const handleReview = (bookingId) => {
    alert("Review functionality is not yet implemented!");
  };


  const handleUpdateDate = (bookingId) => {
    const newDate = prompt("Enter the new booking date:");
    if (newDate) {
      alert(`Update date functionality for Booking ID ${bookingId} is not yet implemented!`);
    }
  };

  return (
    <div className="min-h-screen mt-[93px] bg-gradient-to-r from-[#1a1a1d] to-[#4e4e50] text-white text-white p-10">
      <div className="container mx-auto">
        <h1 className="text-5xl font-extrabold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-gold to-white">
          My Ultra-Luxurious Bookings
        </h1>
        <div className="overflow-x-auto">
          <table className="table-auto w-full bg-white/10 backdrop-blur-md rounded-lg overflow-hidden shadow-2xl border border-gray-300">
            {/* Table Head */}
            <thead className="bg-gradient-to-r from-[#ffd700] to-[#c0c0c0] text-white text-xl">
              <tr>
                <th className="px-6 py-4 text-left font-bold uppercase">Image</th>
                <th className="px-6 py-4 text-left font-bold uppercase">Name</th>
                <th className="px-6 py-4 text-left font-bold uppercase">Price</th>
                <th className="px-6 py-4 text-left font-bold uppercase">Date</th>
                <th className="px-6 py-4 text-center font-bold uppercase">Actions</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {bookings.length > 0 ? (
                bookings.map((booking, index) => (
                  <tr
                    key={booking._id}
                    className={`${index % 2 === 0 ? "bg-white/20" : "bg-white/10"
                      } hover:bg-white/30 transition duration-300 backdrop-blur-sm`}
                  >
                    <td className="px-6 py-4">
                      <img
                        src={booking.roomImage}
                        alt={booking.roomName}
                        className="w-16 h-16 object-cover rounded-full shadow-lg border border-gold"
                      />
                    </td>
                    <td className="px-6 py-4 text-gray-200 font-medium">
                      {booking.roomName}
                    </td>
                    <td className="px-6 py-4 text-gold font-semibold">
                      ${booking.pricepernight} / night
                    </td>
                    <td className="px-6 py-4 text-gray-300">{booking.bookingDate}</td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleCancel(booking._id)}
                        className="px-5 py-2 mb-2 bg-gradient-to-r from-[#ff416c] to-[#ff4b2b] text-white font-medium rounded-lg shadow-md hover:shadow-lg hover:from-[#ff4b2b] hover:to-[#ff416c] transition duration-300 mx-1"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleUpdateDate(booking._id)}
                        className="px-5 mb-2 py-2 bg-gradient-to-r from-[#6a11cb] to-[#2575fc] text-white font-medium rounded-lg shadow-md hover:shadow-lg hover:from-[#2575fc] hover:to-[#6a11cb] transition duration-300 mx-1"
                      >
                        Update Date
                      </button>
                      <button
                        onClick={() => handleReview(booking._id)}
                        className="px-5 py-2 bg-gradient-to-r from-[#FFD700] via-[#FF8C00] to-[#FFD700] text-white font-medium rounded-lg shadow-md hover:shadow-xl  transition duration-300 mx-1"
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-4 text-center text-gray-300 font-semibold text-xl"
                  >
                    No bookings found. Start booking your ultra-luxurious rooms now!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
