import classNames from 'classnames/bind';
import Link from 'next/link';
import Image from 'next/image';
import { IMAGE } from '@/constants';
import style from '@/components/auth/formHeader/FormHeader.module.scss';

const cn = classNames.bind(style);

const { logo } = IMAGE;

export default function FormHeader() {
  return (
    <div className={cn('form-header')}>
      <Link className={cn('header')} href='/'>
        <Image className={cn('header-logo')} src={logo.auth.src} alt={logo.auth.alt} sizes={'100%'} fill priority />
      </Link>
    </div>
  );
}
