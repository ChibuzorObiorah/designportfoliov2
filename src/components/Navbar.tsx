import { useState, useEffect } from 'react';

interface NavbarProps {
  state?: "Rest" | "On Scroll Up";
}

const Navbar = ({ state = "Rest" }: NavbarProps) => {
  const [scrollState, setScrollState] = useState<"Rest" | "On Scroll Up">("Rest");
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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const logo = (
    <div className="flex flex-row gap-2.5 items-center justify-center">
      <div className="text-logo text-white">
        CHIB_
      </div>
    </div>
  );

  const menuItems = (
    <div className="flex flex-row text-caption-1 gap-4 items-center text-white">
      <div className="cursor-pointer hover:opacity-80 transition-opacity">
        WORK
      </div>
      <div className="cursor-pointer hover:opacity-80 transition-opacity">
        ABOUT
      </div>
      <div className="cursor-pointer hover:opacity-80 transition-opacity">
        PHOTOGRAPHY
      </div>
    </div>
  );

  const currentState = state || scrollState;

  if (currentState === "On Scroll Up") {
    return (
      <div className="bg-[rgba(26,26,26,0.2)] backdrop-blur-sm relative rounded-2xl w-full transition-all duration-300">
        <div className="flex flex-row items-center relative w-full">
          <div className="flex flex-row items-center justify-between px-[16px] sm:px-[32px] md:px-[48px] lg:px-[60px] py-6 relative w-full mx-auto">
            {logo}
            {menuItems}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black relative w-full transition-all duration-300">
      <div className="flex flex-row items-center relative w-full">
        <div className="flex flex-row items-center justify-between px-[16px] sm:px-[32px] md:px-[48px] lg:px-[60px] py-6 relative w-full mx-auto">
          {logo}
          {menuItems}
        </div>
      </div>
    </div>
  );
};

export default Navbar;