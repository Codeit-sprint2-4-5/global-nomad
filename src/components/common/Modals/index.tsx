import { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import { createPortal } from 'react-dom';
import { Control, UseFormGetValues, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import CountMemberInput from '../floatingBox/CountMemberInput';
import ReservationInfo from './ModalContents/reservationInfo/ReservationInfo';
import Review from './ModalContents/review/Review';
import Notifications from './ModalContents/notifications/Notifications';
import DateForm from './ModalContents/dateForm/DateForm';
import { AbledReservationListData } from '@/types/dateform';
import { ICON, MODAL_TYPE } from '@/constants';
import styles from './Modal.module.scss';
import classNames from 'classnames/bind';
import { PostReservationData } from '../floatingBox/FloatingBox';

const { x } = ICON;

const cn = classNames.bind(styles);

interface ModalProps {
  modalType: keyof typeof MODAL_TYPE;
  setShowModal: Dispatch<SetStateAction<string>>;
  control?: Control<PostReservationData, any, PostReservationData>;
  id?: number;
  abledReservationListData?: AbledReservationListData[];
  setValue?: UseFormSetValue<PostReservationData>;
  onDownDisabled?: boolean;
  date?: string;
  activityId?: number;
  scheduleId?: number;
  getdate?: string;
  register?: UseFormRegister<PostReservationData>;
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
    [MODAL_TYPE.reservationInfo]: {
      component: ReservationInfo,
      prop: { date: props.date, activityId: props.activityId, scheduleId: props.scheduleId },
    },
    [MODAL_TYPE.dateForm]: {
      component: DateForm,
      prop: {
        onClickCloseModal: handleClickCloseModal,
        control: props.control,
        abledReservationListData: props.abledReservationListData,
        setValue: props.setValue,
        getdate: props.getdate,
        register: props.register,
      },
    },
    [MODAL_TYPE.notifications]: { component: Notifications, prop: {} },
    [MODAL_TYPE.countMemberInput]: {
      component: CountMemberInput,
      prop: {
        setValue: props.setValue,
        control: props.control,
        onDownDisabled: props.onDownDisabled,
      },
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
