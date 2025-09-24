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
      <div className="text-title-2 text-fg-1 w-full text-left">
        <p className="break-words">{text}</p>
      </div>
    </div>
  );
};

export default BigCallout;
