// src/components/HotelCard.jsx
import React from "react";
import { FaLandmark, FaMoneyBillWave, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

function HotelCard({ hotel }) {
  const pics = [
    "hotel1.jpg",
    "hotel2.jpg",
    "hotel3.jpg",
    "hotel4.jpg",
    "hotel5.jpg",
    "hotel6.jpg",
  ];

  const randomPic = pics[Math.floor(Math.random() * pics.length)];

  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${hotel.hotelName},${hotel.hotelAddress}`}
      target="_blank"
    >
      <div className="bg-white dark:bg-black dark:shadow-white/5 rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-transform transform duration-250">
        <img
          // src={hotel.hotelImageUrl}
          src={`/${randomPic}`}
          alt={hotel.hotelName}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
            {hotel.hotelName}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mt-5">
            <FaLandmark className="text-red-600 inline-block mr-1" />
            {hotel.hotelAddress}
          </p>
          <div className="flex items-center mt-2">
            <FaStar className="text-yellow-400 mr-1" />
            <span className="text-gray-700 dark:text-gray-200">
              {hotel.rating} / 5
            </span>
          </div>
          <p className="mt-2 text-gray-700 dark:text-gray-200">
            {hotel.description}
          </p>
          <p className="mt-2 text-gray-900 dark:text-gray-100 font-bold">
            <FaMoneyBillWave className="text-red-600 inline-block mr-1" />
            {hotel.price}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default HotelCard;
