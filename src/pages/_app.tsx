import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '../theme/theme';
import createEmotionCache from '../createEmotionCache';
import { Footer, Header } from '../componets';
import { Box } from '@mui/system';
import CartContextProvider from "../store/context/cart"
import { appWithTranslation } from 'next-i18next';
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Amazin</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <CartContextProvider>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Header />
          <Box sx={{
            marginLeft: "3%",
            marginRight: "3%",
            flexGrow: 1,
            padding: theme.spacing(3),
          }}>
            <Component {...pageProps} />
          </Box>
          <Footer />
        </ThemeProvider>
      </CartContextProvider>
    </CacheProvider>
  );
}

export default appWithTranslation(MyApp)