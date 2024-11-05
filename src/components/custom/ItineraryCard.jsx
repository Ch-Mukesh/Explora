// import React from "react";
// import { TbClockHour4Filled } from "react-icons/tb";
// import { FaLocationDot, FaPersonWalkingLuggage } from "react-icons/fa6";
// import { MdOutlineDirectionsBike } from "react-icons/md";
// import { FcRating } from "react-icons/fc";
// import { FaWallet } from "react-icons/fa";
// import { Link } from "react-router-dom";

// function ItineraryCard({ plan }) {
//   return (
//     <Link to={`https://www.google.com/maps/search/?api=1&query=${plan.placeName}`}  target="_blank">
//     <div className="bg-white dark:bg-[#232323] dark:shadow-white/10 rounded-xl shadow-lg p-4 transition-transform transform hover:scale-105 duration-300">
//       <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
//         <FaLocationDot className="inline-block text-red-600 mr-2"/>{plan.placeName}
//       </h4>
//       <img
//         src={plan.placeImageUrl}
//         alt={plan.placeName}
//         className="w-full h-40 object-cover rounded-md mt-2"
//       />
//       <p className="text-gray-600 dark:text-gray-300 mt-2">
//         {plan.placeDetails}
//       </p>
//       <p className="text-gray-700 dark:text-gray-200 mt-1">
//         <strong>Rating:</strong> {plan.rating} / 5 <FcRating className="inline-block"/>
//       </p>
//       <p className="text-gray-700 dark:text-gray-200 mt-1">
//         <strong>Best Time To Visit:</strong> {plan.startTime} - {plan.endTime} <MdOutlineDirectionsBike className="inline-block ml-1 text-blue-950 dark:text-white"/>
//       </p>
//       <p className="text-gray-700 dark:text-gray-200 mt-1">
//         <strong>Time to Travel:</strong> {plan.timeToTravel}<TbClockHour4Filled className="inline-block ml-2 text-blue-950 dark:text-white"/>
//       </p>
//       <p className="text-gray-700 dark:text-gray-200 mt-1">
//         <strong>Ticket Pricing:</strong> {plan.ticketPricing === 'N/A' ? "Varies" : plan.ticketPricing}<FaWallet className="inline-block ml-2 text-yellow-400"/>
//       </p>
//     </div>
//     </Link>
//   );
// }

// export default ItineraryCard;

import React from "react";
import { TbClockHour4Filled } from "react-icons/tb";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineDirectionsBike } from "react-icons/md";
import { FcRating } from "react-icons/fc";
import { FaLocationArrow, FaWallet } from "react-icons/fa";
import { Link } from "react-router-dom";

function ItineraryCard({ plan }) {
  const pics = [
    "trip1.jpg",
    "trip2.jpg",
    "trip3.jpg",
    "trip4.jpg",
    "trip5.jpg",
    "trip6.jpg",
  ];

  const randomPic = pics[Math.floor(Math.random() * pics.length)];

  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${plan.placeName}`}
      target="_blank"
    >
      {/* Main card container */}
      <div className="bg-white dark:bg-[#232323] dark:shadow-white/10 rounded-xl shadow-md p-4 transition-transform transform hover:scale-105 duration-300 h-full flex flex-col justify-between">
        {/* Place Name */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
            <FaLocationDot className="inline-block text-red-600 mr-2" />
            {plan.placeName}
          </h4>
          <img
            // src={plan.placeImageUrl}
            src={`/${randomPic}`}
            alt={plan.placeName}
            className="w-full h-40 object-cover rounded-xl mt-2"
          />
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            {plan.placeDetails}
          </p>
          <p className="text-gray-700 dark:text-gray-200 mt-1">
            <strong>Rating:</strong> {plan.rating} / 5{" "}
            <FcRating className="inline-block" />
          </p>
          <p className="text-gray-700 dark:text-gray-200 mt-1">
            <strong>Time to Travel:</strong> {plan.timeToTravel}
            <TbClockHour4Filled className="inline-block ml-2 text-blue-950 dark:text-white" />
          </p>
          <p className="text-gray-700 dark:text-gray-200 mt-1">
            <strong>Ticket Pricing:</strong>{" "}
            {plan.ticketPricing === "N/A" ? "Varies" : plan.ticketPricing}
            <FaWallet className="inline-block ml-2 text-yellow-400" />
          </p>
        </div>

        {/* Best Time to Visit - Stuck to the Bottom */}
        <div className="bg-yellow-200 dark:bg-white/10 py-2 px-3 sm:px-4 rounded-xl mt-3 flex justify-between items-center">
          <p className="text-sm sm:text-xl font-semibold text-yellow-800 dark:text-white">
            <span className="font-normal"> Time To Visit: </span>
            {plan.startTime} - {plan.endTime}
          </p>
          <Link
            to={`https://www.google.com/maps/search/?api=1&query=${plan.placeName}`}
            target="_blank"
          >
            <button className="bg-black hover:bg-black text-white font-extrabold p-3 rounded-xl">
              <FaLocationArrow />
            </button>
          </Link>
        </div>
      </div>
    </Link>
  );
}

export default ItineraryCard;
