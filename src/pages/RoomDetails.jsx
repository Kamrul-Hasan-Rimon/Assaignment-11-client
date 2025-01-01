import React, { useContext, useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { AuthContext } from "../components/context/AuthProvider";
import axios from "axios";

const RoomDetails = () => {
  const { user } = useContext(AuthContext)
  const {id} = useParams()

  const room = useLoaderData();
  console.log(room)
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [reviews, setReviews] = useState([]);

  // Fetch reviews using Axios
  useEffect(() => {
    axios
      .get(`http://localhost:4000/reviews/${room._id}`)
      .then((response) => {
        setReviews(response.data); // Set reviews in state
      })
      .catch((error) => {
        console.error('Error fetching reviews:', error);
      });
  }, [room._id]);
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleBookingConfirm = async (e) => {
    e.preventDefault()
    const guest = {
      name: user.displayName,
      email: user.email,
      photoUrl: user.photoURL
    }
    const roomImage = room.image
    const roomName = room.name
    const pricepernight = room.price
    const bookingDate = selectedDate
    const roomId = id
    const bookingInfo = { guest, roomImage, roomName, pricepernight, bookingDate, roomId }
    console.log(bookingInfo)

    Swal.fire({
      title: "Success!",
      text: `Booking Confirmed for ${room.name} on ${selectedDate}`,
      icon: "success",
    });
    setShowModal(false);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API}/myRooms`, bookingInfo);
      console.log(response);
    } catch (error) {
      console.error(error.response || error.message);
      Swal.fire({
        title: "Error",
        text: error.response?.data?.message || error.message,
        icon: "error",
      });
    }
  }

  return (
    <div className="bg-gradient-to-r from-black to-gray-900 mt-[93px] font-luxury mt-[93px] text-white">
      {/* Hero Section */}
      <div className="relative h-screen">
        <img
          src={room.image}
          alt={room.name}
          className="w-full h-full object-cover brightness-50"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-10 text-white">
          <h1 className="text-7xl font-extrabold uppercase tracking-widest drop-shadow-lg text-gradient-to-r from-gold via-emerald-500 to-teal-500">
            {room.name}
          </h1>
          <p className="mt-6 text-xl max-w-3xl leading-relaxed opacity-90 text-gradient-to-r from-emerald-500 to-teal-400">
            {room.description}
          </p>
          <p className="mt-10 text-5xl font-semibold text-gold drop-shadow-2xl">
            ${room.price} <span className="text-2xl font-light">/ night</span>
          </p>
          {room.isAvailable ? (
            <button
              className="mt-12 px-16 py-6 bg-gradient-to-r from-emerald-500 to-teal-400 text-white text-lg font-bold rounded-full shadow-xl transition-all hover:scale-110 hover:bg-gradient-to-l hover:shadow-2xl border-4 border-gold"
              onClick={() => setShowModal(true)}
            >
              Book Now
            </button>
          ) : (
            <span className="mt-12 px-8 py-4 text-lg font-semibold bg-red-700 rounded-full text-white shadow-xl border-2 border-gold">
              Not Available
            </span>
          )}
        </div>
      </div>

      {/* Room Details Section */}
      <div className="max-w-7xl mx-auto py-16 px-8">
        <div className="text-center">
          <h2 className="text-6xl font-extrabold text-gold mb-8 tracking-wider">
            Room Details
          </h2>
        </div>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Description */}
          <div className="p-12 bg-gradient-to-r from-black to-gray-800 shadow-xl rounded-xl transform transition-all duration-300 hover:scale-105 backdrop-blur-md border-2 border-gold">
            <h3 className="text-4xl font-semibold mb-6 text-white">Description</h3>
            <p className="text-lg text-gray-200 leading-relaxed">{room.description}</p>
          </div>
          {/* Reviews */}
          <div>
            <h2>Room Reviews</h2>
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review._id}>
                  <p>
                    <strong>{review.username}</strong>: {review.comment}
                  </p>
                  <p>Rating: {review.rating}/5</p>
                  <p>Date: {new Date(review.timestamp).toLocaleString()}</p>
                </div>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gradient-to-r from-black to-gray-900 py-20 text-white">
        <div className="max-w-7xl mx-auto text-center px-8">
          <h2 className="text-5xl font-extrabold mb-12 tracking-wide text-gradient-to-r from-gold via-emerald-500 to-teal-500">Features & Amenities</h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto flex items-center justify-center bg-gradient-to-r from-emerald-500 to-teal-400 text-white rounded-full text-4xl shadow-lg transform transition-all duration-300 hover:scale-110">
                <i className="fas fa-bed"></i>
              </div>
              <h4 className="mt-6 text-3xl font-semibold text-white">King-Sized Bed</h4>
              <p className="mt-3 text-gray-200">Luxurious comfort with premium bedding.</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 mx-auto flex items-center justify-center bg-gradient-to-r from-emerald-500 to-teal-400 text-white rounded-full text-4xl shadow-lg transform transition-all duration-300 hover:scale-110">
                <i className="fas fa-tv"></i>
              </div>
              <h4 className="mt-6 text-3xl font-semibold text-white">4K Smart TV</h4>
              <p className="mt-3 text-gray-200">Endless entertainment options.</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 mx-auto flex items-center justify-center bg-gradient-to-r from-emerald-500 to-teal-400 text-white rounded-full text-4xl shadow-lg transform transition-all duration-300 hover:scale-110">
                <i className="fas fa-spa"></i>
              </div>
              <h4 className="mt-6 text-3xl font-semibold text-white">Spa Bathroom</h4>
              <p className="mt-3 text-gray-200">Relax with premium toiletries and a soaking tub.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Experience Section */}
      <div className="bg-gradient-to-r from-black to-gray-900 py-20">
        <div className="max-w-7xl mx-auto text-center px-8">
          <h2 className="text-5xl font-extrabold mb-10 text-gradient-to-r from-gold via-emerald-500 to-teal-500 tracking-wide">The Premium Experience</h2>
          <p className="text-lg max-w-3xl mx-auto text-gray-400 leading-relaxed">
            Stay in the lap of luxury with world-class service, unmatched amenities, and an unforgettable ambiance.
          </p>
          <div className="grid lg:grid-cols-3 gap-12 mt-16">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto flex items-center justify-center bg-gradient-to-r from-gold to-yellow-500 text-black rounded-full text-4xl shadow-lg transform transition-all duration-300 hover:scale-110">
                <i className="fas fa-concierge-bell"></i>
              </div>
              <h4 className="mt-6 text-3xl font-semibold text-white">24/7 Concierge</h4>
              <p className="mt-3 text-gray-200">Personalized service at your fingertips.</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 mx-auto flex items-center justify-center bg-gradient-to-r from-gold to-yellow-500 text-black rounded-full text-4xl shadow-lg transform transition-all duration-300 hover:scale-110">
                <i className="fas fa-utensils"></i>
              </div>
              <h4 className="mt-6 text-3xl font-semibold text-white">Gourmet Dining</h4>
              <p className="mt-3 text-gray-200">Culinary masterpieces by top chefs.</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 mx-auto flex items-center justify-center bg-gradient-to-r from-gold to-yellow-500 text-black rounded-full text-4xl shadow-lg transform transition-all duration-300 hover:scale-110">
                <i className="fas fa-infinity"></i>
              </div>
              <h4 className="mt-6 text-3xl font-semibold text-white">Infinity Pool</h4>
              <p className="mt-3 text-gray-200">Swim with breathtaking panoramic views.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Booking */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full p-12 text-gray-900 transform transition-all duration-300 hover:scale-105">
            <h2 className="text-3xl font-extrabold mb-6 text-gray-800">Booking Summary</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-600">Room Name:</h3>
                <p className="text-lg text-gray-700">{room.name}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-600">Price:</h3>
                <p className="text-lg text-gray-700">${room.price} / night</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-600">Description:</h3>
                <p className="text-lg text-gray-700">{room.description}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-600">Select Booking Date:</h3>
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  className="mt-2 w-full border border-gray-300 rounded-lg p-2"
                  placeholderText="Select a date"
                  minDate={new Date()}
                />
              </div>
            </div>
            <div className="mt-8 flex justify-between">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-3 bg-red-500 text-white rounded-lg font-semibold shadow hover:bg-red-700 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleBookingConfirm}
                className="px-6 py-3 bg-emerald-500 text-white rounded-lg font-semibold shadow hover:bg-emerald-700 transition-all"
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
