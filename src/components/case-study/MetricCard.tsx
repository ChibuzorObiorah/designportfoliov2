import React from 'react';
import { useCountAnimation } from '@/hooks/useCountAnimation';

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
  // Parse the value to extract number, prefix, and suffix
  const parseValue = (val: string) => {
    const match = val.match(/^([+-]?)(\d+)(.*)$/);
    if (match) {
      const [, prefix, number, suffix] = match;
      return {
        target: parseInt(number, 10),
        prefix,
        suffix
      };
    }
    // Fallback for non-numeric values
    return { target: 0, prefix: '', suffix: val };
  };

  const { target, prefix, suffix } = parseValue(value);
  const { displayValue, elementRef } = useCountAnimation({
    target,
    prefix,
    suffix,
    duration: 2000
  });

  return (
    <div 
      ref={elementRef}
      className={`flex flex-col gap-1 items-start text-fg-1 w-[165px] ${className}`}
    >
      <div className="text-display w-full">
        <p>{displayValue}</p>
      </div>
      <div className="text-caption-2 text-fg-2 uppercase w-full">
        <p>{label}</p>
      </div>
    </div>
  );
};

export default MetricCard;
