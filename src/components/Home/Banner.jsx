import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const Banner = () => {
  return (
    <div className="w-full mt-23 h-[600px] bg-gradient-to-r from-[#1a1a1d] to-[#4e4e50] overflow-hidden shadow-2xl">
      <Swiper
        modules={[Autoplay, Navigation]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        navigation
        loop
        className="w-full h-full"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="relative w-full h-full">
            <img
              src="https://plus.unsplash.com/premium_photo-1661879252375-7c1db1932572?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Luxurious Room"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 text-white">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-[#FFD700] to-[#FF8C00] text-transparent bg-clip-text">
                Experience Ultimate Luxury
              </h1>
              <p className="mt-4 text-lg font-medium">
                Discover the most exquisite rooms designed for your comfort and style.
              </p>
              <a
                href="#rooms"
                className="btn mt-6 px-8 py-3 bg-gradient-to-r from-[#FFD700] to-[#FF8C00] text-black font-bold shadow-[0px_4px_20px_rgba(255,215,0,0.5)] rounded-full hover:scale-110 transition-all duration-500"
              >
                Explore Rooms
              </a>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="relative w-full h-full">
            <img
              src="https://plus.unsplash.com/premium_photo-1661964402307-02267d1423f5?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Comfort and Style"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 text-white">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-[#FFD700] to-[#FF8C00] text-transparent bg-clip-text">
                Your Comfort, Our Priority
              </h1>
              <p className="mt-4 text-lg font-medium">
                Immerse yourself in a world of elegance and exceptional service.
              </p>
              <a
                href="#rooms"
                className="btn mt-6 px-8 py-3 bg-gradient-to-r from-[#FFD700] to-[#FF8C00] text-black font-bold shadow-[0px_4px_20px_rgba(255,215,0,0.5)] rounded-full hover:scale-110 transition-all duration-500"
              >
                Explore Rooms
              </a>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div className="relative w-full h-full">
            <img
              src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
              alt="Exceptional Elegance"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 text-white">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-[#FFD700] to-[#FF8C00] text-transparent bg-clip-text">
                Indulge in Elegance
              </h1>
              <p className="mt-4 text-lg font-medium">
                Book your stay today and enjoy a one-of-a-kind luxurious experience.
              </p>
              <a
                href="#rooms"
                className="btn mt-6 px-8 py-3 bg-gradient-to-r from-[#FFD700] to-[#FF8C00] text-black font-bold shadow-[0px_4px_20px_rgba(255,215,0,0.5)] rounded-full hover:scale-110 transition-all duration-500"
              >
                Explore Rooms
              </a>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
