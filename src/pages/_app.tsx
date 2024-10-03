import type { AppProps } from "next/app";
import { DefaultTheme, ThemeProvider } from "styled-components";
import { GlobalStyle } from "@styles/styled-components";
import "@styles/global/index.scss";
import MetaHead from "@components/heads/MetaHead";
import { light, dark, media, scroll, colors } from "@styles/styled-components";
import { useCallback, useEffect, useMemo } from "react";
import { BaseLayout } from "@layouts/BaseLayout";
import {
  THEME_KEY,
  ThemeModeProvider,
  useTheme,
} from "@providers/themeModeProvider";
import Cookies from "js-cookie";

export enum ThemeMode {
  LIGHT = "light",
  DARK = "dark",
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <ThemeModeProvider>
        <ThemeConsumerWrapper Component={Component} pageProps={pageProps} />
      </ThemeModeProvider>
    </>
  );
}

const ThemeConsumerWrapper = ({
  Component,
  pageProps,
}: {
  Component: any;
  pageProps: any;
}) => {
  const { theme: mode, setTheme } = useTheme();

  const detectSystemTheme = useCallback(() => {
    return window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
      ? ThemeMode.DARK
      : ThemeMode.LIGHT;
  }, []);

  useEffect(() => {
    const savedTheme: any = Cookies.get(THEME_KEY) as ThemeMode;

    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      const systemTheme = detectSystemTheme();
      setTheme(systemTheme);
    }
  }, []);

  const theme = useMemo<DefaultTheme>(() => {
    const themeColors = mode === ThemeMode.LIGHT ? light.colors : dark.colors;
    return {
      colors: {
        ...colors,
        ...themeColors,
      },
      media,
      scroll,
    };
  }, [mode]);

  return (
    <ThemeProvider theme={theme}>
      <MetaHead />
      <BaseLayout>
        <Component {...pageProps} />
        <div id="modal" />
      </BaseLayout>
    </ThemeProvider>
  );
};
