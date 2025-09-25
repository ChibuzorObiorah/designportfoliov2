import React from 'react';

interface GifContainerProps {
  src?: string;
  alt?: string;
  caption?: string;
  className?: string;
  showCaption?: boolean;
}

const GifContainer: React.FC<GifContainerProps> = ({
  src = '',
  alt = 'Case study GIF',
  caption = 'GIF CAPTION',
  className = '',
  showCaption = true
}) => {
  return (
    <div className={`flex flex-col gap-2 items-center justify-center py-[1.375rem] w-full ${className}`}>
      {/* 4:3 aspect ratio container with white background */}
      <div className="bg-white rounded-[16px] w-full flex items-center justify-center p-4 aspect-[50/33]">
        {src && (
          <img 
            src={src}
            alt={alt}
            className="max-w-[70%] max-h-[70%] object-contain rounded-[8px]"
          />
        )}
      </div>
      {showCaption && (
        <div className="flex gap-2 items-center justify-center py-3 w-full">
          <div className="font-['IBM_Plex_Mono'] font-medium text-fg-2 text-[12px] tracking-[-0.24px] uppercase">
            <p className="leading-[18px]">{caption}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GifContainer;
