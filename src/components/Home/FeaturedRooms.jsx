import React from "react";
const featuredRooms = [
  {
    id: 1,
    name: "Presidential Suite",
    image: "https://media.istockphoto.com/id/2157251714/photo/a-spacious-modern-bedroom-interior-captured-in-a-realistic-photographic-style.jpg?s=2048x2048&w=is&k=20&c=BW5BkNsjHbNwHcjJEzrNi0EZ2YYMpf1cuPHHfCOcx9Q=",
    description:
      "Indulge in unparalleled opulence with a private infinity pool, marble interiors, and breathtaking city views.",
    price: "$1,200 / night",
    link: "/rooms/presidential-suite",
  },
  {
    id: 2,
    name: "Royal Deluxe",
    image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Timeless elegance meets modern sophistication. Perfect for those who deserve the extraordinary.",
    price: "$800 / night",
    link: "/rooms/royal-deluxe",
  },
  {
    id: 3,
    name: "Ocean View Suite",
    image: "https://media.istockphoto.com/id/1129076301/photo/chinese-style-bedroom-interior.jpg?s=2048x2048&w=is&k=20&c=DzYc3ul4URFHjJUlGhTTiTVuFFJG6O4GhphPHjZjSXA=",
    description:
      "Wake up to serene ocean waves and unwind in a suite designed for ultimate relaxation.",
    price: "$600 / night",
    link: "/rooms/ocean-view-suite",
  },
  {
    id: 4,
    name: "Luxury Double Room",
    image: "https://media.istockphoto.com/id/1195079657/photo/3d-rendering-beautiful-classic-orange-luxury-bedroom-suite-in-hotel-with-tv.jpg?s=2048x2048&w=is&k=20&c=-5Ics07DnwxMaCSi2PkmvzjKD5jsIgYSP7TaKUXzUeU=",
    description:
      "A spacious retreat with lush interiors and thoughtful amenities for a perfect getaway.",
    price: "$400 / night",
    link: "/rooms/luxury-double-room",
  },
  {
    id: 5,
    name: "Honeymoon Suite",
    image: "https://media.istockphoto.com/id/1284639146/photo/3d-rendering-beautiful-luxury-bedroom-suite-in-hotel-with-working-table-near-bathroom.jpg?s=2048x2048&w=is&k=20&c=l4jN8ZgNmSXjKQXfX0krFhUNBq4EEGT7ab_GdO-Nyh8=",
    description:
      "Celebrate love in style with a private jacuzzi, mood lighting, and bespoke services.",
    price: "$700 / night",
    link: "/rooms/honeymoon-suite",
  },
  {
    id: 6,
    name: "Executive Business Room",
    image: "https://media.istockphoto.com/id/495249934/photo/hotel-room-interior.jpg?s=2048x2048&w=is&k=20&c=6706Yf19DxLvMbg0Tbe3Ux4LfBHZ6OwncJuQpQGky9g=",
    description:
      "Designed for productivity, this room offers a serene workspace and premium facilities.",
    price: "$500 / night",
    link: "/rooms/business-room",
  },
];

const FeaturedRooms = () => {

  return (
    <section className="featured-rooms py-20 bg-gradient-to-r from-[#1a1a1d] to-[#4e4e50] text-white">
      <div className="container mx-auto px-6 lg:px-16">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl lg:text-6xl  bg-gradient-to-r from-[#FFD700] to-[#FF8C00] text-transparent bg-clip-text font-bold  mb-4">
            Featured Rooms
          </h2>
          <p className="text-lg lg:text-xl max-w-3xl mx-auto">
            Discover our handpicked selection of luxurious rooms, offering the
            perfect blend of elegance, comfort, and sophistication.
          </p>
        </div>

        {/* Room Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {featuredRooms.map((room) => (
            <div
              key={room.id}
              className="room-card bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Room Image */}
              <div className="relative overflow-hidden">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-64 object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 hover:opacity-60 transition-opacity duration-500"></div>
                <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md">
                  {room.price}
                </div>
              </div>

              {/* Room Details */}
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-yellow-600 mb-3 hover:text-to-r from-[#FFD700] to-[#FF8C00] text-transparent transition duration-300">
                  {room.name}
                </h3>
                <p className="text-gray-600 mb-6 text-base lg:text-lg">
                  {room.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedRooms;
