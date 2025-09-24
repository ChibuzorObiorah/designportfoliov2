import React from 'react';

interface ContentSectionProps {
  children: React.ReactNode;
  className?: string;
}

const ContentSection: React.FC<ContentSectionProps> = ({
  children,
  className = ''
}) => {
  return (
    <div className={`flex flex-col gap-2 items-start relative shrink-0 w-[800px] ${className}`}>
      {children}
    </div>
  );
};

export default ContentSection;
