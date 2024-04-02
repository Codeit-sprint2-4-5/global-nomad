import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { auth } from '@/apis/auth';
import { useQueryClient } from '@tanstack/react-query';

export default function Auth() {
  const router = useRouter();
  const { id } = router.query;
  const queryClient = useQueryClient();

  const handleRouteChangeStart = async (asPath: string) => {
    if (['/', '/signin', '/signup', `/activityDetail/${id}`].includes(asPath)) return;

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
            queryClient.invalidateQueries({ queryKey: ['myInfo'] });
          } catch {
            router.push('/signin');
            return;
          }
        }
      }
    }
  };

  useEffect(() => {
    handleRouteChangeStart(router.asPath);
    if (typeof window !== undefined) router.events.on('routeChangeStart', handleRouteChangeStart);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
    };
  }, [router]);

  return <></>;
}
