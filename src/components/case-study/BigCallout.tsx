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
    <div className={`flex gap-2 items-center justify-center px-0 py-8 relative w-full ${className}`}>
      <div className="font-['IBM_Plex_Sans_Condensed'] font-semibold text-[36px] text-fg-1 grow leading-[0] min-h-px min-w-px not-italic relative shrink-0">
        <p className="leading-[normal]">{text}</p>
      </div>
    </div>
  );
};

export default BigCallout;
