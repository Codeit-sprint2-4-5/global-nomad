import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { auth } from '@/apis/auth';

export default function Auth() {
  const router = useRouter();

  const handleRouteChangeStart = async (asPath: string) => {
    if (['/', '/signin', '/signup'].includes(asPath)) return;

    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (!accessToken || !refreshToken) return router.push('/signin');
    try {
      await auth.getUser();
      return;
    } catch (e: any) {
      if (e.response.status === 401) {
        if (refreshToken) {
          try {
            const response = await auth.tokensUpdate(refreshToken);
            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('refreshToken', response.refreshToken);
            await auth.getUser();
          } catch {
            router.push('/signin');
            return;
          }
        }
      }
    }
  };

  useEffect(() => {
    if (typeof window !== undefined) router.events.on('routeChangeStart', handleRouteChangeStart);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
    };
  }, [router]);

  return <></>;
}
