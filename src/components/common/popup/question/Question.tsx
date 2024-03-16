import { RefObject } from 'react';
import BaseButton from '@/components/common/button/BaseButton';
import classNames from 'classnames/bind';
import styles from './Question.module.scss';

const cn = classNames.bind(styles);

interface Props {
  text: string;
  dialogRef: RefObject<HTMLDialogElement>;
  buttonText: string;
  onClick: () => void;
}

export default function Question({ dialogRef, text, buttonText, onClick }: Props) {
  const handleButtonClick = () => {
    onClick();
    handleCloseClick();
  };

  const handleCloseClick = () => {
    if (!dialogRef.current) return;
    dialogRef.current.close();
  };

  return (
    <>
      <dialog className={cn('container')} ref={dialogRef}>
        <p className={cn('text')}>{text}</p>
        <div className={cn('button-group')}>
          <BaseButton onClick={handleCloseClick} size='sm' variant='outline' text='아니오' />
          <BaseButton onClick={handleButtonClick} size='sm' text={buttonText} />
        </div>
      </dialog>
    </>
  );
}
