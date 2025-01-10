import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BiMenu, BiX } from "react-icons/bi";

const Navbar = () => {
  const [isTopOfPage, setIsTopOfPage] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isActive, setIsActive] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsTopOfPage(true);
      }
      if (window.scrollY !== 0) setIsTopOfPage(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navbar = isTopOfPage
    ? "text-white"
    : "shadow bg-white text-gray-800 fixed top-0 left-0 right-0 z-50";

  useEffect(() => {
    const pathname = location.pathname;

    if (pathname === "/") {
      setIsActive("/");
    } else if (pathname === "/crypto") {
      setIsActive("crypto");
    } else if (pathname === "/realestate") {
      setIsActive("realestate");
    } else if (pathname === "/loan") {
      setIsActive("loan");
    } else if (pathname === "/pricing") {
      setIsActive("pricing");
    } else {
      setIsActive("");
    }
  }, [location.pathname]);

  return (
    <nav className={`${navbar} bg-gray-800 px-6 py-2`}>
      <div className="mx-20 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          {/* <img src="/path-to-logo.png" alt="Logo" className="h-10" /> */}
          <span className="font-bold text-xl">Blunance Capital</span>
          <div className="border-l h-20 border-gray-400 mx-6"></div>
        </div>

        <div className="hidden md:flex space-x-6">
          <Link to={"/"} className={`hover:text-pink-500 `}>
            Home
          </Link>
          <Link
            to={"/crypto"}
            className={`hover:text-pink-500 ${
              isActive === "crypto" ? "text-pink-500" : ""
            }`}
          >
            Crypto Assets
          </Link>
          <Link
            to={"/realestate"}
            className={`hover:text-pink-500 ${
              isActive === "realestate" ? "text-pink-500" : ""
            } `}
          >
            Real Estate
          </Link>
          <Link
            to={"/loan"}
            className={`hover:text-pink-500 ${
              isActive === "loan" ? "text-pink-500" : ""
            } `}
          >
            Crypto Loans
          </Link>
          <Link
            to={"/pricing"}
            className={`hover:text-pink-500 ${
              isActive === "pricing" ? "text-pink-500" : ""
            } `}
          >
            Pricing
          </Link>
          <div className="relative group">
            <button className="hover:text-pink-500 flex items-center">
              Company
              <svg
                className="w-4 h-4 ml-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </button>

            <div className="absolute hidden group-hover:block bg-white mt-1 rounded shadow-lg w-48">
              <a
                href="#"
                className="block text-black  px-4 py-2 hover:bg-pink-500"
              >
                Company Registration
              </a>
              <a
                href="#"
                className="block text-black  px-4 py-2 hover:bg-pink-500"
              >
                Presentation Video
              </a>
              <a
                href="#"
                className="block text-black px-4 py-2 hover:bg-pink-500"
              >
                Terms and Conditions
              </a>
            </div>
          </div>
        </div>

        <div className="space-x-4  md:flex">
          <Link
            to={"/register"}
            className="bg-white hidden md:flex text-black px-4 py-2 rounded hover:bg-gray-100"
          >
            Sign Up
          </Link>
          <Link
            to={"/login"}
            className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-black"
          >
            Login
          </Link>
        </div>
        <div className="md:hidden space-x-6">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="bg-white"
          >
            {isMenuOpen ? (
              <BiX className="text-black text-3xl" />
            ) : (
              <BiMenu className="text-black text-3xl" />
            )}
          </button>
        </div>
        {isMenuOpen && (
          <div
            className={`md:hidden absolute top-24 left-0 right-0 bg-white h-auto w-[80%] mx-20`}
          >
            <a href="#" className="block text-black px-4 py-2">
              Home
            </a>
            <hr className="mb-2" />
            <a href="#" className="block text-black px-4 py-2">
              Crypto Assets
            </a>
            <hr className="mb-2" />
            <a href="#" className="block text-black px-4 py-2">
              Real Estate
            </a>
            <hr className="mb-2" />
            <a href="#" className="block text-black px-4 py-2">
              Crypto Loans
            </a>
            <hr className="mb-2" />
            <a href="#" className="block text-black px-4 py-2">
              Pricing
            </a>
            <hr className="mb-2" />
            <div className="relative group">
              <button className="block text-black px-4 py-2">
                Company
                <svg
                  className="w-4 h-4 ml-1 inline"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </button>
              <div className="absolute hidden group-hover:block bg-white mt-1 rounded shadow-lg w-48">
                <a
                  href="#"
                  className="block text-black px-4 py-2 hover:bg-pink-500"
                >
                  Company Registration
                </a>
                <a
                  href="#"
                  className="block text-black px-4 py-2 hover:bg-pink-500"
                >
                  Presentation Video
                </a>
                <a
                  href="#"
                  className="block text-black px-4 py-2 hover:bg-pink-500"
                >
                  Terms and Conditions
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
