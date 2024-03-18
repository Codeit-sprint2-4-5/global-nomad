import React from 'react';
import Image from 'next/image';
import styles from './NodataMessage.module.scss';
import classNames from 'classnames/bind';
import { ICON, IMAGE } from '@/constants';

const cn = classNames.bind(styles);
const NoDataMessage = ({ message }: { message: string }) => {
  return (
    <div className={cn('no-data-container')}>
      <div className={cn('image-container')}>
        <Image
          src={IMAGE.noData.default.src}
          width={130}
          height={177}
          alt={IMAGE.noData.default.alt}
          className={cn('image')}
        />
      </div>
      <p className={cn('text')}>{message}</p>
    </div>
  );
};

export default NoDataMessage;
