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
    <div className={`bg-bg-2 relative rounded-[12px] h-full w-full ${className}`}>
      <div className="flex flex-col gap-3 items-center justify-center p-6 text-center w-full h-full">
        <div className="text-body-1 text-fg-1 w-full">
          <p>"{quote}"</p>
        </div>
        <div className="text-caption-2 text-fg-2 uppercase w-full">
          <p className="whitespace-pre-wrap">~ {author}</p>
        </div>
      </div>
      <div 
        className="absolute border-2 border-neutral-700 border-solid inset-0 pointer-events-none rounded-[12px]"
        aria-hidden="true"
      />
    </div>
  );
};

export default QuoteCard;
