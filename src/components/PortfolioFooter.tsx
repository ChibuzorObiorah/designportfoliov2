import { useState, useEffect } from "react";

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
    <footer
      className={`w-full bg-colors-brand py-16 md:py-24 transition-all duration-1000 ease-out ${
        showFooter ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
      data-oid="yco9_c_"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8" data-oid="5s6xt8.">
        <div
          className="flex items-center justify-between text-caption-2 font-light tracking-wider text-colors-bg-1 uppercase mb-8"
          data-oid="mh8_6tc"
        >
          <span data-oid="x_g3746">NOT CLOSE STUDIO</span>
          <span data-oid="284us3f">MARC LINCH STONE</span>
        </div>

        <div className="text-center" data-oid="ximyppy">
          <h2
            className="text-display text-colors-bg-1 tracking-tighter"
            data-oid=":9khv42"
          >
            CHIBUZOR
          </h2>
        </div>
      </div>
    </footer>
  );
};

export default PortfolioFooter;
