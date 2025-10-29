import { useState, useEffect } from 'react';

const NetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowWarning(false);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowWarning(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check if we're offline on mount
    if (!navigator.onLine) {
      setShowWarning(true);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!showWarning) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-brand text-bg-1 px-4 py-2 text-center">
      <div className="flex items-center justify-center gap-2">
        <span className="text-caption-1 font-medium">
          {isOnline ? 'Connection restored!' : 'No internet connection detected'}
        </span>
        {!isOnline && (
          <button
            onClick={() => window.location.reload()}
            className="text-caption-1 underline hover:no-underline"
          >
            Retry
          </button>
        )}
        <button
          onClick={() => setShowWarning(false)}
          className="text-caption-1 hover:opacity-70"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default NetworkStatus;

