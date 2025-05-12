import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { ThemeContext } from "../context/ThemeProvider";

const featuredRoomsData = [
  { id: 1, name: "Presidential Suite", image: "https://media.istockphoto.com/id/2157251714/photo/a-spacious-modern-bedroom-interior-captured-in-a-realistic-photographic-style.jpg?s=2048x2048&w=is&k=20&c=BW5BkNsjHbNwHcjJEzrNi0EZ2YYMpf1cuPHHfCOcx9Q=", description: "Indulge in unparalleled opulence with a private infinity pool, marble interiors, and breathtaking city views.", price: "$1,200 / night", link: "/rooms/presidential-suite" },
  { id: 2, name: "Royal Deluxe", image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: "Timeless elegance meets modern sophistication. Perfect for those who deserve the extraordinary.", price: "$800 / night", link: "/rooms/royal-deluxe" },
  { id: 3, name: "Ocean View Suite", image: "https://media.istockphoto.com/id/1129076301/photo/chinese-style-bedroom-interior.jpg?s=2048x2048&w=is&k=20&c=DzYc3ul4URFHjJUlGhTTiTVuFFJG6O4GhphPHjZjSXA=", description: "Wake up to serene ocean waves and unwind in a suite designed for ultimate relaxation.", price: "$600 / night", link: "/rooms/ocean-view-suite" },
  { id: 4, name: "Luxury Double Room", image: "https://media.istockphoto.com/id/1195079657/photo/3d-rendering-beautiful-classic-orange-luxury-bedroom-suite-in-hotel-with-tv.jpg?s=2048x2048&w=is&k=20&c=-5Ics07DnwxMaCSi2PkmvzjKD5jsIgYSP7TaKUXzUeU=", description: "A spacious retreat with lush interiors and thoughtful amenities for a perfect getaway.", price: "$400 / night", link: "/rooms/luxury-double-room" },
];


const FeaturedRooms = () => {
  const { darkMode } = useContext(ThemeContext);

  const sectionClasses = darkMode ? "bg-gradient-to-r from-[#1a1a1d] to-[#4e4e50] text-white" : "bg-gray-100 text-black";
  const paragraphClasses = darkMode ? "text-gray-300" : "text-gray-700";
  const cardBgClass = darkMode ? "bg-gray-800" : "bg-white";
  const cardTitleClass = darkMode ? "text-yellow-500 group-hover:text-yellow-400" : "text-yellow-600 group-hover:text-yellow-500";
  const cardDescriptionClass = darkMode ? "text-gray-300" : "text-gray-600";
  const navButtonClasses = darkMode
    ? "bg-black bg-opacity-50 text-white hover:bg-opacity-70"
    : "bg-white bg-opacity-80 text-black border border-gray-300 hover:bg-gray-200 shadow-md";

  return (
    <section className={`featured-rooms py-12 md:py-20 ${sectionClasses}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl bg-gradient-to-r from-[#FFD700] to-[#FF8C00] text-transparent bg-clip-text font-bold mb-3 md:mb-4">
            Featured Rooms
          </h2>
          {/* Subtitle Start */}
          <p className={`text-sm sm:text-base max-w-lg mx-auto ${paragraphClasses} mb-6 md:mb-8`}>
            Explore our most sought-after accommodations, each offering a unique blend of comfort and style.
            Perfect for an unforgettable luxury experience.
          </p>
        </div>

        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          navigation={{
            nextEl: ".custom-swiper-button-next-ft",
            prevEl: ".custom-swiper-button-prev-ft",
          }}
          pagination={{ clickable: true }}
          loop={true}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 30 },
          }}
          className="relative pb-10 md:pb-12"
        >
          {featuredRoomsData.map((room) => (
            <SwiperSlide key={room.id} className="h-auto">
              <Link to={room.link || `/rooms/${room.id}`} className="block h-full group">
                <div className={`room-card ${cardBgClass} shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col`}>
                  <div className="relative overflow-hidden aspect-w-16 aspect-h-9 sm:aspect-h-10">
                    <img
                      src={room.image}
                      alt={room.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-md">
                      {room.price}
                    </div>
                  </div>
                  <div className="p-4 sm:p-6 flex-grow flex flex-col">
                    <h3 className={`text-xl sm:text-2xl font-semibold mb-2 transition duration-300 ${cardTitleClass}`}>
                      {room.name}
                    </h3>
                    <p className={`${cardDescriptionClass} text-sm sm:text-base line-clamp-3 flex-grow mb-4`}>
                      {room.description}
                    </p>
                    <div className="mt-auto text-right">
                      <span className={`text-xs sm:text-sm font-medium ${darkMode ? "text-yellow-400 hover:text-yellow-300" : "text-orange-500 hover:text-orange-600"}`}>
                        View Details →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
          <div className={`custom-swiper-button-prev-ft absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 rounded-full cursor-pointer transition ${navButtonClasses} hidden sm:block`}>❮</div>
          <div className={`custom-swiper-button-next-ft absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 rounded-full cursor-pointer transition ${navButtonClasses} hidden sm:block`}>❯</div>
        </Swiper>
      </div>
    </section>
  );
};

export default FeaturedRooms;