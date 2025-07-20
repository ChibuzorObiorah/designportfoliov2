import { useState, useEffect } from 'react';

const PortfolioFooter = () => {
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    // Show footer after grid animation completes (5 seconds delay)
    const timer = setTimeout(() => {
      setShowFooter(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <footer className={`w-full bg-colors-brand py-16 md:py-24 transition-all duration-1000 ease-out ${
      showFooter ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
    }`}>
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between text-xs font-light tracking-wider text-colors-bg-1 uppercase mb-8">
          <span>NOT CLOSE STUDIO</span>
          <span>MARC LINCH STONE</span>
        </div>
        
        <div className="text-center">
          <h2 className="text-6xl md:text-8xl lg:text-9xl font-bold text-colors-bg-1 font-ibm-plex tracking-tighter leading-none">
            CHIBUZOR
          </h2>
        </div>
      </div>
    </footer>
  );
};

export default PortfolioFooter;