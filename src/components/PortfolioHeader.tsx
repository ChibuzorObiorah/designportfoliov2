const PortfolioHeader = () => {
  return (
    <header className="w-full p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="text-xs font-light tracking-wider text-portfolio-muted uppercase">
            CRIB
          </div>
          <div className="text-xs font-light tracking-wider text-portfolio-muted uppercase">
            PORTFOLIO
          </div>
        </div>
        
        <div className="mt-16 md:mt-24 text-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-wider text-portfolio-text font-ibm-plex">
            CHIBUZOR
          </h1>
        </div>
      </div>
    </header>
  );
};

export default PortfolioHeader;