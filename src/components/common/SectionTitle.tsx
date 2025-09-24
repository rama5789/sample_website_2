import React from 'react';

export const SectionTitle: React.FC<{ subtitle: string; children: React.ReactNode }> = ({
  subtitle,
  children,
}) => (
  <div className="max-w-3xl mx-auto text-center">
    <h2 className="text-base font-semibold text-fuchsia-600 dark:text-fuchsia-400 tracking-wide uppercase">
      {subtitle}
    </h2>
    <p className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
      {children}
    </p>
  </div>
);
