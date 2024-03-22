import Head from "next/head";
import Link from "next/link";
import Calendar from '@/components/domain/reservationStatus/Calendar';
export default function Home() {
  return (
    <>
      <Head>
        <title>Global Nomad</title>
      </Head>
      <Link href="/scss-example">scss-example</Link>
      <Calendar />
    </>
  );
}
