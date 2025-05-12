import React, { useEffect, useState, useContext } from "react"; // Import useContext
import axios from "axios";
import { ThemeContext } from "../context/ThemeProvider"; // Import ThemeContext

const GuestTestimonials = () => {
    const [reviews, setReviews] = useState([]);
    const [showAllReviews, setShowAllReviews] = useState(false);
    const { darkMode } = useContext(ThemeContext); // Get darkMode state

    useEffect(() => {
        axios
            .get("http://localhost:4000/reviews") // Ensure this endpoint is correct
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

    // Define conditional classes
    const sectionBgClass = darkMode
        ? "bg-gradient-to-r from-[#1a1a1d] to-[#4e4e50] text-white"
        : "bg-gray-100 text-black";

    const descriptionTextClass = darkMode ? "text-gray-400" : "text-gray-700";

    const reviewsContainerBgClass = darkMode
        ? "bg-gradient-to-r from-black to-gray-800 border-gold" // Assuming 'border-gold' is a custom class or defined in Tailwind config
        : "bg-white border-yellow-500"; // Or use 'border-gray-300' for a more subtle border in light mode

    const reviewsTitleClass = darkMode ? "text-white" : "text-black";

    const reviewCardBgClass = darkMode
        ? "bg-gradient-to-r from-gray-800 to-gray-900"
        : "bg-gray-50 border border-gray-200"; // Light background for individual reviews

    const reviewUsernameClass = darkMode ? "text-white" : "text-black";
    const reviewTimestampClass = darkMode ? "text-gray-400" : "text-gray-500";
    const reviewCommentClass = darkMode ? "text-gray-300" : "text-gray-700";
    const noReviewsTextClass = darkMode ? "text-gray-400" : "text-gray-600";

    // Assuming 'border-gold' is a custom class. If it's just 'border-yellow-500' or similar, adjust accordingly.
    // For this example, I'll assume border-gold means a specific gold color.
    const avatarBorderClass = darkMode ? "border-gold" : "border-yellow-500";

    // The button: 'from-gold' needs to be a defined color in your tailwind.config.js for gradients.
    // If 'gold' is e.g., 'yellow-500', then 'from-yellow-500'.
    // For simplicity, let's assume 'gold' refers to a specific shade like 'yellow-500' or 'amber-500'.
    // If 'gold' is a custom color name, ensure it's in your Tailwind theme.
    const seeMoreButtonClass = darkMode
        ? "bg-gradient-to-r from-yellow-500 to-yellow-600 text-black" // Example if 'gold' is yellow-500
        : "bg-yellow-500 hover:bg-yellow-600 text-black";


    return (
        <div className={`${sectionBgClass} p-12`}>
            {/* Section Title */}
            <h2 className="text-5xl lg:text-6xl text-center bg-gradient-to-r from-[#FFD700] to-[#FF8C00] text-transparent bg-clip-text font-bold mb-4">
                Guest Testimonials
            </h2>

            {/* Description */}
            <p className={`text-center text-lg ${descriptionTextClass} max-w-3xl mx-auto mb-8`}>
                Experience the stories of luxury and comfort as shared by our valued guests.
                Their testimonials reflect the elegance, exceptional service, and memorable
                experiences we provide. Explore their thoughts and let them inspire your next
                visit to our premium spaces.
            </p>

            {/* Testimonials List */}
            {/*
                Note on 'border-gold': If this is not a predefined Tailwind color or custom utility,
                it might not render. You might intend 'border-yellow-500' or similar.
                I'm using avatarBorderClass which conditionally sets it.
            */}
            <div
                className={`p-8 sm:p-12 mx-4 sm:mx-12 md:mx-24 ${reviewsContainerBgClass} shadow-xl rounded-xl transform transition-all duration-300 hover:scale-105 backdrop-blur-md border-2`}
            >
                <h3 className={`text-3xl sm:text-4xl font-semibold mb-6 ${reviewsTitleClass}`}>Room Reviews</h3>
                {reviews.length > 0 ? (
                    <div className="space-y-6">
                        {(showAllReviews ? reviews : reviews.slice(0, 3)).map((review) => (
                            <div
                                key={review._id}
                                className={`${reviewCardBgClass} p-6 rounded-lg shadow-lg`}
                            >
                                <div className="flex items-center space-x-4 mb-4">
                                    <img
                                        src={review.photoURL || `https://ui-avatars.com/api/?name=${review.username}&background=random`} // Fallback avatar
                                        alt={review.username}
                                        className={`w-12 h-12 rounded-full object-cover border-2 ${avatarBorderClass}`}
                                    />
                                    <div>
                                        <p className={`text-lg font-semibold ${reviewUsernameClass}`}>{review.username}</p>
                                        <p className={`text-sm ${reviewTimestampClass}`}>{new Date(review.timestamp).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <p className={`${reviewCommentClass} mb-2`}>"{review.comment}"</p>
                                <div className="flex items-center">
                                    {/* Assuming text-yellow-400 works for both modes for rating stars */}
                                    <span className="text-yellow-400 text-lg font-semibold mr-2">{review.rating}</span>
                                    <i className="fas fa-star text-yellow-400"></i> {/* Ensure Font Awesome is linked */}
                                </div>
                            </div>
                        ))}
                        {reviews.length > 3 && (
                            <button
                                onClick={() => setShowAllReviews(!showAllReviews)}
                                className={`mt-4 px-6 py-2 font-bold rounded-full hover:scale-105 transition-all ${seeMoreButtonClass}`}
                            >
                                {showAllReviews ? 'See Less' : 'See More'}
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