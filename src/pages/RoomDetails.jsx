import React, { useContext, useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Base styles
import './DatePickerCustomStyles.css'; // Your custom styles for date picker theming
import Swal from "sweetalert2";
import { AuthContext } from "../components/context/AuthProvider"; // Check path
import { useAxiosSecure } from "../hook/useAxiosSecure";
import { ThemeContext } from "../components/context/ThemeProvider"; // Import ThemeContext

const RoomDetails = () => {
  const { user } = useContext(AuthContext);
  const { darkMode } = useContext(ThemeContext); // Get darkMode state
  const { id } = useParams();
  const room = useLoaderData();
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [reviews, setReviews] = useState([]);
  const myaxios = useAxiosSecure();

  // Fetch reviews
  useEffect(() => {
    if (room?._id) { // Check if room._id exists
      myaxios
        .get(`/reviews/${room._id}`)
        .then((response) => {
          setReviews(response.data);
        })
        .catch((error) => {
          console.error('Error fetching reviews:', error);
        });
    }
  }, [room?._id, myaxios]); // Add myaxios to dependencies

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleBookingConfirm = async (e) => {
    e.preventDefault();
    if (!selectedDate) {
      Swal.fire("Error", "Please select a booking date.", "error");
      return;
    }
    if (!user) {
      Swal.fire("Error", "Please log in to make a booking.", "error");
      // Optionally redirect to login
      return;
    }

    const guest = {
      name: user.displayName,
      email: user.email,
      photoUrl: user.photoURL
    };
    const roomImage = room.image;
    const roomName = room.name;
    const pricepernight = room.price;
    const bookingDate = selectedDate;
    const roomId = id;
    const bookingInfo = { guest, roomImage, roomName, pricepernight, bookingDate, roomId };

    try {
      // Simulate API call delay for feedback
      // await new Promise(resolve => setTimeout(resolve, 1000));
      const response = await myaxios.post(`/myRooms`, bookingInfo);

      // Assuming successful post means booking confirmed server-side
      Swal.fire({
        title: "Success!",
        text: `Booking Confirmed for ${room.name} on ${selectedDate.toLocaleDateString()}`,
        icon: "success",
      });
      setShowModal(false);
      setSelectedDate(null); // Reset date
      // Maybe refetch room data if availability changed
    } catch (error) {
      console.error("Booking error:", error.response || error.message);
      Swal.fire({
        title: "Booking Failed",
        text: error.response?.data?.message || "Could not complete the booking. The room might be unavailable on this date.",
        icon: "error",
      });
    }
  };

  // Conditional Classes
  const pageBgClass = darkMode ? "bg-gradient-to-r from-black to-gray-900 text-white" : "bg-gray-100 text-black";
  const heroTextColor = darkMode ? "text-white" : "text-gray-800"; // Base text for hero if not gradient
  const heroSubTextColor = darkMode ? "text-xl max-w-3xl leading-relaxed opacity-90" : "text-xl max-w-3xl leading-relaxed text-white";
  const priceColor = darkMode ? "text-yellow-400" : "text-yellow-600"; // Assuming 'text-gold' replacement
  const buttonBorderColor = darkMode ? "border-yellow-400" : "border-yellow-600"; // Assuming 'border-gold' replacement

  const sectionTitleColor = darkMode ? "text-yellow-400" : "text-yellow-600"; // For "Room Details" title

  const detailsContainerBase = "p-8 md:p-12 shadow-xl rounded-xl transform transition-all duration-300 hover:scale-105 backdrop-blur-md border-2";
  const detailsContainerTheme = darkMode
    ? `bg-gradient-to-r from-black to-gray-800 ${buttonBorderColor}`
    : `bg-white ${buttonBorderColor}`; // Using same border color, adjust if needed

  const detailsContainerTitleClass = darkMode ? "text-white" : "text-black";
  const detailsContainerTextClass = darkMode ? "text-gray-200" : "text-gray-700";

  const reviewCardBgClass = darkMode ? "bg-gradient-to-r from-gray-800 to-gray-900" : "bg-gray-50 border border-gray-200";
  const reviewUsernameClass = darkMode ? "text-white" : "text-black";
  const reviewTimestampClass = darkMode ? "text-gray-400" : "text-gray-500";
  const reviewCommentClass = darkMode ? "text-gray-300" : "text-gray-700";
  const reviewAvatarBorderClass = darkMode ? "border-yellow-400" : "border-yellow-600";
  const noReviewsTextClass = darkMode ? "text-gray-400" : "text-gray-600";
  const ratingStarColor = darkMode ? "text-yellow-400" : "text-yellow-500";

  const featuresSectionBg = darkMode ? "bg-gradient-to-r from-black to-gray-900" : "bg-gray-200"; // Slightly different bg for variety
  const featureTitleColor = darkMode ? "text-white" : "text-black";
  const featureTextColor = darkMode ? "text-gray-200" : "text-gray-600";

  const premiumSectionBg = darkMode ? "bg-gradient-to-r from-black to-gray-900" : "bg-white"; // White bg for premium in light mode
  const premiumParagraphColor = darkMode ? "text-gray-400" : "text-gray-600";

  // Modal styles
  const modalContainerBg = darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900";
  const modalTitleColor = darkMode ? "text-white" : "text-gray-800";
  const modalSubheadingColor = darkMode ? "text-gray-300" : "text-gray-600";
  const modalTextColor = darkMode ? "text-gray-200" : "text-gray-700";
  const datePickerInputClass = darkMode
    ? "mt-2 w-full border border-gray-600 rounded-lg p-2 bg-gray-700 text-white placeholder-gray-400"
    : "mt-2 w-full border border-gray-300 rounded-lg p-2 bg-white text-black placeholder-gray-500";


  // Render fallback if room data is not loaded
  if (!room) {
    return <div className={`min-h-screen flex items-center justify-center ${pageBgClass}`}>Loading room details...</div>;
  }

  return (
    <div className={`${pageBgClass} mt-[93px] font-luxury`}>
      {/* Hero Section */}
      <div className="relative h-[calc(100vh-93px)] min-h-[600px]"> {/* Adjusted height calculation */}
        <img
          src={room.image}
          alt={room.name}
          className="w-full h-full object-cover brightness-50"
        />
        <div className={`absolute inset-0 flex flex-col justify-center items-center text-center px-6 sm:px-10 ${heroTextColor}`}>
          {/* Using gradient for title, assuming it works on light bg */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-widest drop-shadow-lg bg-gradient-to-r from-yellow-400 via-emerald-500 to-teal-500 text-transparent bg-clip-text">
            {room.name}
          </h1>
          {/* Using specific text color for description */}
          <p className={`mt-6 ${heroSubTextColor}`}>
            {room.description}
          </p>
          <p className={`mt-8 sm:mt-10 text-4xl sm:text-5xl font-semibold ${priceColor} drop-shadow-2xl`}>
            ${room.price} <span className="text-xl sm:text-2xl font-light">/ night</span>
          </p>
          {room.isAvailable ? (
            <button
              className={`mt-10 sm:mt-12 px-10 sm:px-16 py-4 sm:py-6 bg-gradient-to-r from-emerald-500 to-teal-400 text-white text-base sm:text-lg font-bold rounded-full shadow-xl transition-all hover:scale-110 hover:bg-gradient-to-l hover:shadow-2xl border-4 ${buttonBorderColor}`}
              onClick={() => setShowModal(true)}
            >
              Book Now
            </button>
          ) : (
            <span className={`mt-10 sm:mt-12 px-8 py-4 text-base sm:text-lg font-semibold bg-red-600 rounded-full text-white shadow-xl border-2 ${buttonBorderColor}`}>
              Not Available
            </span>
          )}
        </div>
      </div>

      {/* Room Details Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-8">
        <div className="text-center">
          <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold ${sectionTitleColor} mb-8 tracking-wider`}>
            Room Details
          </h2>
        </div>
        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-start">
          {/* Description */}
          <div className={`${detailsContainerBase} ${detailsContainerTheme}`}>
            <h3 className={`text-3xl md:text-4xl font-semibold mb-6 ${detailsContainerTitleClass}`}>Description</h3>
            <p className={`text-base md:text-lg leading-relaxed ${detailsContainerTextClass}`}>{room.description}</p>
          </div>
          {/* Reviews */}
          <div className={`${detailsContainerBase} ${detailsContainerTheme}`}>
            <h3 className={`text-3xl md:text-4xl font-semibold mb-6 ${detailsContainerTitleClass}`}>Room Reviews</h3>
            {reviews.length > 0 ? (
              <div className="space-y-6 max-h-[400px] overflow-y-auto pr-4"> {/* Added scroll for many reviews */}
                {reviews.map((review) => (
                  <div
                    key={review._id}
                    className={`${reviewCardBgClass} p-5 md:p-6 rounded-lg shadow-lg`}
                  >
                    <div className="flex items-center space-x-4 mb-4">
                      <img
                        src={review.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(review.username)}&background=random`}
                        alt={review.username}
                        className={`w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 ${reviewAvatarBorderClass}`}
                      />
                      <div>
                        <p className={`text-base md:text-lg font-semibold ${reviewUsernameClass}`}>{review.username}</p>
                        <p className={`text-xs md:text-sm ${reviewTimestampClass}`}>{new Date(review.timestamp).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <p className={`${reviewCommentClass} text-sm md:text-base mb-2`}>"{review.comment}"</p>
                    <div className="flex items-center">
                      <span className={`${ratingStarColor} text-base md:text-lg font-semibold mr-2`}>{review.rating}</span>
                      <i className={`fas fa-star ${ratingStarColor}`}></i>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className={noReviewsTextClass}>No reviews yet. Be the first to review this room!</p>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className={`${featuresSectionBg} py-16 sm:py-20`}>
        <div className="max-w-7xl mx-auto text-center px-4 sm:px-8">
          {/* Assuming gradient title works */}
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-12 tracking-wide bg-gradient-to-r from-yellow-400 via-emerald-500 to-teal-500 text-transparent bg-clip-text">Features & Amenities</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {/* Feature Item Example (Repeat for others) */}
            <div className="text-center">
              {/* Assuming icon bg gradient works */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto flex items-center justify-center bg-gradient-to-r from-emerald-500 to-teal-400 text-white rounded-full text-3xl sm:text-4xl shadow-lg transform transition-all duration-300 hover:scale-110">
                <i className="fas fa-bed"></i>
              </div>
              <h4 className={`mt-6 text-2xl sm:text-3xl font-semibold ${featureTitleColor}`}>King-Sized Bed</h4>
              <p className={`mt-3 ${featureTextColor}`}>Luxurious comfort with premium bedding.</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto flex items-center justify-center bg-gradient-to-r from-emerald-500 to-teal-400 text-white rounded-full text-3xl sm:text-4xl shadow-lg transform transition-all duration-300 hover:scale-110">
                <i className="fas fa-tv"></i>
              </div>
              <h4 className={`mt-6 text-2xl sm:text-3xl font-semibold ${featureTitleColor}`}>4K Smart TV</h4>
              <p className={`mt-3 ${featureTextColor}`}>Endless entertainment options.</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto flex items-center justify-center bg-gradient-to-r from-emerald-500 to-teal-400 text-white rounded-full text-3xl sm:text-4xl shadow-lg transform transition-all duration-300 hover:scale-110">
                <i className="fas fa-spa"></i>
              </div>
              <h4 className={`mt-6 text-2xl sm:text-3xl font-semibold ${featureTitleColor}`}>Spa Bathroom</h4>
              <p className={`mt-3 ${featureTextColor}`}>Relax with premium toiletries and a soaking tub.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Experience Section */}
      <div className={`${premiumSectionBg} py-16 sm:py-20`}>
        <div className="max-w-7xl mx-auto text-center px-4 sm:px-8">
          {/* Assuming gradient title works */}
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-10 bg-gradient-to-r from-yellow-400 via-emerald-500 to-teal-500 text-transparent bg-clip-text tracking-wide">The Premium Experience</h2>
          <p className={`text-base md:text-lg max-w-3xl mx-auto ${premiumParagraphColor} leading-relaxed`}>
            Stay in the lap of luxury with world-class service, unmatched amenities, and an unforgettable ambiance.
          </p>
          <div className="grid lg:grid-cols-3 gap-12 mt-16">
            {/* Premium Item Example (Repeat for others) */}
            <div className="text-center">
              {/* Assuming icon bg gradient works */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto flex items-center justify-center bg-gradient-to-r from-yellow-400 to-yellow-500 text-black rounded-full text-3xl sm:text-4xl shadow-lg transform transition-all duration-300 hover:scale-110">
                <i className="fas fa-concierge-bell"></i>
              </div>
              <h4 className={`mt-6 text-2xl sm:text-3xl font-semibold ${featureTitleColor}`}>24/7 Concierge</h4>
              <p className={`mt-3 ${featureTextColor}`}>Personalized service at your fingertips.</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto flex items-center justify-center bg-gradient-to-r from-yellow-400 to-yellow-500 text-black rounded-full text-3xl sm:text-4xl shadow-lg transform transition-all duration-300 hover:scale-110">
                <i className="fas fa-utensils"></i>
              </div>
              <h4 className={`mt-6 text-2xl sm:text-3xl font-semibold ${featureTitleColor}`}>Gourmet Dining</h4>
              <p className={`mt-3 ${featureTextColor}`}>Culinary masterpieces by top chefs.</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto flex items-center justify-center bg-gradient-to-r from-yellow-400 to-yellow-500 text-black rounded-full text-3xl sm:text-4xl shadow-lg transform transition-all duration-300 hover:scale-110">
                <i className="fas fa-infinity"></i>
              </div>
              <h4 className={`mt-6 text-2xl sm:text-3xl font-semibold ${featureTitleColor}`}>Infinity Pool</h4>
              <p className={`mt-3 ${featureTextColor}`}>Swim with breathtaking panoramic views.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Booking */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 px-4">
          <div className={`${modalContainerBg} rounded-xl md:rounded-3xl shadow-2xl max-w-lg w-full p-6 sm:p-8 md:p-12 transform transition-all duration-300 scale-95 opacity-0 animate-modal-enter`}>
            <h2 className={`text-2xl md:text-3xl font-extrabold mb-6 ${modalTitleColor}`}>Booking Summary</h2>
            <div className="space-y-4">
              <div>
                <h3 className={`text-lg md:text-xl font-semibold ${modalSubheadingColor}`}>Room Name:</h3>
                <p className={`text-base md:text-lg ${modalTextColor}`}>{room.name}</p>
              </div>
              <div>
                <h3 className={`text-lg md:text-xl font-semibold ${modalSubheadingColor}`}>Price:</h3>
                <p className={`text-base md:text-lg ${modalTextColor}`}>${room.price} / night</p>
              </div>
              {/* Description might be too long for modal, consider omitting or shortening */}
              {/* <div>
                <h3 className={`text-lg md:text-xl font-semibold ${modalSubheadingColor}`}>Description:</h3>
                <p className={`text-sm md:text-base ${modalTextColor} line-clamp-2`}>{room.description}</p>
              </div> */}
              <div>
                <h3 className={`text-lg md:text-xl font-semibold ${modalSubheadingColor} mb-1`}>Select Booking Date:</h3>
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  className={datePickerInputClass} // Apply theme classes
                  wrapperClassName={darkMode ? 'date-picker-dark' : 'date-picker-light'} // Wrapper class for Popper styling
                  placeholderText="Select a date"
                  minDate={new Date()} // Prevent booking past dates
                />
              </div>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-3 bg-red-500 text-white rounded-lg font-semibold shadow hover:bg-red-600 transition-all order-2 sm:order-1 w-full sm:w-auto"
              >
                Cancel
              </button>
              <button
                onClick={handleBookingConfirm}
                disabled={!selectedDate} // Disable if no date selected
                className={`px-6 py-3 bg-emerald-500 text-white rounded-lg font-semibold shadow hover:bg-emerald-600 transition-all order-1 sm:order-2 w-full sm:w-auto ${!selectedDate ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomDetails;