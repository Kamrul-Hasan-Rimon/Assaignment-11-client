import React, { useState, useEffect } from 'react';

const SpecialOffersModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Automatically open the modal on page load
    setIsModalOpen(true);
  }, []); // Runs only once when the component mounts

  return (
    <div>
      {/* Modal Structure */}
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h2 className="text-2xl font-bold mb-4">Special Offers and Promotions</h2>
            <img
              src="https://media.istockphoto.com/id/1408203038/photo/home-mockup-bedroom-interior-background-with-rattan-furniture-and-blank-wall-coastal-style.jpg?s=2048x2048&w=is&k=20&c=tIQuFQATCvwKkr65DuJeDd3CWZU0slpCcs6qODdJr_4="
              alt="Special Offer"
              className="w-full rounded-lg"
            />
            <p className="mt-4 text-lg">
              Check out our latest offers and discounts on delicious food!
            </p>
            <div className="modal-action">
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="btn bg-red-500 text-white py-2 px-4 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpecialOffersModal;
