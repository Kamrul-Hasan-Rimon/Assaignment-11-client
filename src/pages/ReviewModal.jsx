import React, { useState } from "react";
import "tailwindcss/tailwind.css"; // Ensure Tailwind CSS is applied
import ReactStars from "react-stars"; // Import react-rating-stars-component
import axios from "axios";
import Swal from "sweetalert2";

const ReviewModal = ({
    roomId,
    userEmail,
    username,
    isReviewModalOpen,
    setIsReviewModalOpen,
}) => {
    const [rating, setRating] = useState(0); // State for rating
    const [comment, setComment] = useState(""); // State for comment
    const timestamp = new Date().toLocaleString(); // Generate current timestamp

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    } // Handle rating change




    const handleSubmitReview = () => {
        if (!rating || !comment.trim()) {
            Swal.fire({
                icon: "warning",
                title: "Incomplete Review",
                text: "Please provide both a rating and a comment before submitting.",
                confirmButtonText: "Okay",
                confirmButtonColor: "#FFD700",
            });
            return;
        }

        const review = {
            roomId,
            userEmail,
            username,
            rating,
            comment,
            timestamp,
        };

        // Submit review via Axios
        axios
            .post("http://localhost:4000/reviews", review)
            .then((response) => {
                Swal.fire({
                    icon: "success",
                    title: "Review Submitted!",
                    text: response.data.message,
                    confirmButtonText: "Great!",
                    confirmButtonColor: "#FFD700",
                });
                setIsReviewModalOpen(false);
            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "Submission Failed",
                    text: "Failed to submit your review. Please try again later.",
                    confirmButtonText: "Retry",
                    confirmButtonColor: "#FF5733",
                });
                console.error("Error submitting review:", error);
            });
    };



    return (
        <>
            {isReviewModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white rounded-2xl shadow-2xl p-8 max-w-lg w-full relative">
                        <button
                            className="absolute top-4 right-4 text-gray-300 hover:text-red-500 text-2xl"
                            onClick={() => setIsReviewModalOpen(false)}
                        >
                            &times;
                        </button>

                        <h2 className="text-4xl font-extrabold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-gold to-yellow-500">
                            Share Your Experience
                        </h2>

                        <div className="mb-4">
                            <p className="text-sm text-gray-400">Room ID:</p>
                            <p className="text-lg font-semibold">{roomId}</p>
                        </div>

                        <div className="mb-4">
                            <p className="text-sm text-gray-400">User Email:</p>
                            <p className="text-lg font-semibold">{userEmail}</p>
                        </div>

                        <div className="mb-4">
                            <p className="text-sm text-gray-400">Username:</p>
                            <p className="text-lg font-semibold">{username}</p>
                        </div>

                        <div className="mb-6">
                            <p className="text-sm text-gray-400">Rate Your Stay:</p>
                            <ReactStars
                                count={5}
                                size={40}
                                value={rating}
                                onChange={handleRatingChange}
                                activeColor="#FFD700" // Gold color for selected stars
                                isHalf={false}
                            />
                        </div>

                        <div className="mb-6">
                            <p className="text-sm text-gray-400">Comment:</p>
                            <textarea
                                className="w-full border border-gray-600 bg-transparent text-white p-4 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                                rows="4"
                                placeholder="Write your comment here..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            ></textarea>
                        </div>

                        <div className="mb-4">
                            <p className="text-sm text-gray-400">Timestamp:</p>
                            <p className="text-lg font-semibold">{timestamp}</p>
                        </div>

                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setIsReviewModalOpen(false)}
                                className="px-6 py-2 bg-gray-700 text-gray-300 rounded-lg shadow hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmitReview}
                                className="px-6 py-2 bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-semibold rounded-lg shadow hover:shadow-xl transition duration-300"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}


        </>

    );
};

export default ReviewModal;
