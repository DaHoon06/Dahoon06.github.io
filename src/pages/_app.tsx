import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { GlobalStyle, theme } from "@styles/styled-components";
import "@styles/global/index.scss";
import MetaHead from "@components/heads/MetaHead";
import { BaseLayout } from "@layouts/BaseLayout";
import "react-tooltip/dist/react-tooltip.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />

      <ThemeProvider theme={theme}>
        <MetaHead />
        <BaseLayout>
          <Component {...pageProps} />
          <div id="modal" />
        </BaseLayout>
      </ThemeProvider>
    </>
  );
}
