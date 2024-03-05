import { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import Image from 'next/image';
import { createPortal } from 'react-dom';
import { Control, UseFormGetValues, UseFormSetValue } from 'react-hook-form';
import { AbledReservationListData } from '../floatingBox/FloatingBox';
import CountMemberInput from '../floatingBox/CountMemberInput';
import ReservationInfo from './ModalContents/ReservationInfo/ReservationInfo';
import Review from './ModalContents/Review/Review';
import Notifications from './ModalContents/Notifications/Notifications';
import DateForm from './ModalContents/dateForm/DateForm';

import { ICON } from '@/constants';
import styles from './Modal.module.scss';
import classNames from 'classnames/bind';

const { x } = ICON;

const cn = classNames.bind(styles);

const MODAL_TYPE = {
  review: 'review',
  reservationInfo: 'reservationInfo',
  dateForm: 'dateForm',
  notifications: 'notifications',
  countMemberInput: 'countMemberInput',
};

interface ModalProps {
  modalType: keyof typeof MODAL_TYPE;
  setShowModal: Dispatch<SetStateAction<string>>;
  control?: Control<any>;
  data?: any;
  id?: number;
  setValue?: UseFormSetValue<any>;
  onDownDisabled?: boolean;
}

export default function Modal({ modalType, setShowModal, ...props }: ModalProps) {
  const handleClickCloseModal = () => {
    setShowModal('');
  };
  const ModalContents = {
    [MODAL_TYPE.review]: {
      component: Review,
      prop: { id: props.id as number, onClickCloseModal: handleClickCloseModal },
    },
    [MODAL_TYPE.reservationInfo]: { component: ReservationInfo, props: {} },
    [MODAL_TYPE.dateForm]: {
      component: DateForm,
      prop: { onClickCloseModal: handleClickCloseModal, control: props.control },
    },
    [MODAL_TYPE.notifications]: { component: Notifications, prop: {} },
    [MODAL_TYPE.countMemberInput]: {
      component: CountMemberInput,
      prop: { control: props.control, setValue: props.setValue, onDownDisabled: props.onDownDisabled },
    },
  };
  const { component: ContestComponent, prop } = ModalContents[modalType];

  return createPortal(
    <>
      <section className={cn('modal-content', { notifications: modalType === 'notifications' })}>
        <Image src={x.default.src} alt={x.default.alt} width={40} height={40} onClick={handleClickCloseModal} />
        <ContestComponent onClickCloseModal={handleClickCloseModal} {...prop} />
      </section>
      <div
        className={cn('modal-background', { 'no-background': modalType !== 'review' })}
        onClick={handleClickCloseModal}
      ></div>
    </>,
    document.body
  );
}
