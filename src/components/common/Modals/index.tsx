import { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import Image from 'next/image';
import { createPortal } from 'react-dom';
import Review from './ModalContents/Review';

import { ICON } from '@/constants';
import styles from './Modal.module.scss';
import classNames from 'classnames/bind';
import ReservationInfo from './ModalContents/ReservationInfo';
import Notifications from './ModalContents/Notifications';

const { x } = ICON;

const cn = classNames.bind(styles);

const MODAL_TYPE = {
  review: 'review',
  reservationInfo: 'reservationInfo',
  date: 'date',
  notifications: 'notifications',
};

interface ModalProps {
  modalType: keyof typeof MODAL_TYPE;
  setShowModal: Dispatch<SetStateAction<string>>;
}

const ModalContents = {
  [MODAL_TYPE.review]: Review,
  [MODAL_TYPE.reservationInfo]: ReservationInfo,
  [MODAL_TYPE.date]: '',
  [MODAL_TYPE.notifications]: Notifications,
};

export default function Modal({ modalType, setShowModal }: ModalProps) {
  const ContestComponent = ModalContents[modalType];

  const noBackground = modalType === 'notifications' || modalType === 'date';

  const HandelClickCloseModal = () => {
    setShowModal('');
  };

  return createPortal(
    <>
      <section className={cn('modal-content', { notifications: modalType === 'notifications' })}>
        <Image src={x.default.src} alt={x.default.alt} width={40} height={40} onClick={HandelClickCloseModal} />
        <ContestComponent />
      </section>
      <div className={cn('modal-background', { 'no-background': noBackground })} onClick={HandelClickCloseModal}></div>
    </>,
    document.body
  );
}
