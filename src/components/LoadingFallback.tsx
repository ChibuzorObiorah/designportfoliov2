import React from 'react';

interface LoadingFallbackProps {
  message?: string;
}

const LoadingFallback: React.FC<LoadingFallbackProps> = ({ 
  message = "Loading..." 
}) => {
  return (
    <div className="min-h-screen bg-bg-1 text-fg-1 flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="animate-pulse">
          <div className="w-32 h-8 bg-fg-2/20 rounded mx-auto mb-4"></div>
          <div className="w-48 h-4 bg-fg-2/20 rounded mx-auto"></div>
        </div>
        <p className="text-body-1 text-fg-2">{message}</p>
      </div>
    </div>
  );
};

export default LoadingFallback;