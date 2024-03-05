import { useState } from 'react';
import ReservationCard from './ReservationCard';
import styles from './Reservaiton.module.scss';
import classNames from 'classnames/bind';
import { useQuery } from '@tanstack/react-query';
import { getMyActivitiesReservation, getMyActivityReservationThisMonth } from '@/apis/get/getAbledResrvations';
import Dropdown from '@/components/common/dropdown/Dropdown';

const cn = classNames.bind(styles);

//const reservationStatus = ['신청', '확정', '거절'];

const mook = {
  count: {
    declined: 0,
    confirmed: 0,
    pending: 0,
  },
};
const reservationStatus = [{ pending: '신청' }, { confirmed: '확정' }, { declined: '거절' }];

export default function ReservationInfo() {
  const [selected, setSelected] = useState<'declined' | 'confirmed' | 'pending'>('declined');
  const { data } = useQuery({
    queryKey: ['my-activities', 'reservation', 'month'],
    queryFn: () => getMyActivityReservationThisMonth(179, 2024, '03'),
  });

  const { data: reservationStatusData } = useQuery({
    queryKey: ['my-activities', 'reservation', 'time'],
    queryFn: () => getMyActivitiesReservation(179, 324),
  });

  console.log('내체험시간대별예약내역조회', reservationStatusData);

  // const handleSelect = (status: string) => {
  //   setSelected(status);
  // };

  return (
    <>
      <h1 className={cn('title')}>예약 정보</h1>

      <ul className={cn('reservation-status')}>
        {/* {Object.keys(reservationStatus)?.map((status) => (
          <li key={status}>
            <button
              className={cn('reservation-status-item', { selected: selected === status })}
              onClick={() => handleSelect(status)}
            >
              {reservationStatus && reservationStatus[status]} {mook.count[status]}
            </button>
          </li>
        ))} */}
      </ul>
      <article className={cn('reservation-info-container')}>
        <div>
          <h3 className={cn('little-title')}>예약 날짜</h3>
          <p className={cn('reservation-date')}>2024년 2월 12일</p>

          {/* <Dropdown name="dateDropdown" lists={} /> */}
        </div>
        <div>
          <h3 className={cn('little-title')}>예약 내역</h3>
          <ul className={cn('reservation-card-list')}>
            {reservationStatusData?.reservations.length !== 0 ? (
              reservationStatusData?.reservations.map((reservation: any) => (
                <ReservationCard key={reservation.id} selected={selected} />
              ))
            ) : (
              <li className={cn('reservation-card-item-none')}>예약 내역이 없습니다</li>
            )}
          </ul>
        </div>
      </article>
      <div className={cn('reservation-current-situation')}>
        <h2>예약 현황</h2>
        <h2>{reservationStatusData?.totalCount}</h2>
      </div>
    </>
  );
}
