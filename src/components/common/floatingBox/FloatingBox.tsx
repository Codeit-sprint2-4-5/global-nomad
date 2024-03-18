import { useEffect, useState } from 'react';
import DateForm from '../Modals/ModalContents/dateForm/DateForm';
import styles from './FloatingBox.module.scss';
import classNames from 'classnames/bind';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { queryKey } from '@/apis/quertKey';
import { getAbledResrvationList } from '@/apis/get/getAbledResrvations';
import BaseButton from '../button/BaseButton';
import Input from '../Input/Input';
import { PostformatDate } from '../Modals/ModalContents/utills';
import Modal from '../Modals';
import { ICON } from '@/constants';
import Image from 'next/image';
import CountMemberInput from './CountMemberInput';

const { add, subtract } = ICON;
const cn = classNames.bind(styles);

const mook = {
  price: 100000,
};

export interface AbledReservationListData {
  date: string;
  times: { id: number; startTime: string; endTime: string }[];
}

export default function FloatingBox() {
  const [totalPrice, setTotalPrice] = useState(0);
  const [showModal, setShowModal] = useState('');

  const { data: abledReservationListData } = useQuery({
    queryKey: queryKey.reservation(152, 2024, '04'),
    queryFn: () => getAbledResrvationList(152, 2024, '04'),
    staleTime: 1000 * 60 * 5,
  });
  console.log('asdf', abledReservationListData);

  const { control, handleSubmit, setValue, getValues, watch } = useForm<any>({
    defaultValues: { countMember: 1, date: abledReservationListData },
  });
  const countMemberValue = watch('countMember');
  const watchDate = watch('abled-time');
  const getdate = getValues('date');

  const handelOnSubmit: SubmitHandler<any> = (data) => {
    const postData = data;

    const postDate = PostformatDate(data.date);
    postData.date = postDate;
    console.log(postData);
  };

  useEffect(() => {
    setTotalPrice(mook?.price * countMemberValue);
  }, [countMemberValue]);
  //const countMember = register('countMember', { required: true });

  return (
    <section className={cn('floating-box')}>
      <h1 className={cn('floating-box-head')}>
        <span className={cn('floating-box-head-point')}>
          {'\uFFE6'} {mook?.price.toLocaleString()}
        </span>
        /
        <button onClick={() => setShowModal('countMemberInput')} className={cn('floating-box-head-btn')}>
          <span> 총 {getValues('countMember')}</span>인
        </button>
      </h1>
      <form onSubmit={handleSubmit(handelOnSubmit)} className={cn('floating-box-form')}>
        <DateForm
          className={cn('floating-box-form-date')}
          abledReservationListData={abledReservationListData}
          control={control}
          setValue={setValue}
        />
        <button type='button' onClick={() => setShowModal('dateForm')} className={cn('floating-box-form-modal-btn')}>
          {getdate ? getdate : '날짜 선택하기'}
        </button>

        <CountMemberInput
          control={control}
          onDownDisabled={watch('countMember') <= 1}
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
