import { RefObject } from 'react';
import { instance } from '@/apis/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import BaseButton from '@/components/common/button/BaseButton';
import classNames from 'classnames/bind';
import styles from './Question.module.scss';

const cn = classNames.bind(styles);

interface Props {
  dialogRef: RefObject<HTMLDialogElement>;
  reservationId: number;
}

export default function Question({ dialogRef, reservationId }: Props) {
  async function patchReservation() {
    await instance.patch(`/my-reservations/${reservationId}`, { status: 'canceled' });
  }

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: patchReservation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/my-reservations'] });
    },
  });

  const handleCancelClick = () => {
    mutate();
    handleCloseClick();
  };

  const handleCloseClick = () => {
    if (!dialogRef.current) return;
    dialogRef.current.close();
  };

  return (
    <>
      <dialog className={cn('container')} ref={dialogRef}>
        <p className={cn('text')}>예약을 취소하시겠어요?</p>
        <div className={cn('button-group')}>
          <BaseButton onClick={handleCloseClick} size='sm' variant='outline' text='아니오' />
          <BaseButton onClick={handleCancelClick} size='sm' text='취소하기' />
        </div>
      </dialog>
    </>
  );
}
