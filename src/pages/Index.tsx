import ParticleHero from "@/components/ParticleHero";
import WorkGrid from "@/components/WorkGrid";
import Footer from "@/components/Footer";
import ErrorBoundary from "@/components/ErrorBoundary";
import LoadingFallback from "@/components/LoadingFallback";
import { useState, useEffect } from "react";

interface IndexProps {
  isInitialLoad: boolean;
}

const Index = ({ isInitialLoad }: IndexProps) => {
  const [showParticles, setShowParticles] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [isLoading, setIsLoading] = useState(isInitialLoad);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    console.log('Index loading state:', { isInitialLoad, isLoading });
    
    if (isInitialLoad) {
      // First time load - show particles first
      const particleTimer = setTimeout(() => {
        console.log('Showing particles');
        setShowParticles(true);
      }, 200);

      // Then show description after particles have animated for a while
      const descriptionTimer = setTimeout(() => {
        console.log('Showing description');
        setShowDescription(true);
        setIsLoading(false);
      }, 1000);

      // Failsafe timeout - show content after 5 seconds regardless
      const failsafeTimer = setTimeout(() => {
        console.log('Failsafe timeout triggered');
        setShowParticles(true);
        setShowDescription(true);
        setIsLoading(false);
      }, 5000);

      return () => {
        clearTimeout(particleTimer);
        clearTimeout(descriptionTimer);
        clearTimeout(failsafeTimer);
      };
    } else {
      // Subsequent loads - show everything immediately
      console.log('Subsequent load - showing everything immediately');
      setShowParticles(true);
      setShowDescription(true);
      setIsLoading(false);
    }
  }, [isInitialLoad]);

  // Show loading fallback for initial load only if taking too long
  if (isLoading && isInitialLoad) {
    return <LoadingFallback message="Preparing your experience..." />;
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-bg-1 font-ibm-plex">
        {/* Hero Section with Particle Animation */}
        <section className="w-full h-[60vh] relative overflow-hidden">
          {/* Particle Animation with dissolve effect */}
          <div
            className={`absolute inset-0 z-10 transition-opacity duration-1200 ease-out ${
              showParticles ? "opacity-100" : "opacity-0"
            }`}
          >
            <ErrorBoundary fallback={
              <div className="w-full h-full bg-bg-1 flex items-center justify-center">
                <h1 className="text-title-1 text-fg-1">CHIBUZOR</h1>
              </div>
            }>
              <ParticleHero />
            </ErrorBoundary>
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
        <ErrorBoundary>
          <WorkGrid />
        </ErrorBoundary>
        <ErrorBoundary>
          <Footer />
        </ErrorBoundary>
      </div>
    </ErrorBoundary>
  );
};

export default Index;
