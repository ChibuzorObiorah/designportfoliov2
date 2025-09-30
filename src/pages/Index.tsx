import ParticleHero from "@/components/ParticleHero";
import WorkGrid from "@/components/WorkGrid";
import Footer from "@/components/Footer";

interface IndexProps {
  isInitialLoad: boolean;
}

const Index = ({ isInitialLoad }: IndexProps) => {
  return (
    <div className="min-h-screen bg-bg-1 font-ibm-plex">
      {/* Hero Section with Particle Animation */}
      <section className="w-full h-[60vh] relative overflow-hidden">
        <div className="absolute inset-0 z-10">
          <ParticleHero />
        </div>
      </section>

      {/* Professional Description - Below Particles */}
      <section className="w-full py-2 mb-16 flex flex-col items-center justify-center">
        <div className="text-center space-y-2">
          <p className="font-['IBM_Plex_Mono'] text-[12px] sm:text-[14px] md:text-[16px] text-fg-2 tracking-[-0.24px] uppercase">
            PRODUCT DESIGNER AT MICROSOFT, IN NYC
          </p>
          <p className="font-['IBM_Plex_Mono'] text-[12px] sm:text-[14px] md:text-[16px] text-fg-2 tracking-[-0.24px] uppercase">
            MOST ENERGIZED WHEN ALIGNED TO THE MISSION
          </p>
        </div>
      </section>

      {/* Content - Footer always renders for SSR */}
      <div>
        <WorkGrid />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
