import { useEffect, useState } from "react";

interface StaticHeroProps {
  isMobile?: boolean;
}

export default function StaticHero({ isMobile = false }: StaticHeroProps) {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    // Quick font load check with short timeout
    let isMounted = true;
    const fontLoadTimeout = setTimeout(() => {
      if (isMounted) setFontLoaded(true);
    }, 1000); // 1 second timeout
    
    async function loadFont() {
      try {
        await document.fonts.load("900 100px 'Rubik Mono One'");
        if (isMounted) {
          clearTimeout(fontLoadTimeout);
          setFontLoaded(true);
        }
      } catch (e) {
        console.warn('Font loading failed in StaticHero, using fallback:', e);
        if (isMounted) {
          clearTimeout(fontLoadTimeout);
          setFontLoaded(true);
        }
      }
    }
    loadFont();
    
    return () => {
      isMounted = false;
      clearTimeout(fontLoadTimeout);
    };
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-[#020b0d]">
      <div 
        className={`transition-opacity duration-500 ${fontLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{
          fontFamily: "'Rubik Mono One', 'Courier New', monospace",
          fontSize: isMobile ? '50px' : '100px',
          fontWeight: 900,
          color: 'white',
          textAlign: 'center',
          textShadow: '0 0 20px rgba(255, 248, 76, 0.3), 0 0 40px rgba(255, 248, 76, 0.2)',
          letterSpacing: '0.05em',
        }}
      >
        CHIBUZOR
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#020b0d]/20 pointer-events-none" />
    </div>
  );
}