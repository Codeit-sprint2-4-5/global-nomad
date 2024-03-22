import Image from 'next/image';
import styles from './card.module.scss';
import { Reservation } from '@/types/myReservation';
import classNames from 'classnames/bind';
import clsx from 'clsx';

const cn = classNames.bind(styles);

interface CardProps {
  reservationsInfo: Reservation;
  handleCancelReservation: (id: number) => void;
  handleWriteReview: (reservationInfo: Reservation) => void;
}
export default function Card({
  reservationsInfo,
  handleCancelReservation,
  handleWriteReview,
}: CardProps) {
  const statusText = clsx({
    '예약 신청': reservationsInfo.status === 'pending',
    '예약 완료': reservationsInfo.status === 'confirmed',
    '체험 완료': reservationsInfo.status === 'completed',
    '예약 거절': reservationsInfo.status === 'declined',
    '예약 취소': reservationsInfo.status === 'canceled',
  });

  const buttonContent = clsx({
    '예약 취소': reservationsInfo.status === 'pending',
    '후기 작성': reservationsInfo.status === 'completed',
  });

  const handleButtonClick = () => {
    if (reservationsInfo.status === 'pending') {
      handleCancelReservation(reservationsInfo.id);
    }
    if (reservationsInfo.status === 'completed') {
      handleWriteReview(reservationsInfo);
    }
  };
  return (
    <div className={cn('card-container')}>
      <Image
        src={reservationsInfo.activity.bannerImageUrl}
        width={204}
        height={204}
        alt="배너이미지"
        className={cn('card-image')}
      />
      <div className={cn('card-info-container')}>
        <div className={cn('info-section')}>
          <div className={cn('status', `${reservationsInfo.status}`)}>
            {statusText}
          </div>
          <div className={cn('title')}>{reservationsInfo.activity.title}</div>
          <div className={cn('details')}>
            {reservationsInfo.date} · {reservationsInfo.startTime} -
            {reservationsInfo.endTime} · {reservationsInfo.headCount}명
          </div>
        </div>

        <div className={cn('price-section')}>
          <div className={cn('price')}>
            ₩{reservationsInfo.totalPrice.toLocaleString()}
          </div>

          {buttonContent && (
            <button
              className={cn('action-button', `${reservationsInfo.status}`)}
              onClick={handleButtonClick}
            >
              {buttonContent}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
