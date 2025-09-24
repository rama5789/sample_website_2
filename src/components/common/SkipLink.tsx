import React from 'react';

export const SkipLink: React.FC = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 z-[100] bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-br-md focus:ring-2 focus:ring-fuchsia-500 focus:outline-none"
    >
      Skip to main content
    </a>
  );
};
