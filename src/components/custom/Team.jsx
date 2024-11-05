import React from "react";
import { FaCode, FaBug, FaUser } from "react-icons/fa";
import { GrUserFemale } from "react-icons/gr";
import { IoDocumentAttachSharp } from "react-icons/io5";

// Reusable TeamMemberCard Component
const TeamMemberCard = ({ member, customClass = "" }) => (
  <div
    className={`relative group card bg-white/30 dark:bg-black/85 backdrop-blur-xl rounded-xl shadow-xl p-6 text-center transition-transform transform hover:scale-105 hover:shadow-2xl ${customClass}`}
  >
    <div
      className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white shadow-md flex items-center justify-center text-white dark:text-black bg-black dark:bg-white"
      title={member.name}
    >
      {member.gender === "female" ? (
        <GrUserFemale className="text-2xl" />
      ) : (
        <FaUser className="text-2xl" />
      )}
    </div>

    <h3 className="text-xl font-semibold dark:text-white">{member.name}</h3>

    <p className="text-gray-600 dark:text-gray-400 flex items-center justify-center gap-2">
      {member.icon} {member.role}
    </p>

    <div className="absolute inset-0 bg-black/70 dark:bg-white/80 dark:text-black/85 text-white opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center p-4 rounded-xl transition-opacity duration-300">
      <p className="text-center">{member.description}</p>
    </div>
  </div>
);

// Main Team Component
function Team() {
  const teamMembers = [
    {
      name: "Harika",
      role: "Front-End Developer",
      gender: "female",
      icon: <FaCode />,
      description:
        "Harika focuses on building responsive and interactive front-end interfaces, ensuring that users have a seamless experience across devices.",
    },
    {
      name: "Vyshnavi",
      role: "Documentation",
      gender: "female",
      icon: <IoDocumentAttachSharp />,
      description:
        "Vyshnavi manages comprehensive project documentation, ensuring every detail is captured clearly for smooth project transitions and reference.",
    },
    {
      name: "Vinay",
      role: "Documentation",
      gender: "male",
      icon: <IoDocumentAttachSharp />,
      description:
        "Vinay ensures that all technical and user documentation is clear, concise, and easily understandable, helping the team stay organized.",
    },
    {
      name: "Mukesh",
      role: "Back-End Developer",
      gender: "male",
      icon: <FaCode />,
      description:
        "Mukesh is responsible for developing and maintaining the server-side logic, databases, and APIs to ensure a strong and reliable back-end architecture.",
    },
    {
      name: "Surya",
      role: "Tester",
      gender: "male",
      icon: <FaBug />,
      description:
        "Surya is in charge of testing all components of the software, identifying bugs, and ensuring that the final product is free of issues and user-friendly.",
    },
  ];

  return (
    <div className="team-section">
      <h2 className="text-3xl font-bold text-center mb-5 dark:text-white">
        Meet Our Team . . .
      </h2>
      <div className="grid lg:grid-cols-3 gap-8">
        {teamMembers.slice(0, 3).map((member, index) => (
          <TeamMemberCard key={index} member={member} />
        ))}
      </div>
      <div className="flex flex-col lg:flex-row justify-center gap-8 mt-8">
        {teamMembers.slice(3).map((member, index) => (
          <TeamMemberCard key={index} member={member} customClass="lg:w-1/3" />
        ))}
      </div>
    </div>
  );
}

export default Team;
