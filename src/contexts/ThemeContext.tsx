import React, { useState, useEffect, createContext, useMemo } from 'react';

export type Theme = 'light' | 'dark' | 'system';

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'light' | 'dark';
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    try {
      return (localStorage.getItem('theme') as Theme) || 'system';
    } catch (e) {
      return 'system';
    }
  });

  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const applyTheme = (t: Theme) => {
      let currentTheme: 'light' | 'dark';
      if (t === 'system') {
        currentTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      } else {
        currentTheme = t;
      }

      document.documentElement.classList.toggle('dark', currentTheme === 'dark');
      setResolvedTheme(currentTheme);
    };

    applyTheme(theme);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => applyTheme(theme);

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    try {
      localStorage.setItem('theme', newTheme);
    } catch (e) {
      /* Fails silently if localStorage is not available */
    }
    setThemeState(newTheme);
  };

  const value = useMemo(() => ({ theme, setTheme, resolvedTheme }), [theme, resolvedTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
