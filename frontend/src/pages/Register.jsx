import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await api.post("/auth/register", { username, password });
      setSuccess(
        res.data.message || "Registration successful! Redirecting to login..."
      );
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "An unexpected error occurred.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-[#02022e] via-[#0a0a3f] to-black p-4 sm:p-6 lg:p-12">
      {/* floating animated blobs */}
      <div className="absolute -top-10 -left-10 h-28 w-28 sm:h-40 sm:w-40 rounded-full bg-blue-400 opacity-40 animate-float"></div>
      <div className="absolute bottom-10 -right-10 h-20 w-20 sm:h-32 sm:w-32 rounded-full bg-indigo-400 opacity-40 animate-float delay-2000"></div>
      <div className="absolute top-1/4 left-1/2 h-16 w-16 sm:h-24 sm:w-24 rounded-full bg-purple-400 opacity-40 animate-float delay-1000"></div>

      {/* card */}
      <div className="relative z-10 w-full max-w-xs sm:max-w-md md:max-w-lg overflow-hidden rounded-xl bg-gradient-to-br from-[#02022e] via-[#0a0a3f] to-black border-[#525475] border-2 p-6 sm:p-8 lg:p-12 shadow-2xl backdrop-blur-md transition-transform duration-300 hover:scale-[1.01]">
        <h2 className="mb-2 text-center text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-100">
          Create an account 🚀
        </h2>
        <p className="mb-6 text-center text-sm sm:text-base text-gray-400">
          Join us today by creating a new account.
        </p>

        <form onSubmit={handleRegister} className="space-y-5 sm:space-y-6">
          <div>
            <label
              htmlFor="username"
              className="mb-1 block text-xs sm:text-sm font-medium text-gray-400"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full text-gray-300 rounded-lg border-2 border-gray-300 p-2 sm:p-3 text-sm sm:text-base shadow-sm transition-colors duration-200 focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-xs sm:text-sm font-medium text-gray-400"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-gray-300 rounded-lg border-2 border-gray-300 p-2 sm:p-3 pr-10 text-sm sm:text-base shadow-sm transition-colors duration-200 focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-200 focus:outline-none"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`flex w-full items-center justify-center rounded-lg p-2 sm:p-3 font-semibold text-white text-sm sm:text-base transition-colors duration-300 ${
              loading
                ? "cursor-not-allowed bg-gray-400"
                : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
            }`}
          >
            {loading ? (
              <>
                <svg
                  className="mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Registering...
              </>
            ) : (
              "Register"
            )}
          </button>
        </form>

        {success && (
          <div className="mt-6 rounded-lg bg-green-100 p-3 sm:p-4 text-center text-sm sm:text-base text-green-700">
            <p className="font-medium">{success}</p>
          </div>
        )}
        {error && (
          <div className="mt-6 rounded-lg bg-red-100 p-3 sm:p-4 text-center text-sm sm:text-base text-red-700">
            <p className="font-medium">{error}</p>
          </div>
        )}

        <div className="mt-6 text-center text-xs sm:text-sm text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-blue-600 hover:underline"
          >
            Login
          </Link>
        </div>
      </div>

      {/* custom animation keyframes */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(30px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .delay-1000 { animation-delay: 1s; }
        .delay-2000 { animation-delay: 2s; }
      `}</style>
    </div>
  );
}
