import React, { useState, useContext } from "react";
import "tailwindcss/tailwind.css"; // Ensure Tailwind CSS is applied
import ReactStars from "react-stars";
import Swal from "sweetalert2";
import { useAxiosSecure } from "../hook/useAxiosSecure";
import { ThemeContext } from "../components/context/ThemeProvider"; // Adjust path if necessary

const ReviewModal = ({
    roomId,
    userEmail,
    username,
    photoURL,
    isReviewModalOpen,
    setIsReviewModalOpen,
    onReviewSubmitted,
}) => {
    const { darkMode } = useContext(ThemeContext);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const myaxios = useAxiosSecure();

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const handleSubmitReview = () => {
        if (rating === 0 || !comment.trim()) {
            Swal.fire({
                icon: "warning",
                title: "Incomplete Review",
                text: "Please provide both a rating (at least 1 star) and a comment.",
                confirmButtonText: "Okay",
                background: darkMode ? '#1f2937' : '#f9fafb',
                color: darkMode ? '#f3f4f6' : '#1f2937',
                confirmButtonColor: darkMode ? "#FFD700" : "#F59E0B", // Gold / Amber
            });
            return;
        }

        const review = {
            roomId,
            userEmail,
            username,
            photoURL,
            rating,
            comment,
            timestamp: new Date().toISOString(),
        };

        myaxios
            .post("/reviews", review)
            .then((response) => {
                Swal.fire({
                    icon: "success",
                    title: "Review Submitted!",
                    text: response.data.message || "Thank you for your feedback!",
                    confirmButtonText: "Great!",
                    background: darkMode ? '#1f2937' : '#f9fafb',
                    color: darkMode ? '#f3f4f6' : '#1f2937',
                    confirmButtonColor: darkMode ? "#FFD700" : "#10B981", // Gold / Emerald
                });
                setIsReviewModalOpen(false);
                setRating(0);
                setComment("");
                if (onReviewSubmitted) {
                    onReviewSubmitted();
                }
            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "Submission Failed",
                    text: error.response?.data?.message || "Failed to submit your review. Please try again later.",
                    confirmButtonText: "Retry",
                    background: darkMode ? '#1f2937' : '#f9fafb',
                    color: darkMode ? '#f3f4f6' : '#1f2937',
                    confirmButtonColor: darkMode ? "#FF5733" : "#EF4444", // Red-ish
                });
                console.error("Error submitting review:", error);
            });
    };

    // Conditional Classes
    const modalOverlayBg = darkMode ? "bg-black bg-opacity-70" : "bg-gray-900 bg-opacity-50";
    const modalContainerBase = "rounded-xl md:rounded-2xl shadow-2xl p-6 md:p-8 max-w-lg w-full relative transform transition-all scale-95 opacity-0 animate-modal-enter";
    const modalContainerTheme = darkMode
        ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white"
        : "bg-white text-black";

    const closeButtonColor = darkMode ? "text-gray-400 hover:text-red-500" : "text-gray-500 hover:text-red-600";
    const titleGradientClass = "text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-500";
    const labelTextColor = darkMode ? "text-sm text-gray-400" : "text-sm text-gray-500";
    const valueTextColor = darkMode ? "text-base md:text-lg font-semibold text-gray-200" : "text-base md:text-lg font-semibold text-gray-800"; // Adjusted size
    const starActiveColor = darkMode ? "#FFD700" : "#FACC15"; // Gold / Yellow-400
    const textareaBase = "w-full p-3 md:p-4 rounded-lg focus:outline-none focus:ring-2";
    const textareaTheme = darkMode
        ? "border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:ring-yellow-500"
        : "border border-gray-300 bg-gray-50 text-black placeholder-gray-500 focus:ring-amber-500";
    const cancelButtonBase = "px-5 py-2.5 md:px-6 md:py-2 text-sm md:text-base rounded-lg shadow hover:shadow-md transition-colors duration-200"; // Adjusted size
    const cancelButtonTheme = darkMode
        ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
        : "bg-gray-200 text-gray-700 hover:bg-gray-300";
    const submitButtonClass = "px-5 py-2.5 md:px-6 md:py-2 text-sm md:text-base bg-gradient-to-r from-yellow-500 to-amber-600 text-black font-semibold rounded-lg shadow hover:shadow-xl transition duration-300"; // Adjusted size


    if (!isReviewModalOpen) {
        return null;
    }

    return (
        // Modal backdrop with centering
        <div className={`fixed inset-0 ${modalOverlayBg} flex items-center justify-center z-50 p-4`}>
            {/* Modal container with theme and animation */}
            <div className={`${modalContainerBase} ${modalContainerTheme}`}>
                {/* Close button */}
                <button
                    className={`absolute top-3 right-3 md:top-4 md:right-4 text-2xl ${closeButtonColor}`}
                    onClick={() => setIsReviewModalOpen(false)}
                    aria-label="Close review modal"
                >
                    × {/* HTML entity for 'x' */}
                </button>

                {/* Modal Title */}
                <h2 className={`text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-6 ${titleGradientClass}`}>
                    Share Your Experience
                </h2>

                {/* Optional User Info Display */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 mb-5 text-xs sm:text-sm">
                    <div>
                        <p className={labelTextColor}>Room ID:</p>
                        <p className={`${valueTextColor} truncate`}>{roomId}</p>
                    </div>
                    <div>
                        <p className={labelTextColor}>Your Email:</p>
                        <p className={`${valueTextColor} truncate`}>{userEmail}</p>
                    </div>
                </div>

                {/* Rating Input */}
                <div className="mb-5 text-center">
                    <p className={`${labelTextColor} mb-1`}>Rate Your Stay:</p>
                    <div className="flex justify-center">
                        <ReactStars
                            count={5}      // Number of stars
                            size={32}      // Size of stars (adjust as needed)
                            value={rating} // Current rating value
                            onChange={handleRatingChange} // Function to call on change
                            color2={starActiveColor} // Color of selected stars
                            half={false}   // Whether to allow half stars
                        />
                    </div>
                </div>

                {/* Comment Input */}
                <div className="mb-6">
                    <p className={`${labelTextColor} mb-1`}>Your Comment:</p>
                    <textarea
                        className={`${textareaBase} ${textareaTheme}`}
                        rows="4"
                        placeholder="Tell us about your experience..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 mt-8">
                    <button
                        onClick={() => setIsReviewModalOpen(false)}
                        className={`${cancelButtonBase} ${cancelButtonTheme}`}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmitReview}
                        className={submitButtonClass}
                    >
                        Submit Review
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReviewModal;