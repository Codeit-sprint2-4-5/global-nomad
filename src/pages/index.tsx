import MainPage from '@/components/domain/main/MainPage';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scal=1' />
        <link rel='icon' href='favicon.ico' />
        <title>Global Nomad</title>
      </Head>
      <MainPage />
    </>
  );
}
