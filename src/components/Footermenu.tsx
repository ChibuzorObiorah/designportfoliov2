import React from 'react';

const Footermenu = () => {
  return (
    <div className="flex flex-row items-center justify-between py-6 relative rounded-2xl w-full">
      {/* Left side - Copyright */}
      <div className="flex flex-row gap-4 items-center justify-start">
        <div className="font-['IBM_Plex_Mono'] font-semibold leading-[0] relative text-[#020b0d] text-[14px] text-left tracking-[-0.28px]">
          <p className="block leading-[normal] whitespace-pre">
            2025 CHIBUZOR OBIORAH
          </p>
        </div>
      </div>
      
      {/* Right side - Menu Items */}
      <div className="flex flex-row font-['IBM_Plex_Mono'] font-semibold gap-4 items-center justify-start leading-[0] relative text-[#020b0d] text-[14px] text-left tracking-[-0.28px]">
        <div className="relative cursor-pointer hover:opacity-80 transition-opacity">
          <p className="block leading-[normal] text-nowrap whitespace-pre">
            ABOUT
          </p>
        </div>
        <div className="relative cursor-pointer hover:opacity-80 transition-opacity">
          <p className="block leading-[normal] text-nowrap whitespace-pre">
            LINKEDIN
          </p>
        </div>
        <div className="relative cursor-pointer hover:opacity-80 transition-opacity">
          <p className="block leading-[normal] text-nowrap whitespace-pre">
            RESUME
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footermenu; 