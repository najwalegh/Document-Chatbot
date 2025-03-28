import '@/styles/base.css';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import client from './apollo';
import { ApolloProvider } from '@apollo/client';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <main className={inter.variable}>
        <ApolloProvider client={client}>
          <Component {...pageProps} />
        </ApolloProvider>     
       </main>
    </>
  );
}

export default MyApp;
