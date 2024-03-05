import styles from '../ModalContents.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

const reservationStatus = ['신청', '확정', '거절'];

export default function ReservationInfo() {
  const handleSelect = () => {};
  return (
    <>
      <h1 className={cn('title')}>예약 정보</h1>

      <div className={cn('reservation-status')}>
        <button className={cn('reservation-status')}>신청</button>{' '}
      </div>
    </>
  );
}
