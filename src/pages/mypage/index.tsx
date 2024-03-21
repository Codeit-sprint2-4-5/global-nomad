import SideNavMenu from '@/components/common/sideNavMenu/SideNavMenu';
import Layout from '@/components/common/layout/Layout';
import { useEffect } from 'react';
import Router from 'next/router';
import useRouteStore from '@/stores/useRoute';
import debounce from '@/function/debounce';

export default function Mypage() {
  const handleResize = debounce(() => {
    if (window.innerWidth > 767) {
      Router.push('/mypage/myinfo', undefined, { shallow: true });
    }
  }, 20);

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
