import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/glass-effect.css";

interface NavbarProps {
  state?: "Rest" | "On Scroll Up";
}

const Navbar = ({ state = "Rest" }: NavbarProps) => {
  const [scrollState, setScrollState] = useState<"Rest" | "On Scroll Up">(
    "Rest",
  );
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [selectedTab, setSelectedTab] = useState<"work" | "about" | null>("work");
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show navbar when scrolling up, hide when scrolling down
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past 100px - hide navbar
        setIsVisible(false);
        setScrollState("Rest");
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show navbar
        setIsVisible(true);
        setScrollState("On Scroll Up");
      } else if (currentScrollY <= 100) {
        // At top of page - always show navbar
        setIsVisible(true);
        setScrollState("Rest");
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Update selected tab based on current route
  useEffect(() => {
    if (location.pathname === "/about") {
      setSelectedTab("about");
    } else if (location.pathname === "/") {
      setSelectedTab("work");
    } else {
      // For case study pages and other routes, don't select any tab
      setSelectedTab(null);
    }
  }, [location.pathname]);

  const handleTabClick = (tab: "work" | "about") => {
    setSelectedTab(tab);
  };

  const logo = (
    <Link 
      to="/" 
      className="flex items-center justify-center px-6 py-2 cursor-pointer"
      onClick={() => handleTabClick("work")}
    >
      <div className="font-['Rubik_Mono_One'] text-[14px] text-fg-1 tracking-[-0.28px]">
        CHIB
      </div>
    </Link>
  );

  const toggleOptions = (
    <div className="glass-toggle" data-selected={selectedTab}>
      <div 
        className={`toggle-option ${selectedTab === "work" ? "active" : ""}`}
        onClick={() => handleTabClick("work")}
      >
        <Link to="/" className="text-[12px] font-['IBM_Plex_Mono'] tracking-[-0.24px] uppercase font-medium">
          WORK
        </Link>
      </div>
      <div 
        className={`toggle-option ${selectedTab === "about" ? "active" : ""}`}
        onClick={() => handleTabClick("about")}
      >
        <Link to="/about" className="text-[12px] font-['IBM_Plex_Mono'] tracking-[-0.24px] uppercase font-medium">
          ABOUT
        </Link>
      </div>
    </div>
  );

  const currentState = state || scrollState;

  return (
    <div 
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-transform duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="flex items-center justify-between px-[56px] sm:px-[72px] md:px-[88px] lg:px-[100px] py-6 relative w-full mx-auto">
        {/* Logo glass container */}
        <div className="glass-container">
          {logo}
        </div>
        
        {/* Toggle options glass container */}
        {toggleOptions}
      </div>
    </div>
  );
};

export default Navbar;
