import { useState, useEffect } from 'react';
import ParticleHero from './ParticleHero';

const PortfolioHeader = () => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Show content after particle animation starts (3.5 seconds delay)
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 3500);

    return () => clearTimeout(timer);
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
      <div className="absolute inset-0 z-10">
        <ParticleHero />
      </div>
    </header>
  );
};

export default PortfolioHeader;