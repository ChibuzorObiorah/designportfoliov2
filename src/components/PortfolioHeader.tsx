import { useState, useEffect } from 'react';
import ParticleHero from './ParticleHero';

const PortfolioHeader = () => {
  const [showParticles, setShowParticles] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Show particles first (fade in over 2 seconds)
    const particleTimer = setTimeout(() => {
      setShowParticles(true);
    }, 500);

    // Show content after particles are visible (additional 2 seconds)
    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 3000);

    return () => {
      clearTimeout(particleTimer);
      clearTimeout(contentTimer);
    };
  }, []);

  return (
    <header className="w-full h-[70vh] relative overflow-hidden">
      {/* Navigation - slides down from top */}
      <div className={`absolute top-0 left-0 right-0 z-20 p-6 md:p-8 transition-transform duration-1000 ease-out ${
        showContent ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="text-xs font-light tracking-wider text-portfolio-muted uppercase">
              CRIB
            </div>
            <div className="text-xs font-light tracking-wider text-portfolio-muted uppercase">
              PORTFOLIO
            </div>
          </div>
        </div>
      </div>
      
      {/* Particle Animation */}
      <div className={`absolute inset-0 z-10 transition-opacity duration-[2000ms] ease-out ${
        showParticles ? 'opacity-100' : 'opacity-0'
      }`}>
        <ParticleHero />
      </div>
    </header>
  );
};

export default PortfolioHeader;