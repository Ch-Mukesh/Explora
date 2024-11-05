import React from 'react';
import { Link } from 'react-router-dom';
import { BsArrowRightCircleFill } from "react-icons/bs";

function CreateTripCard() {
  return (
      <div className='bg-[#1e1e1e] text-center px-3 py-10 rounded-xl flex flex-col gap-4 w-10/12 mx-auto items-center shadow-2xl dark:bg-transparent dark:border-gray-500 dark:border-[1px]'>
        <h1 className='font-semibold text-[#ad9d9d]  sm:text-xl'>
          Explore more, stress less. We turn your travel dreams into plans.
        </h1>
        <p className='text-[#b0adad]'>Plan Your Trip Here!!</p>
        <Link to="/create-trip" className="bg-white text-[#1e1e1e] font-bold w-10/12 md:w-2/5 p-3 rounded-3xl  shadow-xl  hover:scale-105">
          Get Started For Free!! &nbsp;&nbsp; <BsArrowRightCircleFill className='inline-block'/>
        </Link>
      </div>
  );
}

export default CreateTripCard;
