import React from "react";
import { FaReact, FaMapMarkedAlt } from "react-icons/fa";
import { SiTailwindcss, SiGooglegemini } from "react-icons/si";
import { AiFillThunderbolt } from "react-icons/ai";
import { RiFirebaseFill } from "react-icons/ri";

function Technologies() {
  const technologies = [
    {
      name: "React",
      icon: <FaReact className="text-8xl mx-4" />,
      link: "https://reactjs.org/",
    },
    {
      name: "Tailwind CSS",
      icon: <SiTailwindcss className="text-8xl mx-4" />,
      link: "https://tailwindcss.com/",
    },
    {
      name: "Shadcn",
      icon: <AiFillThunderbolt className="text-8xl mx-4" />,
      link: "https://shadcn.dev/",
    },
    {
      name: "Firebase",
      icon: <RiFirebaseFill className="text-8xl mx-4" />,
      link: "https://firebase.google.com/",
    },
    {
      name: "Gemini",
      icon: <SiGooglegemini className="text-8xl mx-4" />,
      link: "https://cloud.google.com/gemini",
    },
    {
      name: "Google Maps",
      icon: <FaMapMarkedAlt className="text-8xl mx-4" />,
      link: "https://cloud.google.com/maps-platform",
    },
  ];

  return (
    <div className="technologies-section py-10">
      <div className="marquee-container overflow-hidden py-5">
        <div className="marquee-content flex items-center justify-start gap-8">
          {technologies.map((tech, index) => (
            <a
              key={index}
              href={tech.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center mx-3 "
            >
              <div className="dark:text-white/80">{tech.icon}</div>
              <h3 className="text-lg text-gray-600 dark:text-gray-400 mt-2 text-center">
                {tech.name}
              </h3>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Technologies;
