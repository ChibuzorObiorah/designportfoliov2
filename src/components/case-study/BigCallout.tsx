import React from 'react';

interface BigCalloutProps {
  text: string;
  className?: string;
}

const BigCallout: React.FC<BigCalloutProps> = ({
  text,
  className = ''
}) => {
  return (
    <div className={`flex items-center justify-start px-0 py-8 relative w-full ${className}`}>
      <div className="font-['IBM_Plex_Sans_Condensed'] font-semibold text-[36px] text-fg-1 w-full text-left">
        <p className="leading-[48px] break-words">{text}</p>
      </div>
    </div>
  );
};

export default BigCallout;
