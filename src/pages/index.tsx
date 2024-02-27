import Head from 'next/head';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Global Nomad</title>
      </Head>
      <h1>hi</h1>
    </>
  );
}
