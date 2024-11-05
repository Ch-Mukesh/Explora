import React from "react";
import { FaGithub, FaTwitter, FaEnvelope } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom"; // For routing

function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigateAndScroll = (sectionId) => {
    if (location.pathname !== "/") {
      // If not on home page, navigate to home first
      navigate("/", { state: { scrollTo: sectionId } });
    } else {
      // If already on home, just scroll to section
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-8 justify-between items-center">
          {/* Navigation Links */}
          <div className="mb-6 lg:mb-0">
            <ul className="flex gap-3 md:gap-10 flex-col md:flex-row text-center text-gray-600">
              <li>
                <span
                  className="cursor-pointer hover:underline hover:text-white"
                  onClick={() => handleNavigateAndScroll("home")}
                >
                  Home
                </span>
              </li>
              <li>
                <span
                  className="cursor-pointer hover:underline hover:text-white"
                  onClick={() => handleNavigateAndScroll("features")}
                >
                  Features
                </span>
              </li>
              <li>
                <span
                  className="cursor-pointer hover:underline hover:text-white"
                  onClick={() => handleNavigateAndScroll("technologies")}
                >
                  Technologies
                </span>
              </li>
              <li>
                <span
                  className="cursor-pointer hover:underline hover:text-white"
                  onClick={() => handleNavigateAndScroll("team")}
                >
                  Our Team
                </span>
              </li>
              <li>
                <span
                  className="cursor-pointer hover:underline hover:text-white"
                  onClick={() => handleNavigateAndScroll("services")}
                >
                  Services
                </span>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="flex justify-center gap-6">
            <h1 className="text-gray-600">Contact Us :</h1>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-400"
            >
              <FaGithub className="text-2xl" />
            </a>
            <a
              href="mailto:exploraa2026@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-400"
            >
              <FaEnvelope className="text-2xl" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-400"
            >
              <FaTwitter className="text-2xl" />
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center mt-6 lg:mt-0">
            <p className="text-gray-500 my-2">&copy; {new Date().getFullYear()} Explora. All rights reserved.</p>
            <p className="text-md text-gray-500">
              Made with <span className="text-red-500 text-2xl">♥</span> by Team Explora
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
