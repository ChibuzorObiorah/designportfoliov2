import ParticleHero from "@/components/ParticleHero";
import WorkGrid from "@/components/WorkGrid";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";

interface IndexProps {
  isInitialLoad: boolean;
}

const Index = ({ isInitialLoad }: IndexProps) => {
  // Show content immediately with fade-in animations
  const [mounted, setMounted] = useState(true); // Changed to true for SSR

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-bg-1 font-ibm-plex">
      {/* Hero Section with Particle Animation */}
      <section className="w-full h-[60vh] relative overflow-hidden">
        <div className={`absolute inset-0 z-10 transition-opacity duration-700 ease-out ${
          mounted ? "opacity-100" : "opacity-0"
        }`}>
          <ParticleHero />
        </div>
      </section>

      {/* Professional Description - Below Particles */}
      <section className="w-full py-2 mb-16 flex flex-col items-center justify-center">
        <div className={`text-center space-y-2 transition-all duration-700 ease-out ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}>
          <p className="font-['IBM_Plex_Mono'] text-[12px] sm:text-[14px] md:text-[16px] text-fg-2 tracking-[-0.24px] uppercase">
            PRODUCT DESIGNER AT MICROSOFT, IN NYC
          </p>
          <p className="font-['IBM_Plex_Mono'] text-[12px] sm:text-[14px] md:text-[16px] text-fg-2 tracking-[-0.24px] uppercase">
            MOST ENERGIZED WHEN ALIGNED TO THE MISSION
          </p>
        </div>
      </section>

      {/* Content with smooth fade-in */}
      <div className={`transition-all duration-700 ease-out delay-200 ${
        mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}>
        <WorkGrid />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
