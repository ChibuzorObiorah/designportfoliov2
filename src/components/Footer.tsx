import React from 'react';
import ParticleAnimation from './ParticleAnimation.tsx';

const Footer = () => {
  return (
    <div className="bg-bg-1 flex flex-col gap-[120px] items-center justify-end p-0 relative w-full">
      {/* Footer Menu */}
      <div className="relative rounded-2xl shrink-0 w-full">
        <div className="flex flex-row items-center overflow-clip relative w-full">
          <div className="flex flex-row items-center justify-between px-[16px] sm:px-[32px] md:px-[48px] lg:px-[60px] py-6 relative w-full mx-auto">
            {/* Left side - Copyright */}
            <div className="flex flex-row gap-4 items-center justify-start p-0 relative shrink-0">
              <div className="font-ibm-plex-mono font-semibold leading-[0] relative text-fg-1 text-[14px] text-left text-nowrap tracking-[-0.28px]">
                <p className="block leading-[normal] whitespace-pre">
                  2025 CHIBUZOR OBIORAH
                </p>
              </div>
            </div>
            
            {/* Right side - Menu Items */}
            <div className="flex flex-row font-ibm-plex-mono font-semibold gap-4 items-center justify-start leading-[0] relative text-fg-1 text-[14px] text-left text-nowrap tracking-[-0.28px]">
              <div className="relative shrink-0 cursor-pointer hover:opacity-80 transition-opacity">
                <p className="block leading-[normal] text-nowrap whitespace-pre">
                  ABOUT
                </p>
              </div>
              <div className="relative shrink-0 cursor-pointer hover:opacity-80 transition-opacity">
                <p className="block leading-[normal] text-nowrap whitespace-pre">
                  LINKEDIN
                </p>
              </div>
              <div className="relative shrink-0 cursor-pointer hover:opacity-80 transition-opacity">
                <p className="block leading-[normal] text-nowrap whitespace-pre">
                  RESUME
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Particle Animation Section */}
      <div className="bg-bg-1 h-[200px] shrink-0 w-full">
        <ParticleAnimation />
      </div>
    </div>
  );
};

export default Footer; 