interface PortfolioCardProps {
  title: string;
  description: string;
  tags?: string;
  height?: 'small' | 'medium' | 'large';
  className?: string;
}

const PortfolioCard = ({ 
  title, 
  description, 
  tags, 
  height = 'medium',
  className = ""
}: PortfolioCardProps) => {
  const heightClasses = {
    small: 'h-64 md:h-80',
    medium: 'h-80 md:h-96',
    large: 'h-96 md:h-[32rem] lg:h-[40rem]'
  };

  return (
    <div className={`bg-colors-bg-2 rounded-lg ${heightClasses[height]} ${className}`}>
      <div className="w-full h-full p-6 flex flex-col justify-end">
        <div className="space-y-2">
          <h3 className="text-subtitle-1 text-colors-fg-1">
            {title}
          </h3>
          <p className="text-body-1 text-colors-fg-2 leading-relaxed max-w-xs">
            {description}
          </p>
          {tags && (
            <p className="text-caption-1 text-colors-fg-3">
              {tags}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;