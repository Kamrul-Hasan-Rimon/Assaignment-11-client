import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import Swal from "sweetalert2";
import toast from "react-hot-toast";


const Login = () => {
  const { login, googleSignIn, setLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      login(email, password);
      navigate("/");
      Swal.fire({
        title: "Success!",
        text: "Successfully login.",
        icon: "success"
      });
      setLoading(false)
    } catch {
      Swal.fire({
        title: "Success!",
        text: "Failed to login.",
        icon: "error",
      });

    }

  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      navigate("/");
      toast.success('Successfully Google login')
    } catch (error) {
      toast.error("Google Sign-In failed:", error.message);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="w-full max-w-lg bg-gradient-to-br from-gray-800 to-gray-900 p-10 rounded-xl shadow-2xl border border-gray-700">
        {/* Welcome Header */}
        <div className="text-center mb-8">
          <h2 className="text-5xl font-serif font-bold text-gold">
            Welcome Back
          </h2>
          <p className="text-gray-400 text-lg mt-2">
            Experience luxury while accessing your account.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-gray-300 font-medium mb-2"
            >
              Email Address
            </label>
            <input
            required
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold transition-all"
            />
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-300 font-medium mb-2"
            >
              Password
            </label>
            <input
            required
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold transition-all"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gold text-black font-bold text-lg rounded-lg hover:bg-yellow-500 transition-all shadow-md hover:shadow-lg"
          >
            Login
          </button>
        </form>

        {/* Google Sign-In Button */}
        <div className="my-6">
          <button
            onClick={handleGoogleSignIn}
            className="w-full py-3 flex items-center justify-center bg-red-500 text-white font-bold text-lg rounded-lg hover:bg-red-600 transition-all shadow-md hover:shadow-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              className="h-6 w-6 mr-3"
            >
              <path
                fill="#EA4335"
                d="M24 9.5c3.1 0 5.5 1.3 7.2 2.4l5.4-5.4C32.7 3.4 28.8 2 24 2 14.9 2 7.4 7.9 4.5 15.7l6.5 5c1.9-5.4 7.1-11.2 13-11.2z"
              />
              <path
                fill="#34A853"
                d="M46.5 24.3c0-1.4-.1-2.8-.3-4.1H24v8h12.7c-.6 3-2.3 5.6-4.8 7.4l6.1 4.7c3.5-3.2 5.5-7.8 5.5-13z"
              />
              <path
                fill="#4A90E2"
                d="M10.7 29.1c-.8 0-1.5-.1-2.2-.3l-6.5 5C5.4 40.1 13.7 46 24 46c6.5 0 12.3-2.1 16.4-5.8l-6.7-5.1c-2.3 1.5-5.3 2.5-8.4 2.5-7.4 0-13.7-5.3-15.6-12.5z"
              />
              <path
                fill="#FBBC05"
                d="M10.7 18.3l-6.5-5C2.2 16 2 20 2 24s.2 8 2.2 11.6l6.5-5c-.4-1.4-.7-2.8-.7-4.3s.3-3 .7-4.3z"
              />
            </svg>
            Sign in with Google
          </button>
        </div>

    
        <div className="mt-6 text-center">
          <Link
            href="#"
            className="text-sm text-gray-400 hover:text-gold transition-all"
          >
            Forgot Password?
          </Link>
          <p className="mt-2 text-gray-300 text-sm">
            Don’t have an account?{" "}
            <Link
              to={"/register"}
              className="text-gold hover:underline transition-all"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
