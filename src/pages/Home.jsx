import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import CreateTripCard from "@/components/custom/CreateTripCard";
import Details from "@/components/custom/Details";
import Features from "@/components/custom/Features";
import Hero from "@/components/custom/Hero";
import Team from "@/components/custom/Team";
import Technologies from "@/components/custom/Technologies";

function Home() {
  const location = useLocation();

  useEffect(() => {
    // Scroll to the section if state contains "scrollTo"
    if (location.state?.scrollTo) {
      const sectionId = location.state.scrollTo;
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  return (
    <div className="container mx-auto flex flex-col gap-40 justify-center min-h-screen  p-8 lg:p-10">
      <section id="home">
        <Hero />
      </section>

      <section id="create-trip">
        <h2 className="text-3xl font-bold text-center mb-5 dark:text-white">
          Create Your Trip . . .
        </h2>
        <CreateTripCard />
      </section>

      <section id="features">
        <h2 className="text-3xl font-bold text-center mb-5 dark:text-white">
          Features . . .
        </h2>
        <Features />
      </section>

      <section id="services">
        <h2 className="text-3xl font-bold text-center mb-5 dark:text-white">
          Services . .
        </h2>
        <Details />
      </section>

      <section id="team">
        <Team />
      </section>

      <section id="technologies">
        <h2 className="text-3xl font-bold text-center dark:text-white">
          Technologies Used . .
        </h2>
        <Technologies />
      </section>
    </div>
  );
}

export default Home;
