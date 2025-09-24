import React from 'react';

interface QuoteCardProps {
  quote: string;
  author: string;
  className?: string;
}

const QuoteCard: React.FC<QuoteCardProps> = ({
  quote,
  author,
  className = ''
}) => {
  return (
    <div className={`bg-bg-2 grow min-h-px min-w-px relative rounded-[12px] ${className}`}>
      <div className="flex flex-col gap-3 items-center justify-center p-6 text-center w-full">
        <div className="font-['IBM_Plex_Sans'] text-[14px] text-fg-1 w-full">
          <p className="leading-[20px]">"{quote}"</p>
        </div>
        <div className="font-['IBM_Plex_Mono'] font-medium text-fg-2 text-[12px] tracking-[-0.24px] uppercase w-full">
          <p className="leading-[18px] whitespace-pre-wrap">~ {author}</p>
        </div>
      </div>
      <div 
        className="absolute border border-neutral-700 border-solid inset-0 pointer-events-none rounded-[12px]"
        aria-hidden="true"
      />
    </div>
  );
};

export default QuoteCard;
