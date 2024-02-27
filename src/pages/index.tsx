import Head from 'next/head';
import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Global Nomad</title>
      </Head>
      <Link href="/scss-example">scss-example</Link>
    </>
  );
}
