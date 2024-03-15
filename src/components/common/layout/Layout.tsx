import { ReactNode } from 'react';
import Footer from '@/components/common/footer/Footer';
import classNames from 'classnames/bind';
import styles from './Layout.module.scss';

const cn = classNames.bind(styles);

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* TODO gnb 컴포넌트 만들어지면 import해서 넣기 */}
      <main className={cn('main')}>{children}</main>
      <Footer />
    </>
  );
}
