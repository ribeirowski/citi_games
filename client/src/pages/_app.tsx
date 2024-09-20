import isPropValid from "@emotion/is-prop-valid";
import { AppProps } from "next/app";
import Head from "next/head";
import { StyleSheetManager, ThemeProvider } from "styled-components";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import GlobalStyles from "../styles/global";
import theme from "../styles/theme";

const queryClient = new QueryClient();

function App({ Component, pageProps }: AppProps) {
  return (
    <StyleSheetManager shouldForwardProp={isPropValid}>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Head>
            <title>Next.js Boilerplate</title>
            <link
              rel="shortcut icon"
              href="/img/icon-192.png"
              type="image/x-icon"
            />
            <link rel="apple-touch-icon" href="/img/icon-512.png" />
            <link rel="manifest" href="/manifest.json" />
            <meta name="theme-color" content="#06092B" />
            <meta name="description" content="A simple boilerplate for next.js" />
          </Head>
          <GlobalStyles />
          <Component {...pageProps} />
        </QueryClientProvider>
      </ThemeProvider>
    </StyleSheetManager>
  );
}

export default App;
