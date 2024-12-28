import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { updateProfile } from "firebase/auth";
import Swal from 'sweetalert2'
const Register = () => {
  const { register } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const photoURL = e.target.photoURL.value;
    const password = e.target.password.value;

    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        "Password must contain at least 6 characters, one uppercase, and one lowercase letter."
      );
      return;
    }

    try {
      // Register user
      const userCredential = await register(email, password);

      // Update profile with name and photoURL
      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: photoURL,
      });

      // Navigate to login page
      navigate("/login");
      Swal.fire({
        title: "Success!",
        text: "Successfully Register.",
        icon: "success"
      });
      
    } catch (error) {
      Swal.fire({
        title: "Success!",
        text: "Failed to register. Please try again.",
        icon: "error", 
      });
      
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="w-full max-w-lg bg-gradient-to-br from-gray-800 to-gray-900 p-10 rounded-xl shadow-2xl border border-gray-700">
        <h2 className="text-4xl font-bold text-center text-gold font-serif">
          Create an Account
        </h2>
        {error && (
          <p className="text-red-400 text-center mt-4 font-medium">{error}</p>
        )}
        <form onSubmit={handleSubmit} className="mt-6">
          {/* Name Field */}
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-gray-300 font-medium mb-2"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              className="w-full px-4 py-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold transition-all"
              required
            />
          </div>
          {/* Email Field */}
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-gray-300 font-medium mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold transition-all"
              required
            />
          </div>
          {/* Photo URL */}
          <div className="mb-6">
            <label
              htmlFor="photoURL"
              className="block text-gray-300 font-medium mb-2"
            >
              Photo URL
            </label>
            <input
              type="url"
              name="photoURL"
              placeholder="Paste your photo URL"
              className="w-full px-4 py-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold transition-all"
            />
          </div>
          {/* Password Field */}
          <div className="mb-8">
            <label
              htmlFor="password"
              className="block text-gray-300 font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Create a strong password"
              className="w-full px-4 py-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold transition-all"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gold text-black font-bold text-lg rounded-lg hover:bg-yellow-500 transition-all shadow-md hover:shadow-lg"
          >
            Register
          </button>
        </form>
        <p className="text-center text-gray-400 mt-6 text-sm">
          Already have an account?{" "}
          <Link
            to={"/login"}
            className="text-gold font-medium hover:underline transition-all"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
