import styles from './ReservationTag.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

interface ReservationProps {
  status: 'declined' | 'confirmed';
}

export default function ReservationTag({ status }: ReservationProps) {
  const stastusText = status === 'confirmed' ? '확정' : '거절';
  return <div className={cn('tag', { declined: status === 'declined' })}>예약 {stastusText}</div>;
}
