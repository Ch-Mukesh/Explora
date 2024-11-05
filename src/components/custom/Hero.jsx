import React from "react";
import { Link } from "react-router-dom";
import { MdFlightTakeoff } from "react-icons/md";



function Hero() {
  return (
    <div className="flex flex-col lg:flex-row p-8 lg:p-12 gap-6 justify-around items-center mt-8">
      <div className="flex flex-col justify-center gap-4 items-center">
        <h1 className="text-lg text-center text-[#676462]">
          <span className="text-black dark:text-white text-xl sm:text-3xl font-semibold">
            Plan Your Next Escape  . . <MdFlightTakeoff className="inline-block"/>
          </span>
          <br />
          <p className="leading-loose text-sm md:text-base mt-2">Custom Itineraries Just for You!!!</p>
        </h1>
        <p className="text-[#444341]  dark:text-[#666665] text-center text-sm sm:text-base">
          Your personal trip planner, making customized itineraries that fit
          your interests and budget.
        </p>
        <Link to="/create-trip" className="bg-black mt-2 text-white dark:bg-white dark:text-black font-bold w-fit px-3 py-2 mx-auto rounded-xl  shadow-lg  hover:scale-105">
          Get Started!!
        </Link>
      </div>
      <div className="lg:w-1/3 rounded-lg my-5 lg:my-0">
        <img src="hero.jpg" alt="Hero" className="w-full lg:w-96 rounded-xl shadow-md"/>
      </div>
    </div>
  );
}

export default Hero;
