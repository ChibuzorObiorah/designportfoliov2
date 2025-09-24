import React from 'react';

interface ImageContainerProps {
  src?: string;
  alt?: string;
  caption?: string;
  height?: string;
  className?: string;
  showCaption?: boolean;
  fit?: 'cover' | 'contain';
  adaptToImage?: boolean;
}

const ImageContainer: React.FC<ImageContainerProps> = ({
  src = '',
  alt = 'Case study image',
  caption = 'IMAGE CAPTION',
  height = '600px',
  className = '',
  showCaption = true,
  fit = 'cover',
  adaptToImage = false
}) => {
  return (
    <div className={`flex flex-col gap-2 items-center justify-center py-6 w-full ${className}`}>
      {adaptToImage && src ? (
        <img 
          src={src}
          alt={alt}
          className="rounded-[16px] w-full h-auto object-contain"
        />
      ) : (
        <div 
          className={`bg-center ${fit === 'cover' ? 'bg-cover' : 'bg-contain'} bg-no-repeat rounded-[16px] w-full ${src ? 'bg-transparent' : 'bg-bg-2'}`}
          style={{ 
            height,
            backgroundImage: src ? `url('${src}')` : undefined
          }}
        />
      )}
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

export default ImageContainer;
