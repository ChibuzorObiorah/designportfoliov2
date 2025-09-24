import React from 'react';

interface TextBlockProps {
  title?: string;
  content: string;
  className?: string;
}

const TextBlock: React.FC<TextBlockProps> = ({
  title,
  content,
  className = ''
}) => {
  return (
    <div className={`flex flex-col gap-3 items-start text-fg-1 pb-4 pt-0 px-0 relative shrink-0 w-[670px] ${className}`}>
      {title && (
        <div className="font-['IBM_Plex_Sans_Condensed'] font-semibold text-[24px] tracking-[-0.48px] w-full">
          <p className="leading-[32px]">{title}</p>
        </div>
      )}
      <div className="font-['IBM_Plex_Sans'] text-[16px] text-fg-2 w-full">
        <p className="leading-[22px] whitespace-pre-wrap">{content}</p>
      </div>
    </div>
  );
};

export default TextBlock;
