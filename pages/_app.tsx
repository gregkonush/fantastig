import React from 'react';
import { Provider } from 'next-auth/client';
import GlobalStyles from './../styles/GlobalStyles';
import '@fontsource/parisienne';
import '@fontsource/nunito';

export default function App({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <GlobalStyles />
      <Component {...pageProps} />
    </Provider>
  );
}
