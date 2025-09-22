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

  const logo = (
    <div
      className="flex flex-row gap-2.5 items-center justify-center"
      data-oid="oi_ijq7"
    >
      <div className="text-logo text-white" data-oid="kwnzxuh">
        CHIB_
      </div>
    </div>
  );

  const menuItems = (
    <div
      className="flex flex-row text-caption-1 gap-4 items-center text-white"
      data-oid="6sjq9_."
    >
      <Link
        to="/"
        className="cursor-pointer hover:opacity-80 transition-opacity"
        data-oid="3-amhkb"
      >
        WORK
      </Link>
      <Link
        to="/about"
        className="cursor-pointer hover:opacity-80 transition-opacity"
        data-oid="2qfaku."
      >
        ABOUT
      </Link>
      <Link
        to="/photography"
        className="cursor-pointer hover:opacity-80 transition-opacity"
        data-oid="e80xep:"
      >
        PHOTOGRAPHY
      </Link>
      <Link
        to="/copilot-context"
        className="cursor-pointer hover:opacity-80 transition-opacity"
        data-oid="f61b7td"
      >
        COPILOT CONTEXT
      </Link>
    </div>
  );

  const currentState = state || scrollState;

  if (currentState === "On Scroll Up") {
    return (
      <div
        className="bg-[rgba(26,26,26,0.2)] backdrop-blur-sm relative rounded-2xl w-full transition-all duration-300"
        data-oid="5a7fpok"
      >
        <div
          className="flex flex-row items-center relative w-full"
          data-oid="mzk5s8t"
        >
          <div
            className="flex flex-row items-center justify-between px-[16px] sm:px-[32px] md:px-[48px] lg:px-[60px] py-6 relative w-full mx-auto"
            data-oid="r4zlton"
          >
            {logo}
            {menuItems}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="bg-black relative w-full transition-all duration-300"
      data-oid="691u-iv"
    >
      <div
        className="flex flex-row items-center relative w-full"
        data-oid="zscg-30"
      >
        <div
          className="flex flex-row items-center justify-between px-[16px] sm:px-[32px] md:px-[48px] lg:px-[60px] py-6 relative w-full mx-auto"
          data-oid="qtd75_q"
        >
          {logo}
          {menuItems}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
