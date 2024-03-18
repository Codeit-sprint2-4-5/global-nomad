import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import BaseButton from '../button/BaseButton';
import { PostformatDate, displayDateFormat } from '../Modals/ModalContents/utills';
import Modal from '../Modals';
import CountMemberInput from './CountMemberInput';
import DateForm from '../Modals/ModalContents/dateForm/DateForm';
import { queryKey } from '@/apis/quertKey';
import { getAbledResrvationList } from '@/apis/get/getAbledResrvations';
import styles from './FloatingBox.module.scss';
import classNames from 'classnames/bind';
import { postReservation } from '@/apis/post/postReservation';

const cn = classNames.bind(styles);

export default function FloatingBox({ price = 10000 }) {
  const [totalPrice, setTotalPrice] = useState(price);
  const [showModal, setShowModal] = useState('');
  const router = useRouter(); // 나중에 라우터에서 id 값 받아와서 아래 함수 id 에 넣어주기

  const { data: abledReservationListData } = useQuery({
    queryKey: queryKey.reservation(152, 2024, '04'),
    queryFn: () => getAbledResrvationList(152, 2024, '04'),
    staleTime: 1000 * 60 * 5,
  });
  console.log('asdf', abledReservationListData);

  const { control, handleSubmit, setValue, getValues, watch } = useForm<any>({
    defaultValues: { headCount: 1, date: abledReservationListData },
  });
  const countMemberValue = watch('headCount');
  const getdate = getValues('date');

  const postReservationMutation = useMutation({
    mutationFn: (data: unknown) => postReservation(152, data),
    //라우터에서 id 받아오기
    onSuccess: () => alert('예약 신청 성공'),
  });

  const handelOnSubmit: SubmitHandler<any> = (data) => {
    postReservationMutation.mutate({ headCount: data.headCount, scheduleId: data.scheduleId });
  };

  useEffect(() => {
    setTotalPrice(price * countMemberValue);
  }, [countMemberValue, price]);
  //const countMember = register('countMember', { required: true });

  return (
    <section className={cn('floating-box')}>
      <h1 className={cn('floating-box-head')}>
        <span className={cn('floating-box-head-point')}>
          {'\uFFE6'} {price.toLocaleString()}
        </span>
        /
        <button onClick={() => setShowModal('countMemberInput')} className={cn('floating-box-head-btn')}>
          <span> 총 {getValues('headCount')}</span>인
        </button>
      </h1>
      <form onSubmit={handleSubmit(handelOnSubmit)} className={cn('floating-box-form')}>
        <DateForm
          className={cn('floating-box-form-date')}
          abledReservationListData={abledReservationListData}
          control={control}
          setValue={setValue}
          getdate={getdate}
        />
        <button type='button' onClick={() => setShowModal('dateForm')} className={cn('floating-box-form-modal-btn')}>
          {getdate ? displayDateFormat(getdate) : '날짜 선택하기'}
        </button>

        <CountMemberInput
          control={control}
          onDownDisabled={watch('headCount') <= 1}
          setValue={setValue}
          // onClickCountUp={handleClickCountUp(getValues('countMember'))}
          // onClickCountDown={handleClickCountDown(getValues('countMember'))}
        />

        <BaseButton type='submit' text='예약하기' size='lg' />
      </form>
      <article className={cn('total-price')}>
        <h2>총 합계</h2>
        <h2>
          {'\uFFE6'} {totalPrice.toLocaleString()}
        </h2>
      </article>
      {showModal === 'dateForm' && (
        <Modal
          modalType='dateForm'
          abledReservationListData={abledReservationListData}
          control={control}
          setShowModal={setShowModal}
        />
      )}
      {showModal === 'countMemberInput' && (
        <Modal modalType='countMemberInput' control={control} setShowModal={setShowModal} setValue={setValue} />
      )}
    </section>
  );
}
