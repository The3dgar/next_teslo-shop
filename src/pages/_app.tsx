import '@/styles/globals.css';
import { SessionProvider } from 'next-auth/react';

import { ThemeProvider, CssBaseline } from '@mui/material';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';

import { lightTheme } from '@/themes';
import { AuthProvider, CartProvider, UiProvider } from '@/context';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider>
      <SWRConfig
        value={{
          fetcher: (resource, init) =>
            fetch(resource, init).then((res) => res.json()),
        }}>
        <AuthProvider>
          <CartProvider>
            <UiProvider>
              <ThemeProvider theme={lightTheme}>
                <CssBaseline />
                <Component {...pageProps} />
              </ThemeProvider>
            </UiProvider>
          </CartProvider>
        </AuthProvider>
      </SWRConfig>
    </SessionProvider>
  );
}
