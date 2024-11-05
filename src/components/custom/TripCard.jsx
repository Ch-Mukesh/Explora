// src/components/custom/TripCard.jsx

import React from "react";
import { FaCalendarAlt, FaMoneyBillWave, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";

function TripCard({ trip }) {
  const { id, tripData, userPreferences, userEmail } = trip;

  const { budget, days, destination, noOfPeople } = userPreferences;

  const { pictureUrl } = tripData;

  return (
    <Link to={`/view-trip/${id}`}>
      <div className="bg-white dark:bg-black rounded-xl shadow-xl overflow-hidden transition-transform transform hover:scale-105 duration-300">
        {/* Trip Image */}
        <img
          src={pictureUrl || "hero-img.png"}
          alt={`Trip to ${destination}`}
          className="w-full h-48 object-cover"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/default-trip.jpg"; // Ensure this image exists in your public folder
          }}
        />

        {/* Trip Details */}
        <div className="p-4">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            {destination}
          </h3>
          <div className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
            <FaCalendarAlt className="mr-2" />
            <span>
              {days} {days > 1 ? "Days" : "Day"}
            </span>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
            <FaMoneyBillWave className="mr-2" />
            <span>{budget}</span>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <FaUsers className="mr-2" />
            <span>
              {noOfPeople} {noOfPeople > 1 ? "People" : "Person"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default TripCard;
