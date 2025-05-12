import React, { useContext } from "react"; // Import useContext
import { Link } from "react-router-dom";

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import { ThemeContext } from "../context/ThemeProvider"; // Import ThemeContext

const featuredRoomsData = [ // Renamed to avoid conflict if 'featuredRooms' is used as a variable name
  {
    id: 1,
    name: "Presidential Suite",
    image: "https://media.istockphoto.com/id/2157251714/photo/a-spacious-modern-bedroom-interior-captured-in-a-realistic-photographic-style.jpg?s=2048x2048&w=is&k=20&c=BW5BkNsjHbNwHcjJEzrNi0EZ2YYMpf1cuPHHfCOcx9Q=",
    description: "Indulge in unparalleled opulence with a private infinity pool, marble interiors, and breathtaking city views.",
    price: "$1,200 / night",
    link: "/rooms/presidential-suite", // This link should ideally be used by the Link component
  },
  {
    id: 2,
    name: "Royal Deluxe",
    image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Timeless elegance meets modern sophistication. Perfect for those who deserve the extraordinary.",
    price: "$800 / night",
    link: "/rooms/royal-deluxe",
  },
  {
    id: 3,
    name: "Ocean View Suite",
    image: "https://media.istockphoto.com/id/1129076301/photo/chinese-style-bedroom-interior.jpg?s=2048x2048&w=is&k=20&c=DzYc3ul4URFHjJUlGhTTiTVuFFJG6O4GhphPHjZjSXA=",
    description: "Wake up to serene ocean waves and unwind in a suite designed for ultimate relaxation.",
    price: "$600 / night",
    link: "/rooms/ocean-view-suite",
  },
  {
    id: 4,
    name: "Luxury Double Room",
    image: "https://media.istockphoto.com/id/1195079657/photo/3d-rendering-beautiful-classic-orange-luxury-bedroom-suite-in-hotel-with-tv.jpg?s=2048x2048&w=is&k=20&c=-5Ics07DnwxMaCSi2PkmvzjKD5jsIgYSP7TaKUXzUeU=",
    description: "A spacious retreat with lush interiors and thoughtful amenities for a perfect getaway.",
    price: "$400 / night",
    link: "/rooms/luxury-double-room",
  },
  {
    id: 5,
    name: "Honeymoon Suite",
    image: "https://media.istockphoto.com/id/1284639146/photo/3d-rendering-beautiful-luxury-bedroom-suite-in-hotel-with-working-table-near-bathroom.jpg?s=2048x2048&w=is&k=20&c=l4jN8ZgNmSXjKQXfX0krFhUNBq4EEGT7ab_GdO-Nyh8=",
    description: "Celebrate love in style with a private jacuzzi, mood lighting, and bespoke services.",
    price: "$700 / night",
    link: "/rooms/honeymoon-suite",
  },
  {
    id: 6,
    name: "Executive Business Room",
    image: "https://media.istockphoto.com/id/495249934/photo/hotel-room-interior.jpg?s=2048x2048&w=is&k=20&c=6706Yf19DxLvMbg0Tbe3Ux4LfBHZ6OwncJuQpQGky9g=",
    description: "Designed for productivity, this room offers a serene workspace and premium facilities.",
    price: "$500 / night",
    link: "/rooms/business-room",
  },
];

const FeaturedRooms = () => {
  const { darkMode } = useContext(ThemeContext); // Get darkMode state

  const sectionClasses = darkMode
    ? "bg-gradient-to-r from-[#1a1a1d] to-[#4e4e50] text-white"
    : "bg-gray-100 text-black"; // Light mode: light gray background, black text

  const paragraphClasses = darkMode
    ? "text-gray-300" // Lighter text for dark background for the main description
    : "text-gray-700"; // Darker text for light background

  const cardBgClass = darkMode ? "bg-gray-800" : "bg-white";
  const cardTitleClass = darkMode
    ? "text-yellow-500 hover:text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-500"
    : "text-yellow-600 hover:text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600";
  const cardDescriptionClass = darkMode ? "text-gray-300" : "text-gray-600";

  const navButtonClasses = darkMode
    ? "bg-black bg-opacity-50 text-white hover:bg-opacity-80"
    : "bg-white bg-opacity-70 text-black border border-gray-300 hover:bg-gray-200";


  return (
    <section className={`featured-rooms py-20 ${sectionClasses}`}>
      <div className="container mx-auto px-6 lg:px-16">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl lg:text-6xl bg-gradient-to-r from-[#FFD700] to-[#FF8C00] text-transparent bg-clip-text font-bold mb-4">
            Featured Rooms
          </h2>
          <p className={`text-lg lg:text-xl max-w-3xl mx-auto ${paragraphClasses}`}>
            Discover our handpicked selection of luxurious rooms, offering the
            perfect blend of elegance, comfort, and sophistication.
          </p>
        </div>

        {/* Swiper Carousel */}
        <Swiper
          modules={[Navigation]}
          spaceBetween={30}
          // Responsive breakpoints
          breakpoints={{
            // when window width is >= 320px
            320: {
              slidesPerView: 1,
              spaceBetween: 20
            },
            // when window width is >= 768px
            768: {
              slidesPerView: 2,
              spaceBetween: 30
            },
            // when window width is >= 1024px
            1024: {
              slidesPerView: 3,
              spaceBetween: 30
            }
          }}
          navigation={{
            nextEl: ".custom-swiper-button-next",
            prevEl: ".custom-swiper-button-prev",
          }}
          loop={true}
          className="relative" // Keep relative for positioning nav buttons
        >
          {featuredRoomsData.map((room) => (
            <SwiperSlide key={room.id}>
              {/*
                The Link should wrap the whole card or specific interactive elements.
                If the whole card is a link, it's often better to use room.link
                instead of a generic "/rooms".
                For now, using the provided "/rooms".
              */}
              <Link to={room.link} className="block h-full">
                <div className={`room-card ${cardBgClass} shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col`}>
                  {/* Room Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={room.image}
                      alt={room.name}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105" // Use group-hover if Link is parent
                    />
                    {/*
                        The hover effect on the image and overlay can be tricky if the Link
                        is the direct parent. For simplicity, keeping hover:scale-105 on img.
                        If you want hover on card to scale image, Link needs to be parent
                        of the card div and use group-hover on img.
                      */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 hover:opacity-60 transition-opacity duration-500"></div>
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md">
                      {room.price}
                    </div>
                  </div>

                  {/* Room Details */}
                  <div className="p-6 flex-grow flex flex-col"> {/* flex-grow to push button down if added */}
                    <h3 className={`text-2xl font-semibold mb-3 transition duration-300 ${cardTitleClass}`}>
                      {room.name}
                    </h3>
                    <p className={`${cardDescriptionClass} mb-6 text-base lg:text-lg line-clamp-3 flex-grow`}>
                      {room.description}
                    </p>
                    {/* You could add a "View Details" button here if needed */}
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}

          {/* Custom Navigation Buttons */}
          <div className={`custom-swiper-button-prev absolute left-2 md:left-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full cursor-pointer transition ${navButtonClasses}`}>
            ❮
          </div>
          <div className={`custom-swiper-button-next absolute right-2 md:right-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full cursor-pointer transition ${navButtonClasses}`}>
            ❯
          </div>
        </Swiper>
      </div>
    </section>
  );
};

export default FeaturedRooms;