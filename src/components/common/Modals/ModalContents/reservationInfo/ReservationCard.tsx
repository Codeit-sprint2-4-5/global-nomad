import ReservationTag from '@/components/common/ReservationTag';
import classNames from 'classnames/bind';
import styles from './Reservaiton.module.scss';
import BaseButton from '@/components/common/button/BaseButton';
const cn = classNames.bind(styles);

interface ReservationStatusProps {
  selected: 'pending' | 'declined' | 'confirmed';
}
function ReservationStatus({ selected }: ReservationStatusProps) {
  //버튼 클릭시 status 변경하는 프롭 받아오기
  switch (selected) {
    case 'pending':
      return (
        <>
          <BaseButton size="sm" text="확정하기" />
          <BaseButton size="sm" variant="outline" text="거절하기" />
        </>
      );
      break;
    case 'declined':
      return <ReservationTag status="declined" />;
      break;
    case 'confirmed':
      return <ReservationTag status="confirmed" />;
      break;
    default:
      return <p>ddddd</p>;
      break;
  }
}

export default function ReservationCard({ selected }: ReservationStatusProps) {
  return (
    <li className={cn('reservation-card-item')}>
      <p className={cn('reservation-card-item-info')}>
        닉네임<span>정만철</span>
      </p>
      <p className={cn('reservation-card-item-info')}>
        인원<span>12명</span>
      </p>
      <div className={cn('reservation-card-item-status')}>
        <ReservationStatus selected={selected} />
      </div>
    </li>
  );
}
