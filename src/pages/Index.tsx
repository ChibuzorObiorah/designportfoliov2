import ParticleHero from "@/components/ParticleHero";
import WorkGrid from "@/components/WorkGrid";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";

interface IndexProps {
  isInitialLoad: boolean;
}

const Index = ({ isInitialLoad }: IndexProps) => {
  const [showParticles, setShowParticles] = useState(false);
  const [showDescription, setShowDescription] = useState(false);

  useEffect(() => {
    if (isInitialLoad) {
      // First time load - show particles first
      const particleTimer = setTimeout(() => {
        setShowParticles(true);
      }, 200);

      // Then show description after particles have animated for a while
      const descriptionTimer = setTimeout(() => {
        setShowDescription(true);
      }, 1200);

      return () => {
        clearTimeout(particleTimer);
        clearTimeout(descriptionTimer);
      };
    } else {
      // Subsequent loads - show everything immediately
      setShowParticles(true);
      setShowDescription(true);
    }
  }, [isInitialLoad]);

  return (
    <div className="min-h-screen bg-colors-bg-1 font-ibm-plex">
      {/* Hero Section with Particle Animation */}
      <section className="w-full h-[60vh] relative overflow-hidden">
        {/* Particle Animation with dissolve effect */}
        <div
          className={`absolute inset-0 z-10 transition-opacity duration-1200 ease-out ${
            showParticles ? "opacity-100" : "opacity-0"
          }`}
        >
          <ParticleHero />
        </div>
      </section>

      {/* Professional Description - Below Particles */}
      <section className="w-full py-2 mb-16 flex flex-col items-center justify-center">
        <div 
          className={`text-center space-y-2 transition-opacity duration-1000 ease-out ${
            showDescription ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="font-['IBM_Plex_Mono'] text-[12px] sm:text-[14px] md:text-[16px] text-fg-2 tracking-[-0.24px] uppercase">
            PRODUCT DESIGNER AT MICROSOFT, IN NYC
          </p>
          <p className="font-['IBM_Plex_Mono'] text-[12px] sm:text-[14px] md:text-[16px] text-fg-2 tracking-[-0.24px] uppercase">
            MOST ENERGIZED WHEN ALIGNED TO THE MISSION
          </p>
        </div>
      </section>

      {/* Content - no longer needs conditional visibility since App handles it */}
      <WorkGrid />
      <Footer />
    </div>
  );
};

export default Index;
