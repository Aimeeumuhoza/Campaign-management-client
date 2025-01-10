import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { BsFillPersonFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const SignUp = () => {
  const [formData, setFormData] = useState({
    role: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:3000/auth/signup", formData);
      if (response.status === 201) {
        // Redirect to dashboard after successful sign-up
        navigate("/dashboard");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred during sign-up.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-100">
      <div className="flex items-center justify-center pt-28 pb-11">
        <Link to={"/"} className="text-3xl text-black font-bold">
          Campaigns Tracking App
        </Link>
      </div>
      <div className="flex items-center justify-center w-full pb-36">
        <div className="bg-white shadow-lg rounded-lg p-8 md:w-1/3 w-96">
          <h2 className="text-2xl font-medium text-center text-black mb-6">
            Create an Account
          </h2>
          {error && <p className="text-red-600 text-center mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-black mb-2" htmlFor="role">
                Role *
              </label>
              <div className="relative">
                <select
                  id="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full p-4 pl-10 border border-gray-300 rounded focus:outline-none focus:ring-2"
                  required
                >
                  <option value="" disabled>Select Role</option>
                  <option value="influencer">influencer</option>
                  <option value="brand">brand</option>
                </select>
                <BsFillPersonFill className="absolute top-1/2 left-3 transform -translate-y-1/2 text-black" />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-black mb-2" htmlFor="email">
                Your Email *
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  placeholder="name@example.com"
                  className="w-full p-4 pl-10 border border-gray-300 rounded focus:outline-none focus:ring-2 text-black"
                  required
                  value={formData.email}
                  onChange={handleChange}
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
                  className="w-full p-4 pl-10 border border-gray-300 rounded focus:outline-none focus:ring-2"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
                <RiLockPasswordLine className="absolute top-1/2 left-3 transform -translate-y-1/2 text-black" />
              </div>
            </div>
            <button
              type="submit"
              className={`w-full text-lg bg-[#A1EB4B] text-white font-semibold py-4 rounded transition duration-300 ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </form>
          <div className="text-center my-10">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link to={"/"} className="text-black">
                Login
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

export default SignUp;
