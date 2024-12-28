import React from "react";

const testimonials = [
  {
    id: 1,
    name: "Sophia James",
    image: "data:image/jpeg;base64,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",
    review:
      "An unforgettable experience! The staff were incredibly attentive, and the suite was beyond luxurious.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Brown",
    image: "https://plus.unsplash.com/premium_photo-1689977927774-401b12d137d6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    review:
      "Absolutely loved my stay. The attention to detail and the comfort level are unmatched!",
    rating: 5,
  },
  {
    id: 3,
    name: "Emma Wilson",
    image: "https://britishsailingteam.rya.org.uk/media/3oihp4v5/bd_teamgb_sailing_launch36255.jpg",
    review:
      "A perfect blend of elegance and relaxation. I can’t wait to come back!",
    rating: 4.5,
  },
];

const GuestTestimonials = () => {
  return (
    <section className="guest-testimonials bg-gradient-to-r from-[#1a1a1d] to-[#4e4e50] py-24">
      <div className="container mx-auto px-8 lg:px-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-6xl font-bold text-gold tracking-wide mb-6">
            What Our Guests Say
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Hear from our valued guests about their unforgettable experiences at
            our hotel.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="testimonial-card bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
            >
              <div className="flex items-center mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover border-4 border-gold mr-4"
                />
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {testimonial.name}
                  </h3>
                  <p className="text-gold font-medium">
                    {Array.from({ length: Math.floor(testimonial.rating) }).map(
                      (_, index) => (
                        <span key={index}>⭐</span>
                      )
                    )}
                    {testimonial.rating % 1 !== 0 && "⭐"}{" "}
                  </p>
                </div>
              </div>
              <p className="text-gray-400">{testimonial.review}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GuestTestimonials;
