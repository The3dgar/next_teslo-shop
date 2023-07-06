import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { SWRConfig } from 'swr';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { ThemeProvider, CssBaseline } from '@mui/material';

import { AuthProvider, CartProvider, UiProvider } from '@/context';
import { lightTheme } from '@/themes';
import { Constans } from '@/utils';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider>
      <PayPalScriptProvider
        options={{
          clientId: Constans.PAYMENT_PAYPAL_CLIENT,
        }}>
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
      </PayPalScriptProvider>
    </SessionProvider>
  );
}
