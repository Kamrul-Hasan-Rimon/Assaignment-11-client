import React, { useState, useEffect } from 'react';

const SpecialOffersModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  return (
    <div>
      {isModalOpen && (
        <div className="modal modal-open fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="modal-box bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white rounded-3xl shadow-2xl border border-gold p-8 max-w-lg">
            <h2 className="text-4xl font-bold text-gold mb-6 text-center tracking-widest">
              Exclusive Offers
            </h2>
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <img
                src="https://media.istockphoto.com/id/1408203038/photo/home-mockup-bedroom-interior-background-with-rattan-furniture-and-blank-wall-coastal-style.jpg?s=2048x2048&w=is&k=20&c=tIQuFQATCvwKkr65DuJeDd3CWZU0slpCcs6qODdJr_4="
                alt="Special Offer"
                className="w-full h-60 object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <p className="mt-6 text-lg leading-relaxed text-center text-gray-300">
              Indulge in our exclusive promotions and enjoy luxurious offers tailored just for you.
            </p>
            <div className="modal-action flex justify-center mt-8">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-800 text-white text-lg font-semibold rounded-full shadow-lg hover:from-red-700 hover:to-red-900 transition-all duration-300"
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
