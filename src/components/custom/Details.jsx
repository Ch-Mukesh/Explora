import React from "react";

function Details() {
  const features = [
    {
      title: "Tailored Travel Recommendations",
      description:
        "Receive customized suggestions based on your preferences and past trips.",
      image: "personalized recommendations.webp",
      odr: "order-last",
      spn : ""
    },
    {
      title: "Interactive Map Integration",
      description:
        "Navigate with ease using real-time, interactive maps for seamless travel.",
      image: "GPS symbo.webp",
      odr: "order-first",
      spn : ""

    },
    {
      title: "Intuitive User Interface",
      description:
        "Enjoy a user-centric design that enhances the overall experience and ease of use.",
      image: "Intuitive User Interface.webp",
      odr: "order-last",
      spn : ""

    },
    {
      title: "Accommodation Suggestions",
      description:
        "Get personalized lodging recommendations to suit your needs and budget.",
      image: "Accommodation Recommendations.webp",
      odr: "order-first",
      spn : ""

    },
    {
      title: "Dynamic Itinerary Planning",
      description:
        "Effortlessly generate time-specific schedules, ensuring optimal use of your time.",
      image: "dynamic itinerary planning.webp",
      odr: "order-last",
      spn : "lg:col-span-2 lg:w-1/2 lg:mx-auto"
    },
  ];

  return (
    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
      {features.map((item) => (
        <div className={`card bg-lime-50 flex justify-between p-4 rounded-xl shadow-xl gap-5 dark:bg-transparent dark:border-[1px] dark:border-gray-400  ${item.spn} hover:scale-105`}>
          <div>
            <h3 className="sm:text-xl font-medium mb-3 dark:text-[#aba6a6] hover:underline">{item.title}</h3>
            <p className="text-[#666363] sm:text-base">{item.description}</p>
          </div>
          <img src={item.image} alt="" className ={ ` w-1/4 rounded-2xl ${item.odr}  lg:order-none`} />
        </div>
      ))}
    </div>
  );
}

export default Details;
