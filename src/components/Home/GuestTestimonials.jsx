import React, { useEffect, useState } from "react";
import axios from "axios";

const GuestTestimonials = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:4000/reviews") // Replace with your API endpoint
            .then((response) => {
                // Sort reviews in descending order by timestamp
                const sortedReviews = response.data.sort(
                    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
                );
                setReviews(sortedReviews); // Set sorted reviews
            })
            .catch((error) => {
                console.error("Error fetching reviews:", error);
            });
    }, []);

    return (
        <div className="bg-gradient-to-br from-black via-gray-900 to-gray-800 p-12">
            {/* Section Title */}
            <h2 className="text-5xl lg:text-6xl text-center bg-gradient-to-r from-[#FFD700] to-[#FF8C00] text-transparent bg-clip-text font-bold mb-4">
                Guest Testimonials
            </h2>

            {/* Description */}
            <p className="text-center text-lg text-gray-400 max-w-3xl mx-auto mb-8">
                Experience the stories of luxury and comfort as shared by our valued guests.
                Their testimonials reflect the elegance, exceptional service, and memorable
                experiences we provide. Explore their thoughts and let them inspire your next
                visit to our premium spaces.
            </p>

            {/* Testimonials List */}
            <div className="space-y-8">
                {reviews.length > 0 ? (
                    reviews.map((review, index) => (
                        <div
                            key={index}
                            className="bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white p-8 rounded-xl shadow-2xl border border-gray-700 transform transition duration-300 hover:scale-105"
                        >
                            {/* User Info */}
                            <div className="flex items-center mb-4">
                                <img
                                    src={review.photoURL || "https://via.placeholder.com/50"}
                                    alt="User Avatar"
                                    className="w-14 h-14 rounded-full border-2 border-gold-500 shadow-lg mr-4"
                                />
                                <div>
                                    <h4 className="text-2xl font-bold text-gold-400">
                                        {review.username}
                                    </h4>
                                    <p className="text-sm text-gray-500 italic">{review.timestamp}</p>
                                </div>
                            </div>

                            {/* Rating */}
                            <p className="text-yellow-400 text-lg mb-4">
                                {"⭐".repeat(review.rating)}
                            </p>

                            {/* Comment */}
                            <p className="text-gray-300 text-lg italic">{review.comment}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-400 italic text-xl">
                        No reviews available at the moment. Be the first to share your experience!
                    </p>
                )}
            </div>
        </div>
    );
};

export default GuestTestimonials;
