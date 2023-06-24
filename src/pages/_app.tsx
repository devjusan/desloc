import { useEffect } from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '../css/theme';
import createEmotionCache from '../lib/createEmotionCache';
import Footer from '../components/core/footer';
import { GlobalStyles } from '../css/global';
import Header from '../components/core/header';
import PagesMenu from '../components/core/pages-menu';

const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        <Header />
        <PagesMenu />
        <Component {...pageProps} />
        <ToastContainer />
        <Footer />
      </ThemeProvider>
    </CacheProvider>
  );
}
