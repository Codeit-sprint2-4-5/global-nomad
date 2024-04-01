import Calendar from '@/components/domain/myreservedstatus/Calendar';
import classNames from 'classnames/bind';
import styles from '@/components/domain/myreservedstatus/Calendar.module.scss';

const cn = classNames.bind(styles);

export default function ReservationStatus() {
  return <Calendar />;
}
