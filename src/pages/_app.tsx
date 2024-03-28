import type { AppProps } from 'next/app';
import '@/styles/base/index.scss';
import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import NextNProgress from 'nextjs-progressbar';

const queryClient = new QueryClient();

function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <NextNProgress color='#ffc23d' startPosition={0.3} stopDelayMs={200} height={5} showOnShallow={true} />
      <Component {...pageProps} />
    </Providers>
  );
}
