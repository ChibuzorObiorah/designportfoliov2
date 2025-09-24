import React from 'react';

interface SectionHeaderProps {
  title: string;
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  className = ''
}) => {
  return (
    <div className={`flex gap-2 items-center grow min-h-px min-w-px ${className}`}>
      <div className="font-['IBM_Plex_Mono'] font-semibold text-fg-2 text-[14px] tracking-[-0.28px]">
        <p className="leading-[20px] whitespace-pre">{title}</p>
      </div>
    </div>
  );
};

export default SectionHeader;
