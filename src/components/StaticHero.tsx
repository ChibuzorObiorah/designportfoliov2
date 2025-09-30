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
        className={`transition-opacity duration-500 font-['Rubik_Mono_One'] font-black text-white text-center tracking-wider hero-glow ${
          fontLoaded ? 'opacity-100' : 'opacity-0'
        } ${
          isMobile ? 'text-[50px]' : 'text-[100px]'
        }`}
      >
        CHIBUZOR
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#020b0d]/20 pointer-events-none" />
    </div>
  );
}