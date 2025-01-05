import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../components/context/AuthProvider";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReviewModal from "./ReviewModal";
import { useAxiosSecure } from "../hook/useAxiosSecure";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const [newDate, setNewDate] = useState(null);
  const myaxios = useAxiosSecure();

  // Fetch bookings
  const fetchData = async () => {
    try {
      const response = await myaxios.get(`/myRooms/${user?.email}`);
      setBookings(response.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchData();
    }
  }, [user?.email]);

  // Handle Cancel Booking
  const handleCancel = async (bookingId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel this booking? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "No, keep it",
    });

    if (result.isConfirmed) {
      try {
        const response = await myaxios.delete(`/myRooms/${bookingId}`);
        console.log(response);
        Swal.fire("Cancelled!", "Your booking has been successfully cancelled.", "success");
        fetchData();
      } catch (error) {
        Swal.fire("Error", "Failed to delete booking.", "error");
      }
    }
  };

  // Open Update Date Modal
  const handleUpdateDate = (bookingId) => {
    setSelectedBookingId(bookingId);
    setIsModalOpen(true);
  };

  // Handle Update Booking Date
  const updateBookingDate = async () => {
    if (!newDate) {
      Swal.fire("Error", "Please select a new date.", "error");
      return;
    }

    try {
      const response = await myaxios.put(`/myRooms/${selectedBookingId}`, {
        newDate,
      });
      console.log(response);
      Swal.fire("Updated!", "Booking date updated successfully.", "success");
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      Swal.fire("Error", "Failed to update booking date.", "error");
    }
  };

  const handleReview = (bookingId) => {
    setRoomId(bookingId);
    setIsReviewModalOpen(true);
  };

  return (
    <div className="min-h-screen mt-[93px] bg-gradient-to-r from-[#1a1a1d] to-[#4e4e50] text-white p-10">
      <div className="container mx-auto">
        <h1 className="text-5xl font-extrabold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-gold to-white">
          My Ultra-Luxurious Bookings
        </h1>
        <div className="overflow-x-auto">
          <table className="table-auto w-full bg-white/10 backdrop-blur-md rounded-lg overflow-hidden shadow-2xl border border-gray-300">
            <thead className="bg-gradient-to-r from-[#ffd700] to-[#c0c0c0] text-white text-xl">
              <tr>
                <th className="px-6 py-4 text-left font-bold uppercase">Image</th>
                <th className="px-6 py-4 text-left font-bold uppercase">Name</th>
                <th className="px-6 py-4 text-left font-bold uppercase">Price</th>
                <th className="px-6 py-4 text-left font-bold uppercase">Date</th>
                <th className="px-6 py-4 text-center font-bold uppercase">Actions</th>
              </tr>
            </thead>
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
                    <td className="px-6 py-4 text-gray-200 font-medium">{booking.roomName}</td>
                    <td className="px-6 py-4 text-gold font-semibold">${booking.pricepernight} / night</td>
                    <td className="px-6 py-4 text-gray-300">{booking.newDate || booking.bookingDate}</td>
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
                        onClick={() => handleReview(booking.roomId)}
                        className="px-5 py-2 bg-gradient-to-r from-[#FFD700] via-[#FF8C00] to-[#FFD700] text-white font-medium rounded-lg shadow-md hover:shadow-xl transition duration-300 mx-1"
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-300 font-semibold text-xl">
                    No bookings found. Start booking your ultra-luxurious rooms now!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Update Date Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gradient-to-r from-blue-600 to-purple-700 p-10 rounded-3xl shadow-2xl transform scale-105 transition-all duration-300">
            <div className="bg-white p-8 rounded-2xl shadow-2xl border-2 border-gray-200">
              <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Update Booking Date</h2>
              <DatePicker
                selected={newDate}
                onChange={(date) => setNewDate(date)}
                dateFormat="yyyy-MM-dd"
                className="border-2 border-blue-500 text-gray-900 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  onClick={updateBookingDate}
                  className="px-6 py-3 bg-gradient-to-r from-green-400 to-teal-500 text-white text-lg font-semibold rounded-lg shadow-lg hover:scale-105 transform transition-all duration-200"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 bg-gray-500 text-white text-lg font-semibold rounded-lg shadow-lg hover:scale-105 transform transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ReviewModal
        roomId={roomId}
        userEmail={user.email}
        username={user.displayName}
        setIsReviewModalOpen={setIsReviewModalOpen}
        isReviewModalOpen={isReviewModalOpen}
        photoURL={user.photoURL}
      />
    </div>
  );
};

export default MyBookings;
