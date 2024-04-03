import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import BaseButton from '../button/BaseButton';
import Modal from '../Modals';
import CountMemberInput from './CountMemberInput';
import DateForm from '../Modals/ModalContents/dateForm/DateForm';
import styles from './FloatingBox.module.scss';
import classNames from 'classnames/bind';
import { postReservation } from '@/apis/post/postReservation';
import { GetActivityDetail } from '@/types';
import Confirm from '../popup/confirm/Confirm';
import Question from '../popup/question/Question';

const cn = classNames.bind(styles);

export interface PostReservationData {
  headCount: number;
  scheduleId: number;
}

interface Props {
  detailData: GetActivityDetail;
}

export default function FloatingBox({ detailData }: Props) {
  const confrimRef = useRef<HTMLDialogElement>(null);
  const questionRef = useRef<HTMLDialogElement>(null);
  const [totalPrice, setTotalPrice] = useState(detailData.price);
  const [showModal, setShowModal] = useState('');
  const [reservedTime, setReservedTime] = useState('');
  const { control, handleSubmit, setValue, getValues, watch } = useForm<PostReservationData>({
    defaultValues: { headCount: 1 },
  });
  const router = useRouter();
  const { query } = router;
  const id = Number(query.id);
  const countMemberValue = watch('headCount');
  const abledShedule = detailData.schedules;

  const hadledirectSignin = () => {
    router.push('/signin');
  };

  const handleSelectSchedule = (id: number) => {
    setValue('scheduleId', id);
    const nextReservedTime = abledShedule.find((item) => item.id === id);
    const nextText = nextReservedTime
      ? `${nextReservedTime.date.split('-').join('/')} ${nextReservedTime.startTime} ~ ${nextReservedTime.endTime}`
      : '';
    setReservedTime(nextText);
  };

  const handleShowConfrim = () => {
    if (!confrimRef.current) return;
    confrimRef.current.showModal();
  };

  const postReservationMutation = useMutation({
    mutationFn: (data: PostReservationData) => postReservation(id, data),
    onSuccess: () => handleShowConfrim(),
    onError: (e: any) => {
      if (e.response?.status === 401) {
        if (!questionRef.current) return;
        questionRef.current.showModal();
      }
    },
  });

  const handelOnSubmit: SubmitHandler<PostReservationData> = (data) => {
    postReservationMutation.mutate(data);
  };

  useMemo(() => {
    setTotalPrice(detailData.price * countMemberValue);
  }, [countMemberValue, detailData.price]);

  return (
    <section className={cn('floating-box')}>
      <h1 className={cn('floating-box-head')}>
        <span className={cn('floating-box-head-point')}>
          {'\uFFE6'} {detailData.price.toLocaleString()}
        </span>
        /인
      </h1>
      <form onSubmit={handleSubmit(handelOnSubmit)} className={cn('floating-box-form')}>
        <DateForm
          className={cn('floating-box-form-date')}
          control={control}
          handleSelectSchedule={handleSelectSchedule}
          abledShedule={abledShedule}
        />
        <button type='button' onClick={() => setShowModal('dateForm')} className={cn('floating-box-form-modal-btn')}>
          {reservedTime ? reservedTime : '날짜 선택하기'}
        </button>

        <CountMemberInput control={control} onDownDisabled={watch('headCount') <= 1} setValue={setValue} />

        <BaseButton type='submit' text='예약하기' size='lg' />
      </form>
      <article className={cn('total-price')}>
        <h2>총 합계</h2>
        <h2>
          {'\uFFE6'} {totalPrice.toLocaleString()}
          <button onClick={() => setShowModal('countMemberInput')} className={cn('floating-box-counthead-btn')}>
            <span> / 총 {getValues('headCount')}인</span>
          </button>
        </h2>
      </article>
      {showModal === 'dateForm' && (
        <Modal
          modalType='dateForm'
          control={control}
          setShowModal={setShowModal}
          handleSelectSchedule={handleSelectSchedule}
          abledShedule={abledShedule}
        />
      )}
      {showModal === 'countMemberInput' && (
        <Modal modalType='countMemberInput' control={control} setShowModal={setShowModal} setValue={setValue} />
      )}
      <Confirm text='예약 완료되었습니다' dialogRef={confrimRef} />
      <Question dialogRef={questionRef} text='로그인 하시겠습니까?' onClick={hadledirectSignin} buttonText='예' />
    </section>
  );
}
