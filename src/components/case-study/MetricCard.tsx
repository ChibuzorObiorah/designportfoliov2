import React from 'react';

interface MetricCardProps {
  label: string;
  value: string;
  className?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  className = ''
}) => {
  return (
    <div className={`flex flex-col gap-1 items-start text-fg-1 w-[165px] ${className}`}>
      <div className="font-['IBM_Plex_Mono'] font-medium text-[12px] tracking-[-0.24px] uppercase w-full">
        <p className="leading-[18px]">{label}</p>
      </div>
      <div className="font-['IBM_Plex_Sans_Condensed'] font-bold text-[68px] tracking-[-2px] w-full">
        <p className="leading-[92px]">{value}</p>
      </div>
    </div>
  );
};

export default MetricCard;
