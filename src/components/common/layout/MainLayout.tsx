import { ReactNode } from 'react';
import Footer from '@/components/common/footer/Footer';
import classNames from 'classnames/bind';
import styles from './Layout.module.scss';
import GNB from '../GNB/GNB';

const cn = classNames.bind(styles);

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <GNB />
      <main className={cn('main', 'page')}>{children}</main>
      <Footer />
    </>
  );
}
