import { createContext, useCallback, useContext, useEffect, useMemo, useState, ReactNode } from 'react';
import Cookies from 'js-cookie';

export enum ThemeMode {
  LIGHT = 'light',
  DARK = 'dark',
}

type ThemeContextType = {
  theme: ThemeMode;
  isDarkMode: boolean;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const THEME_KEY = 'noginogi-theme';

export const ThemeModeProvider = ({ children }: { children: React.ReactNode }) => {
  const defaultTheme = Cookies.get(THEME_KEY) as ThemeMode || ThemeMode.LIGHT;
  const [theme, setTheme] = useState<ThemeMode>(defaultTheme);
  const isDarkMode = useMemo(() => theme === ThemeMode.DARK, [theme]);

  useEffect(() => {
    const storedTheme = Cookies.get(THEME_KEY);
    if (storedTheme && [ThemeMode.LIGHT, ThemeMode.DARK].includes(storedTheme)) {
      setTheme(storedTheme as ThemeMode);
    }
  }, []);

  useEffect(() => {
    Cookies.set(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    if (theme !== null) {
      setTheme((prev) => (prev === ThemeMode.LIGHT ? ThemeMode.DARK : ThemeMode.LIGHT));
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};