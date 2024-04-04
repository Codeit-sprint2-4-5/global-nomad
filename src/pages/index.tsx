import MainPage from '@/components/domain/main/MainPage';
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>Global Nomad</title>
      </Head>
      <MainPage />
    </>
  );
}