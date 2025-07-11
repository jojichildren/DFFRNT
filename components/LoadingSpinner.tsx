
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="w-16 h-16 border-4 border-surface border-t-primary rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
