import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface NavbarProps {
  state?: "Rest" | "On Scroll Up";
}

const Navbar = ({ state = "Rest" }: NavbarProps) => {
  const [scrollState, setScrollState] = useState<"Rest" | "On Scroll Up">(
    "Rest",
  );
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 100) {
        setScrollState("On Scroll Up");
      } else {
        setScrollState("Rest");
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Glass container component for consistent styling
  const GlassContainer = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div
      className={`bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] border border-[rgba(255,255,255,0.2)] rounded-[12px] shadow-[0px_8px_16px_0px_rgba(0,0,0,0.14),0px_0px_2px_0px_rgba(0,0,0,0.12)] ${className}`}
    >
      {children}
    </div>
  );

  const logo = (
    <div className="flex items-center justify-center">
      <div className="font-['Rubik_Mono_One'] text-[14px] text-fg-1 tracking-[-0.28px]">
        CHIB
      </div>
    </div>
  );

  const menuItems = (
    <div className="flex font-['IBM_Plex_Mono'] gap-4 items-center text-[12px] text-fg-1 tracking-[-0.24px] uppercase font-medium">
      <Link
        to="/"
        className="cursor-pointer hover:opacity-80 transition-opacity"
      >
        WORK
      </Link>
      <Link
        to="/about"
        className="cursor-pointer hover:opacity-80 transition-opacity"
      >
        ABOUT
      </Link>
      <Link
        to="/photography"
        className="cursor-pointer hover:opacity-80 transition-opacity"
      >
        PHOTOGRAPHY
      </Link>
      <Link
        to="/copilot-context"
        className="cursor-pointer hover:opacity-80 transition-opacity"
      >
        COPILOT CONTEXT
      </Link>
    </div>
  );

  const currentState = state || scrollState;

  if (currentState === "On Scroll Up") {
    return (
      <div className="bg-bg-1 relative w-full transition-all duration-300">
        <div className="flex items-center justify-between px-20 py-6 relative w-full mx-auto">
          {/* Logo glass container */}
          <GlassContainer className="px-8 py-4">
            {logo}
          </GlassContainer>
          
          {/* Menu items glass container */}
          <GlassContainer className="px-8 py-4">
            {menuItems}
          </GlassContainer>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-bg-1 relative w-full transition-all duration-300">
      <div className="flex items-center justify-between px-20 py-6 relative w-full mx-auto">
        {/* Logo glass container */}
        <GlassContainer className="px-8 py-4">
          {logo}
        </GlassContainer>
        
        {/* Menu items glass container */}
        <GlassContainer className="px-8 py-4">
          {menuItems}
        </GlassContainer>
      </div>
    </div>
  );
};

export default Navbar;
