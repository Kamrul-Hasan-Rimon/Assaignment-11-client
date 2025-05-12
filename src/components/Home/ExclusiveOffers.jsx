import React, { useContext } from "react"; // Import useContext
import { ThemeContext } from "../context/ThemeProvider"; // Import ThemeContext

const exclusiveOffersData = [ // Renamed to avoid conflict
  {
    id: 1,
    title: "Romantic Escape Package",
    image: "https://media.istockphoto.com/id/1161539462/photo/hotel-room-interior-3d-illustration-photorealistic-rendering.jpg?s=2048x2048&w=is&k=20&c=c-ZstEq2BnAEMP49nJg65ocQbViL6sSAWL_-oZinCNA=",
    description:
      "Celebrate love with a romantic getaway, including a private dinner, spa treatments, and champagne on arrival.",
    price: "$1,200 / night",
    offer: "Save 20% this season",
  },
  {
    id: 2,
    title: "Weekend Getaway",
    image: "https://media.istockphoto.com/id/1408203038/photo/home-mockup-bedroom-interior-background-with-rattan-furniture-and-blank-wall-coastal-style.jpg?s=2048x2048&w=is&k=20&c=tIQuFQATCvwKkr65DuJeDd3CWZU0slpCcs6qODdJr_4=",
    description:
      "Enjoy a luxurious weekend escape with complimentary breakfast and late check-out.",
    price: "$900 / night",
    offer: "Book 2 nights, get 1 free",
  },
  {
    id: 3,
    title: "Family Retreat",
    image: "https://media.istockphoto.com/id/1219502740/photo/3d-rendering-modern-luxury-bedroom-suite-and-bathroom.jpg?s=2048x2048&w=is&k=20&c=N--8sKx5eWBdPUziThL8uhqpZOxMGVSAVwD_7r4XADE=",
    description:
      "Bring the family together in style with a spacious suite, kids' activities, and gourmet dining.",
    price: "$1,100 / night",
    offer: "Kids stay free!",
  },
];

const ExclusiveOffers = () => {
  const { darkMode } = useContext(ThemeContext); // Get darkMode state

  // Conditional classes based on theme
  const sectionClasses = darkMode
    ? "bg-gradient-to-r from-[#1a1a1d] to-[#4e4e50]" // Dark mode background
    : "bg-gray-100"; // Light mode background (e.g., light gray)

  const headerTextClass = darkMode ? "text-gray-300" : "text-gray-700";
  const cardBgClass = darkMode ? "bg-gray-900" : "bg-white border border-gray-200";
  const cardTitleClass = darkMode ? "text-white" : "text-gray-800"; // Darker text for light mode titles
  const cardDescriptionClass = darkMode ? "text-gray-400" : "text-gray-600";
  // Assuming 'text-gold' is defined globally and looks good on both light and dark.
  // If not, you might need a conditional class for it too.
  // For example: const priceTextClass = darkMode ? "text-gold" : "text-yellow-600";

  // The main title "Exclusive Offers" uses "text-gold". Let's assume this class is styled
  // to look good on both backgrounds or is a specific brand color.
  // If you want the gradient title like other sections:
  // const mainTitleClass = "text-6xl font-bold tracking-wide mb-6 bg-gradient-to-r from-[#FFD700] to-[#FF8C00] text-transparent bg-clip-text";
  // Otherwise, keep as "text-gold" and ensure it's styled appropriately.
  const mainTitleClass = "text-6xl font-bold tracking-wide mb-6 text-gold";


  return (
    <section className={`exclusive-offers py-24 ${sectionClasses}`}>
      <div className="container mx-auto px-8 lg:px-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className={mainTitleClass}>
            Exclusive Offers
          </h2>
          <p className={`text-xl max-w-2xl mx-auto ${headerTextClass}`}>
            Discover our exclusive packages, tailored for an unforgettable
            experience.
          </p>
        </div>

        {/* Offer Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {exclusiveOffersData.map((offer) => (
            <div
              key={offer.id}
              className={`offer-card ${cardBgClass} rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform flex flex-col`}
            >
              {/* Offer Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 hover:opacity-60 transition-opacity duration-500"></div>
                <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md">
                  {offer.offer}
                </div>
              </div>

              {/* Offer Details */}
              <div className="p-8 flex-grow">
                <h3 className={`text-3xl font-semibold mb-4 ${cardTitleClass}`}>
                  {offer.title}
                </h3>
                <p className={`text-lg mb-6 ${cardDescriptionClass}`}>{offer.description}</p>
              </div>

              {/* Price Section (Button was removed from original, kept structure) */}
              <div className="p-8 pt-0 mt-auto flex flex-col justify-between items-center">
                <span className="text-2xl text-gold mb-6 font-bold"> {/* Assuming text-gold works for both modes */}
                  {offer.price}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default ExclusiveOffers;