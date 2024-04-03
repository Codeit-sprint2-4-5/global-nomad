import SideNavMenu from '@/components/common/sideNavMenu/SideNavMenu';
import Layout from '@/components/common/layout/Layout';
import { useEffect } from 'react';
import Router from 'next/router';
import useRouteStore from '@/stores/useRoute';
import throttle from '@/function/throttle';

export default function Mypage() {
  const handleResize = throttle(() => {
    if (window.innerWidth > 767) {
      Router.push('/mypage/myinfo', undefined, { shallow: true });
    }
  }, 200);

  useEffect(() => {
    handleResize();
    useRouteStore.setState({ prevRoute: '/mypage' });
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Layout>
      <SideNavMenu initialState='' />
    </Layout>
  );
}
