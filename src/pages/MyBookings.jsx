import React, { useState, useEffect, useContext } from "react";
import axios from "axios"; // You are using myaxios from useAxiosSecure, so this might be unused
import { AuthContext } from "../components/context/AuthProvider"; // Check path
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './DatePickerCustomStyles.css'; // Import custom styles for DatePicker
import ReviewModal from "./ReviewModal"; // Check path, ReviewModal also needs to be theme-aware
import { useAxiosSecure } from "../hook/useAxiosSecure";
import { ThemeContext } from "../components/context/ThemeProvider"; // Import ThemeContext

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const { darkMode } = useContext(ThemeContext); // Get darkMode state
  const [bookings, setBookings] = useState([]);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false); // Renamed for clarity
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [roomIdForReview, setRoomIdForReview] = useState(null); // Renamed for clarity
  const [newDate, setNewDate] = useState(null);
  const myaxios = useAxiosSecure();

  // Fetch bookings
  const fetchData = async () => {
    if (!user?.email) return; // Guard clause
    try {
      const response = await myaxios.get(`/myRooms/${user.email}`);
      setBookings(response.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      Swal.fire("Error", "Could not fetch your bookings.", "error");
    }
  };

  useEffect(() => {
    fetchData();
  }, [user?.email, myaxios]); // Added myaxios

  // Handle Cancel Booking
  const handleCancel = async (bookingId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel this booking? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33", // Red for confirm
      cancelButtonColor: darkMode ? "#3085d6" : "#60a5fa", // Blue, adjust for light theme
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "No, keep it",
      background: darkMode ? '#1f2937' : '#f9fafb', // gray-800 or gray-50
      color: darkMode ? '#f3f4f6' : '#1f2937', // gray-200 or gray-800
    });

    if (result.isConfirmed) {
      try {
        await myaxios.delete(`/myRooms/${bookingId}`);
        Swal.fire({
          title: "Cancelled!",
          text: "Your booking has been successfully cancelled.",
          icon: "success",
          background: darkMode ? '#1f2937' : '#f9fafb',
          color: darkMode ? '#f3f4f6' : '#1f2937',
        });
        fetchData(); // Refresh bookings list
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Failed to delete booking.",
          icon: "error",
          background: darkMode ? '#1f2937' : '#f9fafb',
          color: darkMode ? '#f3f4f6' : '#1f2937',
        });
      }
    }
  };

  // Open Update Date Modal
  const handleUpdateDateModalOpen = (bookingId) => {
    setSelectedBookingId(bookingId);
    // Optionally, find the current booking's date to pre-fill the date picker
    const currentBooking = bookings.find(b => b._id === bookingId);
    if (currentBooking && (currentBooking.newDate || currentBooking.bookingDate)) {
      setNewDate(new Date(currentBooking.newDate || currentBooking.bookingDate));
    } else {
      setNewDate(null);
    }
    setIsUpdateModalOpen(true);
  };

  // Handle Update Booking Date
  const updateBookingDate = async () => {
    if (!newDate) {
      Swal.fire({ title: "Error", text: "Please select a new date.", icon: "error", background: darkMode ? '#1f2937' : '#f9fafb', color: darkMode ? '#f3f4f6' : '#1f2937' });
      return;
    }
    try {
      await myaxios.put(`/myRooms/${selectedBookingId}`, {
        bookingDate: newDate, // Ensure backend expects 'bookingDate' or 'newDate'
      });
      Swal.fire({ title: "Updated!", text: "Booking date updated successfully.", icon: "success", background: darkMode ? '#1f2937' : '#f9fafb', color: darkMode ? '#f3f4f6' : '#1f2937' });
      setIsUpdateModalOpen(false);
      setNewDate(null); // Reset date picker
      fetchData(); // Refresh bookings
    } catch (error) {
      Swal.fire({ title: "Error", text: "Failed to update booking date. The room may not be available on the selected date.", icon: "error", background: darkMode ? '#1f2937' : '#f9fafb', color: darkMode ? '#f3f4f6' : '#1f2937' });
    }
  };

  const handleReviewModalOpen = (roomId) => { // Changed param to roomId
    setRoomIdForReview(roomId);
    setIsReviewModalOpen(true);
  };

  // Conditional Classes
  const pageBgClass = darkMode
    ? "bg-gradient-to-r from-[#1a1a1d] to-[#4e4e50] text-white"
    : "bg-gray-100 text-black";

  // Main title gradient "from-gold to-white" might need adjustment for light mode if "gold" isn't well-defined or contrasting.
  // Let's assume "gold" is like yellow-400.
  const mainTitleClass = darkMode
    ? "text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-white"
    : "text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500"; // Example light mode gradient

  const tableContainerBg = darkMode ? "bg-white/10 backdrop-blur-md" : "bg-white";
  const tableBorderColor = darkMode ? "border-gray-700" : "border-gray-300";

  // Table head bg: "from-[#ffd700] to-[#c0c0c0]" (gold to silver) might be too light on light bg.
  const tableHeadBg = darkMode
    ? "bg-gradient-to-r from-yellow-500 to-gray-400 text-black" // Dark mode: gold to silver, black text for contrast
    : "bg-gradient-to-r from-orange-500 to-amber-400 text-white"; // Light mode: warmer gradient, white text
  const tableHeadTextColor = darkMode ? "text-black font-bold" : "text-white font-bold"; // Making text color explicit

  const tableRowBgEven = darkMode ? "bg-white/20" : "bg-gray-50";
  const tableRowBgOdd = darkMode ? "bg-white/10" : "bg-white";
  const tableRowHoverBg = darkMode ? "hover:bg-white/30" : "hover:bg-gray-200";

  const imageBorderColor = darkMode ? "border-yellow-400" : "border-amber-500"; // Gold-like border
  const cellTextColor = darkMode ? "text-gray-200" : "text-gray-700";
  const priceTextColor = darkMode ? "text-yellow-400" : "text-amber-600"; // Gold-like price
  const dateTextColor = darkMode ? "text-gray-300" : "text-gray-500";
  const noBookingsTextColor = darkMode ? "text-gray-300" : "text-gray-600";

  // Update Date Modal Styles
  const updateModalOuterBg = darkMode ? "bg-gradient-to-r from-blue-600 to-purple-700" : "bg-gradient-to-r from-sky-500 to-indigo-500";
  const updateModalInnerBg = darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200";
  const updateModalTitleColor = darkMode ? "text-white" : "text-gray-800";
  const datePickerInputClass = darkMode
    ? "border-2 border-blue-500 bg-gray-700 text-white p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
    : "border-2 border-sky-500 bg-white text-gray-900 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-sky-500 placeholder-gray-500";


  if (!user) {
    return (
      <div className={`min-h-screen mt-[93px] flex items-center justify-center ${pageBgClass}`}>
        <p className="text-2xl">Please log in to view your bookings.</p>
        {/* Optionally, a Link to login page */}
      </div>
    );
  }


  return (
    <div className={`min-h-screen mt-[93px] p-6 md:p-10 ${pageBgClass}`}>
      <div className="container mx-auto">
        <h1 className={`text-4xl md:text-5xl font-extrabold text-center mb-10 md:mb-12 ${mainTitleClass}`}>
          My Ultra-Luxurious Bookings
        </h1>
        <div className="overflow-x-auto">
          <table className={`table-auto w-full ${tableContainerBg} rounded-lg overflow-hidden shadow-2xl border ${tableBorderColor}`}>
            <thead className={`${tableHeadBg}`}>
              <tr>
                <th className={`px-4 py-3 md:px-6 md:py-4 text-left uppercase text-sm md:text-base ${tableHeadTextColor}`}>Image</th>
                <th className={`px-4 py-3 md:px-6 md:py-4 text-left uppercase text-sm md:text-base ${tableHeadTextColor}`}>Name</th>
                <th className={`px-4 py-3 md:px-6 md:py-4 text-left uppercase text-sm md:text-base ${tableHeadTextColor}`}>Price</th>
                <th className={`px-4 py-3 md:px-6 md:py-4 text-left uppercase text-sm md:text-base ${tableHeadTextColor}`}>Date</th>
                <th className={`px-4 py-3 md:px-6 md:py-4 text-center uppercase text-sm md:text-base ${tableHeadTextColor}`}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length > 0 ? (
                bookings.map((booking, index) => (
                  <tr
                    key={booking._id}
                    className={`${index % 2 === 0 ? tableRowBgEven : tableRowBgOdd} ${tableRowHoverBg} transition duration-300`}
                  >
                    <td className="px-4 py-3 md:px-6 md:py-4">
                      <img
                        src={booking.roomImage}
                        alt={booking.roomName}
                        className={`w-12 h-12 md:w-16 md:h-16 object-cover rounded-full shadow-lg border ${imageBorderColor}`}
                      />
                    </td>
                    <td className={`px-4 py-3 md:px-6 md:py-4 font-medium ${cellTextColor}`}>{booking.roomName}</td>
                    <td className={`px-4 py-3 md:px-6 md:py-4 font-semibold ${priceTextColor}`}>
                      ${booking.pricepernight} <span className="text-xs md:text-sm">/ night</span>
                    </td>
                    <td className={`px-4 py-3 md:px-6 md:py-4 ${dateTextColor}`}>
                      {new Date(booking.newDate || booking.bookingDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 md:px-6 md:py-4 text-center whitespace-nowrap">
                      <button
                        onClick={() => handleCancel(booking._id)}
                        className="px-3 py-1.5 md:px-5 md:py-2 text-xs md:text-sm mb-1 md:mb-2 bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition duration-300 mx-1"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleUpdateDateModalOpen(booking._id)}
                        className="px-3 py-1.5 md:px-5 md:py-2 text-xs md:text-sm mb-1 md:mb-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition duration-300 mx-1"
                      >
                        Update Date
                      </button>
                      <button
                        onClick={() => handleReviewModalOpen(booking.roomId)} // Pass roomId for the review
                        className="px-3 py-1.5 md:px-5 md:py-2 text-xs md:text-sm bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 text-white font-medium rounded-lg shadow-md hover:shadow-xl transition duration-300 mx-1"
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className={`px-6 py-10 text-center font-semibold text-lg md:text-xl ${noBookingsTextColor}`}>
                    No bookings found. Time to book your luxurious escape!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Update Date Modal */}
      {isUpdateModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm z-50 p-4">
          <div className={`${updateModalOuterBg} p-1.5 rounded-2xl md:rounded-3xl shadow-2xl transform scale-95 opacity-0 animate-modal-enter`}>
            <div className={`${updateModalInnerBg} p-6 md:p-8 rounded-xl md:rounded-2xl shadow-inner border-2`}>
              <h2 className={`text-2xl md:text-3xl font-extrabold text-center mb-6 ${updateModalTitleColor}`}>Update Booking Date</h2>
              <DatePicker
                selected={newDate}
                onChange={(date) => setNewDate(date)}
                dateFormat="yyyy-MM-dd"
                className={datePickerInputClass}
                wrapperClassName={darkMode ? 'date-picker-dark' : 'date-picker-light'}
                minDate={new Date()} // Prevent booking past dates
                placeholderText="Select new date"
              />
              <div className="mt-6 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={() => { setIsUpdateModalOpen(false); setNewDate(null); }}
                  className={`px-5 py-2.5 md:px-6 md:py-3 text-sm md:text-base font-semibold rounded-lg shadow-lg hover:scale-105 transform transition-all duration-200 w-full sm:w-auto ${darkMode ? 'bg-gray-600 hover:bg-gray-500 text-white' : 'bg-gray-400 hover:bg-gray-500 text-black'}`}
                >
                  Cancel
                </button>
                <button
                  onClick={updateBookingDate}
                  disabled={!newDate}
                  className={`px-5 py-2.5 md:px-6 md:py-3 text-sm md:text-base bg-gradient-to-r from-green-400 to-teal-500 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transform transition-all duration-200 w-full sm:w-auto ${!newDate ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Save New Date
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ReviewModal needs to be theme-aware too. Pass darkMode prop or use context within it. */}
      <ReviewModal
        roomId={roomIdForReview}
        userEmail={user?.email} // Pass user email safely
        username={user?.displayName} // Pass username safely
        setIsReviewModalOpen={setIsReviewModalOpen}
        isReviewModalOpen={isReviewModalOpen}
        photoURL={user?.photoURL} // Pass photoURL safely
        // Pass darkMode or let ReviewModal consume ThemeContext
        // darkMode={darkMode}
        onReviewSubmitted={fetchData} // Optional: callback to refresh data after review
      />
    </div>
  );
};

export default MyBookings;