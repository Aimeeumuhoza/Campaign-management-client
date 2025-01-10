import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:3000/auth/signin", {
        email,
        password,
      });

      // Assume the API returns a token and user data
      const { token } = response.data;

      // Save token in localStorage or any state management solution
      localStorage.setItem("authToken", token);

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Failed to log in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-100">
      <div className="flex items-center justify-center pt-28 pb-11">
        <Link to={"/"} className="text-3xl text-black font-bold">
          Campaigns Tracking App
        </Link>
      </div>
      <div className="flex items-center justify-center w-full ">
        <div className="bg-white shadow-lg rounded-lg p-8 md:w-1/3 w-96">
          <h2 className="text-2xl font-medium text-center text-black mb-6">
            User Login
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-black mb-2" htmlFor="email">
                Your Email *
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-4 pl-10 border border-gray-300 rounded focus:outline-none focus:ring-2"
                  required
                />
                <MdOutlineEmail className="absolute top-1/2 left-3 transform -translate-y-1/2 text-black" />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-black mb-2" htmlFor="password">
                Password *
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-4 pl-10 border border-gray-300 rounded focus:outline-none focus:ring-2"
                  required
                />
                <RiLockPasswordLine className="absolute top-1/2 left-3 transform -translate-y-1/2 text-black" />
              </div>
            </div>

            <div className="flex justify-between items-center my-8">
              <div className="flex items-center">
                <input type="checkbox" id="remember" className="mr-2 p-6" />
                <label htmlFor="remember" className="text-black font-bold">
                  Remember me
                </label>
              </div>
              <div className="text-center">
                <a href="#" className="text-gray-700 hover:underline">
                  Forgot password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              className={`w-full text-lg font-semibold py-4 rounded transition duration-300 ${
                loading ? "bg-gray-500 cursor-not-allowed" : "bg-[#A1EB4B] text-white"
              }`}
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          {error && (
            <div className="mt-4 text-center text-red-600 text-sm">
              {error}
            </div>
          )}

          <div className="text-center my-10">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link to={"/register"} className="text-black">
                Sign Up
              </Link>
            </p>
          </div>
          <footer className="text-center text-gray-500 text-sm mt-8">
            © Copyright 2024 Campaigns Tracking App All Rights Reserved.
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Login;
