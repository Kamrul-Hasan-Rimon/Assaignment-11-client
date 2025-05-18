import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ThemeContext } from "../context/ThemeProvider";

const GuestTestimonials = () => {
    const [reviews, setReviews] = useState([]);
    const [showAllReviews, setShowAllReviews] = useState(false);
    const { darkMode } = useContext(ThemeContext);

    useEffect(() => {
        axios
            .get("https://modern-hotel-server.vercel.app/reviews ")
            .then((response) => {
                const sortedReviews = response.data.sort(
                    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
                );
                setReviews(sortedReviews);
            })
            .catch((error) => {
                console.error("Error fetching reviews:", error);
            });
    }, []);

    const sectionBgClass = darkMode
        ? "bg-gradient-to-r from-[#1a1a1d] to-[#4e4e50] text-white"
        : "bg-gray-100 text-black";

    const descriptionTextClass = darkMode ? "text-gray-400" : "text-gray-700";

    const reviewsContainerBgClass = darkMode
        ? "bg-gradient-to-r from-black to-gray-800 border-yellow-500"
        : "bg-white border-yellow-500";

    const reviewsTitleClass = darkMode ? "text-white" : "text-black";

    const reviewCardBgClass = darkMode
        ? "bg-gradient-to-r from-gray-800 to-gray-900"
        : "bg-gray-50 border border-gray-200";

    const reviewUsernameClass = darkMode ? "text-white" : "text-black";
    const reviewTimestampClass = darkMode ? "text-gray-400" : "text-gray-500";
    const reviewCommentClass = darkMode ? "text-gray-300" : "text-gray-700";
    const noReviewsTextClass = darkMode ? "text-gray-400" : "text-gray-600";

    const avatarBorderClass = darkMode ? "border-yellow-500" : "border-yellow-500";

    const seeMoreButtonClass = darkMode
        ? "bg-gradient-to-r from-yellow-500 to-yellow-600 text-black"
        : "bg-yellow-500 hover:bg-yellow-600 text-black";

    return (
        <div className={`${sectionBgClass} p-6 sm:p-12`}>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl text-center bg-gradient-to-r from-[#FFD700] to-[#FF8C00] text-transparent bg-clip-text font-bold mb-4">
                Guest Testimonials
            </h2>

            <p className={`text-center text-base sm:text-lg ${descriptionTextClass} max-w-3xl mx-auto mb-8`}>
                Experience the stories of luxury and comfort as shared by our valued guests.
                Their testimonials reflect the elegance, exceptional service, and memorable
                experiences we provide. Explore their thoughts and let them inspire your next
                visit to our premium spaces.
            </p>

            <div
                className={`p-6 sm:p-8 md:p-12 mx-4 sm:mx-8 md:mx-16 lg:mx-24 ${reviewsContainerBgClass} shadow-xl rounded-xl transform transition-all duration-300 hover:scale-105 backdrop-blur-md border-2`}
            >
                <h3 className={`text-2xl sm:text-3xl lg:text-4xl font-semibold mb-6 ${reviewsTitleClass}`}>
                    Room Reviews
                </h3>
                {reviews.length > 0 ? (
                    <div className="space-y-6">
                        {(showAllReviews ? reviews : reviews.slice(0, 3)).map((review) => (
                            <div
                                key={review._id}
                                className={`${reviewCardBgClass} p-4 sm:p-6 rounded-lg shadow-lg`}
                            >
                                <div className="flex items-center space-x-4 mb-4">
                                    <img
                                        src={review.photoURL || `https://ui-avatars.com/api/?name= ${review.username}&background=random`}
                                        alt={review.username}
                                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 ${avatarBorderClass}`}
                                    />
                                    <div>
                                        <p className={`text-base sm:text-lg font-semibold ${reviewUsernameClass}`}>
                                            {review.username}
                                        </p>
                                        <p className={`text-xs sm:text-sm ${reviewTimestampClass}`}>
                                            {new Date(review.timestamp).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                                <p className={`${reviewCommentClass} text-sm sm:text-base mb-2`}>
                                    "{review.comment}"
                                </p>
                                <div className="flex items-center">
                                    <span className="text-yellow-400 text-base sm:text-lg font-semibold mr-2">
                                        {review.rating}
                                    </span>
                                    <i className="fas fa-star text-yellow-400"></i>
                                </div>
                            </div>
                        ))}
                        {reviews.length > 3 && (
                            <button
                                onClick={() => setShowAllReviews(!showAllReviews)}
                                className={`mt-4 px-4 sm:px-6 py-2 sm:py-3 font-bold rounded-full hover:scale-105 transition-all ${seeMoreButtonClass}`}
                            >
                                {showAllReviews ? "See Less" : "See More"}
                            </button>
                        )}
                    </div>
                ) : (
                    <p className={noReviewsTextClass}>No reviews yet. Be the first to share your experience!</p>
                )}
            </div>
        </div>
    );
};

export default GuestTestimonials;