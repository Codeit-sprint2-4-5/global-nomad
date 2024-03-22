import classNames from 'classnames/bind';
import Link from 'next/link';
import Image from 'next/image';
import { IMAGE } from '@/constants';
import style from './FormHeader.module.scss';

const cn = classNames.bind(style);

const { logo } = IMAGE;

export default function FormHeader() {
  return (
    <div className={cn('form-header')}>
      <Link href='/'>
        <div className={cn('header')}>
          <Image className={cn('header-logo')} src={logo.auth.src} alt={logo.auth.alt} sizes={'100%'} fill priority />
        </div>
      </Link>
    </div>
  );
}
