import Image from 'next/image';
import { MouseEvent } from 'react';
import { ICON } from '@/constants';
import styles from './AddActivityForm.module.scss';
import classNames from 'classnames/bind';

const { cancel } = ICON;

const cn = classNames.bind(styles);

interface Props {
  onDeleteImageUrl: (e: MouseEvent<HTMLButtonElement>) => void;
  imageUrl: string;
  id?: string;
}

export default function ImageList({ onDeleteImageUrl, imageUrl, id }: Props) {
  return (
    <div className={cn('file-preview-list')}>
      <button className={cn('file-preview-item-cancel')} id={id && id} type='button' onClick={onDeleteImageUrl}>
        <Image src={cancel.default.src} alt={cancel.default.alt} fill />
      </button>
      <Image
        className={cn('file-preview-item')}
        src={imageUrl}
        width={180}
        height={180}
        alt='배너이미지'
        style={{ objectFit: 'cover' }}
      />
    </div>
  );
}
