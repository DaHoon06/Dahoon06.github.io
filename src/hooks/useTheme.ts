import {ThemeMode} from "@pages/_app";
import Cookies from "js-cookie";
import {useCallback, useEffect, useMemo, useState} from "react";


type ReturnType = {
  theme: ThemeMode;
  isDarkMode: boolean;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
};

export const THEME_KEY = 'noginogi-theme';

export default function useTheme(): ReturnType {
  const defaultTheme = Cookies.get(THEME_KEY) as ThemeMode;
  const [theme, setTheme] = useState<ThemeMode>(defaultTheme || ThemeMode.LIGHT);
  const isDarkMode = useMemo(() => theme === ThemeMode.DARK, [theme]);

  const initTheme = useCallback(() => {
    const initialize = Cookies.get(THEME_KEY);
    if (initialize) setTheme(initialize);
  }, []);

  useEffect(() => {
    const mode = Cookies.get(THEME_KEY);
    if (mode && [ThemeMode.LIGHT, ThemeMode.DARK].includes(mode)) setTheme(mode);
  }, []);

  useEffect(() => {
    initTheme();
  }, []);

  useEffect(() => {
    Cookies.set(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === ThemeMode.LIGHT) ? ThemeMode.DARK : ThemeMode.LIGHT);
  }, []);

  return {
    theme,
    isDarkMode,
    setTheme,
    toggleTheme
  }
}


