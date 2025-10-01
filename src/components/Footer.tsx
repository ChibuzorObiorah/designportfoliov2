import React from "react";
import "../styles/textured-footer.css";
import footerTexture from "/footer-img/Textured-footer.png";

// Textured Footer Component - Using provided image
const TexturedFooter = () => {
  return (
    <div 
      className="relative w-full h-[265px] overflow-hidden"
      data-name="Textured-footer"
    >
      {/* Image-based textured background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${footerTexture})`
        }}
        data-name="Texture-img"
      />
    </div>
  );
};

const Footer = () => {
  return (
    <div
      className="bg-bg-1 flex flex-col gap-[24px] items-start relative w-full pt-[80px]"
      data-name="Footer"
    >
      {/* Footer Menu Container */}
      <div 
        className="flex items-center justify-between px-[20px] sm:px-[40px] md:px-[60px] lg:px-[80px] py-[24px] rounded-[16px] w-full"
        data-name="Footermenu"
      >
        {/* Left side - Copyright */}
        <div
          className="flex gap-[16px] items-center"
          data-name="Menu-Items"
        >
          <div
            className="font-ibm-plex-mono font-semibold leading-[0] text-fg-2 text-[12px] sm:text-[14px] text-nowrap tracking-[-0.28px]"
          >
            <p className="leading-[normal] whitespace-pre">
              2025 CHIBUZOR OBIORAH
            </p>
          </div>
        </div>

        {/* Right side - Menu Items */}
        <div
          className="flex font-ibm-plex-mono font-semibold gap-[8px] sm:gap-[12px] md:gap-[16px] items-center leading-[0] text-fg-2 text-[12px] sm:text-[14px] text-nowrap tracking-[-0.28px]"
          data-name="Menu-Items"
        >
          <a 
            href="mailto:obiorahchibuzor3@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="relative shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <p className="leading-[normal] text-nowrap whitespace-pre">
              EMAIL
            </p>
          </a>
          <a 
            href="https://www.linkedin.com/in/chibobi/"
            target="_blank"
            rel="noopener noreferrer"
            className="relative shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <p className="leading-[normal] text-nowrap whitespace-pre">
              LINKEDIN
            </p>
          </a>
          <a 
            href="https://drive.google.com/file/d/1QGsf-0iKpV6G5IJLTIx2FistmSfOX0x5/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="relative shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <p className="leading-[normal] text-nowrap whitespace-pre">
              RESUME
            </p>
          </a>
        </div>
      </div>

      {/* Textured Footer Section */}
      <div className="w-full">
        <TexturedFooter />
      </div>
    </div>
  );
};

export default Footer;
