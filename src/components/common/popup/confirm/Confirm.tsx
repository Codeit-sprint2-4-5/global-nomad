import { RefObject } from 'react';
import BaseButton from '@/components/common/button/BaseButton';
import classNames from 'classnames/bind';
import styles from './Confirm.module.scss';

const cn = classNames.bind(styles);

interface Props {
  text: string;
  dialogRef: RefObject<HTMLDialogElement>;
}

export default function Popup({ text, dialogRef }: Props) {
  const handleCloseClick = () => {
    if (!dialogRef.current) return;
    dialogRef.current.close();
  };

  return (
    <>
      <dialog className={cn('container')} ref={dialogRef}>
        <p className={cn('text')}>{text}</p>
        <div className={cn('button')}>
          <BaseButton onClick={handleCloseClick} size={'md'} text={'확인'} />
        </div>
      </dialog>
    </>
  );
}
