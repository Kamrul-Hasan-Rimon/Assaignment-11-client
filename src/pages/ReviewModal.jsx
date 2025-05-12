import React, { useState, useContext } from "react"; // Import useContext
import "tailwindcss/tailwind.css"; // Ensure Tailwind CSS is applied
import ReactStars from "react-stars";
import Swal from "sweetalert2";
import { useAxiosSecure } from "../hook/useAxiosSecure";
import { ThemeContext } from "../components/context/ThemeProvider"; // Adjust path if necessary

const ReviewModal = ({
    roomId,
    userEmail,
    username,
    photoURL, // photoURL was passed but not displayed, can be added if needed
    isReviewModalOpen,
    setIsReviewModalOpen,
    onReviewSubmitted, // Callback for when review is submitted
}) => {
    const { darkMode } = useContext(ThemeContext); // Get darkMode state
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    // Timestamp is generated when submitting, or you can display a live one if needed
    // For simplicity, it's generated on submit.
    const myaxios = useAxiosSecure();

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const handleSubmitReview = () => {
        if (rating === 0 || !comment.trim()) { // Check if rating is 0
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
            photoURL, // Send photoURL to backend
            rating,
            comment,
            timestamp: new Date().toISOString(), // Use ISO string for consistency
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
                setRating(0); // Reset form
                setComment(""); // Reset form
                if (onReviewSubmitted) {
                    onReviewSubmitted(); // Call callback if provided
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
    const modalOverlayBg = darkMode ? "bg-black bg-opacity-70" : "bg-gray-900 bg-opacity-50"; // Darker overlay for light mode
    const modalContainerBase = "rounded-xl md:rounded-2xl shadow-2xl p-6 md:p-8 max-w-lg w-full relative transform transition-all scale-95 opacity-0 animate-modal-enter";
    const modalContainerTheme = darkMode
        ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white"
        : "bg-white text-black";

    const closeButtonColor = darkMode ? "text-gray-400 hover:text-red-500" : "text-gray-500 hover:text-red-600";
    // Title gradient "from-gold to-yellow-500" might work on both, let's assume 'gold' is yellow-400
    const titleGradientClass = "text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-500";

    const labelTextColor = darkMode ? "text-sm text-gray-400" : "text-sm text-gray-500";
    const valueTextColor = darkMode ? "text-lg font-semibold text-gray-200" : "text-lg font-semibold text-gray-800";

    // ReactStars activeColor (gold for stars) should be fine for both modes.
    const starActiveColor = darkMode ? "#FFD700" : "#FACC15"; // Gold / Yellow-400

    const textareaBase = "w-full p-3 md:p-4 rounded-lg focus:outline-none focus:ring-2";
    const textareaTheme = darkMode
        ? "border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:ring-yellow-500"
        : "border border-gray-300 bg-gray-50 text-black placeholder-gray-500 focus:ring-amber-500";

    const cancelButtonBase = "px-5 py-2.5 md:px-6 md:py-2 rounded-lg shadow hover:shadow-md transition-colors duration-200";
    const cancelButtonTheme = darkMode
        ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
        : "bg-gray-200 text-gray-700 hover:bg-gray-300";

    // Submit button gradient "from-yellow-500 to-yellow-700 text-black" should work for both
    const submitButtonClass = "px-5 py-2.5 md:px-6 md:py-2 bg-gradient-to-r from-yellow-500 to-amber-600 text-black font-semibold rounded-lg shadow hover:shadow-xl transition duration-300";

    if (!isReviewModalOpen) {
        return null;
    }

    return (
        <div className={`fixed inset-0 ${modalOverlayBg} flex items-center justify-center z-50 p-4`}>
            <div className={`${modalContainerBase} ${modalContainerTheme}`}>
                <button
                    className={`absolute top-3 right-3 md:top-4 md:right-4 text-2xl ${closeButtonColor}`}
                    onClick={() => setIsReviewModalOpen(false)}
                    aria-label="Close review modal"
                >
                    ×
                </button>

                <h2 className={`text-3xl md:text-4xl font-extrabold text-center mb-6 ${titleGradientClass}`}>
                    Share Your Experience
                </h2>

                {/* User Info Section - Consider if all these are necessary to display */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 mb-4 text-xs sm:text-sm">
                    <div>
                        <p className={labelTextColor}>Room ID:</p>
                        <p className={`${valueTextColor} truncate`}>{roomId}</p>
                    </div>
                    <div>
                        <p className={labelTextColor}>Your Email:</p>
                        <p className={`${valueTextColor} truncate`}>{userEmail}</p>
                    </div>
                    {/* Username might be redundant if displayed in AuthProvider/Navbar */}
                    {/* <div>
                        <p className={labelTextColor}>Username:</p>
                        <p className={valueTextColor}>{username}</p>
                    </div> */}
                </div>


                <div className="mb-5 text-center">
                    <p className={`${labelTextColor} mb-1`}>Rate Your Stay:</p>
                    <div className="flex justify-center">
                        <ReactStars
                            count={5}
                            size={36} // Slightly smaller for better fit
                            value={rating}
                            onChange={handleRatingChange}
                            color2={starActiveColor} // activeColor equivalent
                            half={false} // react-stars uses 'half', not 'isHalf'
                        // edit={true} // Ensure it's editable
                        />
                    </div>
                </div>

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

                {/* Timestamp display might be optional as it's set on submission */}
                {/* <div className="mb-4">
                    <p className={labelTextColor}>Current Time:</p>
                    <p className={valueTextColor}>{new Date().toLocaleString()}</p>
                </div> */}

                <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 mt-8">
                    <button
                        onClick={() => {
                            setIsReviewModalOpen(false);
                            // Optionally reset form fields here if desired on manual close
                            // setRating(0);
                            // setComment("");
                        }}
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