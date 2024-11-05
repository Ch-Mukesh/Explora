import { Check } from "lucide-react";
import React from "react";

function Features() {
  const features = [
    {
      title: "Tailored Recommendations",
      description:
        "Receive customized suggestions based on your preferences and past trips.",
    },
    {
      title: "Interactive Map Integration",
      description:
        "Navigate with ease using real-time, interactive maps for seamless travel.",
    },
    {
      title: "Intuitive User Interface",
      description:
        "Enjoy a user-centric design that enhances the overall experience and ease of use.",
    },
    {
      title: "Accommodation Suggestions",
      description:
        "Get personalized lodging recommendations to suit your needs and budget.",
    },
    {
      title: "Dynamic Itinerary Planning",
      description:
        "Effortlessly generate time-specific schedules, ensuring optimal use of your time.",
    },
  ];

  return (
    <div className="bg-[#1e1e1e] px-6  py-8 rounded-xl flex flex-col gap-4 w-10/12 mx-auto shadow-2xl  dark:border-gray-500 dark:border-[1px]">
      <h1 className="font-bold text-white text-2xl  mb-4">
        This Site Offer's :
      </h1>
      {features.map((item)=>(
        <p className="sm:text-xl text-[#666363]"><Check className="h-6 w-6 text-white inline-block font-bold" /> &nbsp;&nbsp;{item.title}</p>
      ))}
    </div>
  );
}

export default Features;
