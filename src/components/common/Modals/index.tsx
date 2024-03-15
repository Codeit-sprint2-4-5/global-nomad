import { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import { createPortal } from 'react-dom';
import Review from './ModalContents/Review';
import Notifications from './ModalContents/Notifications';
import ReservationInfo from './ModalContents/ReservationInfo';
import DateForm from './ModalContents/dateForm/DateForm';

import { ICON } from '@/constants';
import styles from './Modal.module.scss';
import classNames from 'classnames/bind';
import { Control } from 'react-hook-form';

const { x } = ICON;

const cn = classNames.bind(styles);

const MODAL_TYPE = {
  review: 'review',
  reservationInfo: 'reservationInfo',
  dateForm: 'dateForm',
  notifications: 'notifications',
};

interface ModalProps {
  modalType: keyof typeof MODAL_TYPE;
  setShowModal: Dispatch<SetStateAction<string>>;
  control?: Control<any>;
  data?: any;
  id?: number;
}

export default function Modal({ modalType, setShowModal, ...porps }: ModalProps) {
  const HandelClickCloseModal = () => {
    setShowModal('');
  };
  const ModalContents = {
    [MODAL_TYPE.review]: {
      component: Review,
      props: { id: porps.id as number, HandelClickCloseModal: HandelClickCloseModal },
    },
    [MODAL_TYPE.reservationInfo]: { component: ReservationInfo, props: {} },
    [MODAL_TYPE.dateForm]: {
      component: DateForm,
      props: { HandelClickCloseModal: HandelClickCloseModal, control: porps.control },
    },
    [MODAL_TYPE.notifications]: { component: Notifications, props: {} },
  };
  const { component: ContestComponent, props } = ModalContents[modalType];

  return createPortal(
    <>
      <section className={cn('modal-content', { notifications: modalType === 'notifications' })}>
        <Image src={x.default.src} alt={x.default.alt} width={40} height={40} onClick={HandelClickCloseModal} />
        <ContestComponent HandelClickCloseModal={HandelClickCloseModal} {...props} />
      </section>
      <div
        className={cn('modal-background', { 'no-background': modalType !== 'review' })}
        onClick={HandelClickCloseModal}
      ></div>
    </>,
    document.body
  );
}
