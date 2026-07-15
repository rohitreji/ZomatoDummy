import React from 'react';

const Loader = ({ fullPage = false, size = 'md' }) => {
  const sizes = {
    sm: 'w-6 h-6 border-2',
    md: 'w-12 h-12 border-3',
    lg: 'w-20 h-20 border-4',
  };

  const spinner = (
    <div
      className={`${sizes[size]} border-primary border-t-transparent rounded-full animate-spin`}
      role="status"
    />
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-md flex items-center justify-center z-50">
        {spinner}
      </div>
    );
  }

  return <div className="flex items-center justify-center p-8">{spinner}</div>;
};

export const RestaurantSkeleton = () => {
  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-outline-variant/30 shadow-sm animate-pulse">
      <div className="h-48 md:h-64 bg-surface-container-highest" />
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <div className="h-6 bg-surface-container-highest rounded w-2/3" />
          <div className="h-6 bg-surface-container-highest rounded w-1/6" />
        </div>
        <div className="h-4 bg-surface-container-highest rounded w-1/2" />
        <div className="pt-4 border-t border-outline-variant/20 flex justify-between">
          <div className="h-5 bg-surface-container-highest rounded w-1/4" />
          <div className="h-5 bg-surface-container-highest rounded w-1/4" />
        </div>
      </div>
    </div>
  );
};

export default Loader;
