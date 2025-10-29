import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    console.error('ErrorBoundary caught an error:', error);
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen bg-bg-1 text-fg-1 flex items-center justify-center">
          <div className="text-center space-y-4 max-w-md mx-auto p-6">
            <h1 className="text-title-2 text-brand">Something went wrong</h1>
            <p className="text-body-1 text-fg-2">
              This might be due to network restrictions or a temporary issue.
            </p>
            <div className="space-y-2 text-caption-1 text-fg-3">
              <p>Try these solutions:</p>
              <ul className="text-left space-y-1">
                <li>• Check your internet connection</li>
                <li>• Disable any ad blockers or security extensions</li>
                <li>• Try accessing from a different network</li>
                <li>• Clear your browser cache</li>
              </ul>
            </div>
            <div className="flex gap-3 justify-center">
              <button 
                onClick={() => window.location.reload()} 
                className="px-4 py-2 bg-brand text-bg-1 rounded hover:bg-brand/90 transition-colors"
              >
                Refresh Page
              </button>
              <button 
                onClick={() => window.history.back()} 
                className="px-4 py-2 bg-bg-2 text-fg-1 rounded hover:bg-bg-3 transition-colors"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;