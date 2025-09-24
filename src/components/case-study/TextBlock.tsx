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
    <div className={`flex flex-col gap-3 items-start text-fg-1 pb-4 pt-0 px-0 relative shrink-0 w-full ${className}`}>
      {title && (
        <div className="text-title-3 text-fg-1 w-full">
          <p>{title}</p>
        </div>
      )}
      <div className="text-body-1 text-fg-2 w-full">
        <p className="whitespace-pre-wrap">{content}</p>
      </div>
    </div>
  );
};

export default TextBlock;
