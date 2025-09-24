import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import { SunIcon, MoonIcon, MonitorIcon } from '../icons';

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const options = [
    { value: 'light', icon: SunIcon },
    { value: 'dark', icon: MoonIcon },
    { value: 'system', icon: MonitorIcon },
  ] as const;

  return (
    <div className="flex items-center rounded-full bg-gray-200 dark:bg-gray-700 p-1">
      {options.map(opt => (
        <button
          key={opt.value}
          onClick={() => setTheme(opt.value)}
          className={`p-1.5 rounded-full transition-colors duration-200 ${
            theme === opt.value
              ? 'bg-white dark:bg-gray-900 text-fuchsia-500'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
          }`}
          aria-label={`Set theme to ${opt.value}`}
        >
          <opt.icon className="h-5 w-5" />
        </button>
      ))}
    </div>
  );
};
