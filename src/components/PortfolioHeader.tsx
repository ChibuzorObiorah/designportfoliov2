import { useState, useEffect } from 'react';
import ParticleHero from './ParticleHero';

const PortfolioHeader = () => {
  const [showParticles, setShowParticles] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Start particle fade-in immediately
    const particleTimer = setTimeout(() => {
      setShowParticles(true);
    }, 200);

    // Show navigation after particles are visible
    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 1500);

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
            <div className="text-caption-2 font-light tracking-wider text-colors-fg-2 uppercase">
              CRIB
            </div>
            <div className="text-caption-2 font-light tracking-wider text-colors-fg-2 uppercase">
              PORTFOLIO
            </div>
          </div>
        </div>
      </div>
      
      {/* Particle Animation with dissolve effect */}
      <div className={`absolute inset-0 z-10 transition-opacity duration-1200 ease-out ${
        showParticles ? 'opacity-100' : 'opacity-0'
      }`}>
        <ParticleHero />
      </div>
    </header>
  );
};

export default PortfolioHeader;