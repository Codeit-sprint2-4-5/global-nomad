import Account from '@/components/domain/account/Account';
import Layout from '@/components/common/layout/Layout';
import SideNavMenu from '@/components/common/sideNavMenu/SideNavMenu';
import { useRouter } from 'next/router';
import style from './Mypage.module.scss';
import classNames from 'classnames/bind';
import Test from '@/pages/test';
import { useEffect, useState } from 'react';
import useRouteStore from '@/stores/useRoute';
import throttle from '@/function/throttle';

const cn = classNames.bind(style);

export default function Mypages() {
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const { prevRoute } = useRouteStore();

  const renderComponents = () => {
    switch (id) {
      case 'myinfo':
        return <Account />;
      case 'myreservations':
        return <Test />;
      case 'myactivities':
        return <Test />;
      case 'myreservedstatus':
        return <Test />;
    }
  };

  const handleResize = throttle(() => {
    if (window.innerWidth <= 767) {
      setIsMobile(true);
      if (prevRoute === '/mypage') return;
      router.push('/mypage', undefined, { shallow: true });
      return;
    }
    setIsMobile(false);
    useRouteStore.setState({ prevRoute: '' });
  }, 100);
  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [prevRoute]);

  return (
    <Layout>
      <div className={cn('content')}>
        {!isMobile && <SideNavMenu initialState='myinfo' />}
        {renderComponents()}
      </div>
    </Layout>
  );
}
