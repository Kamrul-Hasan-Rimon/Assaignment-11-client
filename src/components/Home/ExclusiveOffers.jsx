import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeProvider";

const exclusiveOffersData = [
  { id: 1, title: "Romantic Escape Package", image: "https://media.istockphoto.com/id/1161539462/photo/hotel-room-interior-3d-illustration-photorealistic-rendering.jpg?s=2048x2048&w=is&k=20&c=c-ZstEq2BnAEMP49nJg65ocQbViL6sSAWL_-oZinCNA=", description: "Celebrate love with a romantic getaway, including a private dinner, spa treatments, and champagne on arrival.", price: "$1,200 / night", offer: "Save 20%" },
  { id: 2, title: "Weekend Getaway", image: "https://media.istockphoto.com/id/1408203038/photo/home-mockup-bedroom-interior-background-with-rattan-furniture-and-blank-wall-coastal-style.jpg?s=2048x2048&w=is&k=20&c=tIQuFQATCvwKkr65DuJeDd3CWZU0slpCcs6qODdJr_4=", description: "Enjoy a luxurious weekend escape with complimentary breakfast and late check-out.", price: "$900 / night", offer: "Book 2, Get 1 Free" },
  { id: 3, title: "Family Retreat", image: "https://media.istockphoto.com/id/1219502740/photo/3d-rendering-modern-luxury-bedroom-suite-and-bathroom.jpg?s=2048x2048&w=is&k=20&c=N--8sKx5eWBdPUziThL8uhqpZOxMGVSAVwD_7r4XADE=", description: "Bring the family together in style with a spacious suite, kids' activities, and gourmet dining.", price: "$1,100 / night", offer: "Kids Stay Free!" },
];

const ExclusiveOffers = () => {
  const { darkMode } = useContext(ThemeContext);

  const sectionClasses = darkMode ? "bg-gradient-to-r from-[#1a1a1d] to-[#4e4e50]" : "bg-gray-100";
  const headerTextClass = darkMode ? "text-gray-300" : "text-gray-700";
  const cardBgClass = darkMode ? "bg-gray-900" : "bg-white border border-gray-200";
  const cardTitleClass = darkMode ? "text-white" : "text-gray-800";
  const cardDescriptionClass = darkMode ? "text-gray-400" : "text-gray-600";
  const priceTextClass = darkMode ? "text-yellow-400" : "text-amber-600";
  const mainTitleClass = "text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wide mb-3 md:mb-4";

  return (
    <section className={`exclusive-offers py-12 md:py-20 ${sectionClasses}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-16">
          <h2 className={`${mainTitleClass} ${darkMode ? 'text-yellow-400' : 'text-amber-600'}`}>
            Exclusive Offers
          </h2>
          {/* Subtitle Start */}
          <p className={`text-sm sm:text-base max-w-lg mx-auto ${headerTextClass} mb-6 md:mb-8`}>
            Unlock special savings and unique experiences with our curated offers.
            Designed to make your luxury stay even more memorable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
          {exclusiveOffersData.map((offer) => (
            <div
              key={offer.id}
              className={`offer-card ${cardBgClass} rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex flex-col group`}
            >
              <div className="relative aspect-w-16 aspect-h-9">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-md">
                  {offer.offer}
                </div>
              </div>

              <div className="p-4 sm:p-6 lg:p-8 flex-grow">
                <h3 className={`text-xl sm:text-2xl lg:text-3xl font-semibold mb-2 sm:mb-4 ${cardTitleClass}`}>
                  {offer.title}
                </h3>
                <p className={`${cardDescriptionClass} text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 line-clamp-3 sm:line-clamp-4`}>
                  {offer.description}
                </p>
              </div>

              <div className="p-4 sm:p-6 pt-0 mt-auto flex flex-col items-center">
                <span className={`text-lg sm:text-xl lg:text-2xl ${priceTextClass} mb-2 sm:mb-4 font-bold`}>
                  {offer.price}
                </span>
                <button className={`w-full sm:w-auto px-4 py-2 text-sm sm:text-base rounded-lg font-semibold transition-colors duration-200 ${darkMode ? 'bg-yellow-500 hover:bg-yellow-600 text-black' : 'bg-amber-500 hover:bg-amber-600 text-white'}`}>
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExclusiveOffers;