import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import ReservationCard from './ReservationCard';
import Dropdown from '@/components/common/dropdown/Dropdown';
import { getMyActivitiesReservation, getReservedScheduleDate } from '@/apis/get/getAbledResrvations';
import { changeDateToStringFormat } from '../utills';
import { ReservationCardType } from '@/types/reservationInfo';
import { queryKey } from '@/apis/quertKey';
import styles from './ReservationInfo.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

export interface ReservationSchedule {
  count: { pending: number; confirmed: number; declined: number };
  endTime: string;
  scheduleId: number;
  startTime: string;
}

interface Props {
  date?: string;
  activityId?: number;
  scheduleId?: number;
}

const STATUSES = ['신청', '확정', '거절'];

export default function ReservationInfo({ date = '2024-03-20', activityId = 178, scheduleId = 764 }: Props) {
  const queryClient = useQueryClient();
  const [selectedStatus, setSelectedStatus] = useState<ReservationCardType['status']>('pending');
  const [scheduledId, setScheduledId] = useState<number>(scheduleId);

  const { data: reservedScheduleData } = useQuery({
    queryKey: queryKey.getMyReservationUseDate(date),
    queryFn: () => getReservedScheduleDate(activityId, date),
  });

  const { data: reservationStatusData } = useQuery({
    queryKey: queryKey.getMyReservationsUseTime(scheduledId, selectedStatus),
    queryFn: () => getMyActivitiesReservation(activityId, scheduledId, selectedStatus),
  });

  const dropdownList = () =>
    reservedScheduleData
      ? reservedScheduleData.map((reservation: ReservationSchedule) => ({
          id: reservation.scheduleId,
          title: `${reservation.startTime} ~ ${reservation.endTime}`,
        }))
      : [{ id: scheduleId }];

  const cardList = reservationStatusData?.reservations ?? [];

  const onSelectedId = async (id: number) => {
    setScheduledId(id);
    queryClient.invalidateQueries({ queryKey: queryKey.getMyReservationsUseTime(scheduledId, selectedStatus) });
  };

  const schedule = reservedScheduleData?.find(
    (schedule: ReservationSchedule) => scheduledId === schedule.scheduleId
  ).count;

  const handleSelect = (status: string) => {
    const newSelectedStatus = status === '신청' ? 'pending' : status === '확정' ? 'confirmed' : 'declined';
    setSelectedStatus(newSelectedStatus);
    queryClient.invalidateQueries({ queryKey: queryKey.getMyReservationsUseTime(scheduledId, selectedStatus) });
  };

  return (
    <>
      <h1 className={cn('title')}>예약 정보</h1>

      <ul className={cn('reservation-status')}>
        {STATUSES.map((status) => (
          <button
            key={status}
            onClick={() => handleSelect(status)}
            className={cn('reservation-status-item', {
              selected:
                selectedStatus === (status === '신청' ? 'pending' : status === '확정' ? 'confirmed' : 'declined'),
            })}
          >
            {status} {schedule?.[status === '신청' ? 'pending' : status === '확정' ? 'confirmed' : 'declined']}
          </button>
        ))}
      </ul>
      <article className={cn('reservation-info-container')}>
        <div>
          <h3 className={cn('little-title')}>예약 날짜</h3>
          <p className={cn('reservation-date')}>{changeDateToStringFormat(date)}</p>

          <Dropdown name='dateDropdown' onSelectedId={onSelectedId} labelText=' ' lists={dropdownList()} />
        </div>
        <div>
          <h3 className={cn('little-title')}>예약 내역</h3>
          <ul className={cn('reservation-card-list')}>
            {cardList?.length !== 0 ? (
              cardList?.map((reservation: ReservationCardType) => (
                <ReservationCard
                  key={reservation.id}
                  nickname={reservation.nickname}
                  headCount={reservation.headCount}
                  reservationId={reservation.id}
                  selectedStatus={selectedStatus}
                  status={reservation.status}
                  activityId={reservation.activityId}
                />
              ))
            ) : (
              <li className={cn('reservation-card-item-none')}>예약 내역이 없습니다</li>
            )}
          </ul>
        </div>
      </article>
      <div className={cn('reservation-current-situation')}>
        <h2>예약 현황</h2>
        <h2>{reservedScheduleData?.length}</h2>
      </div>
    </>
  );
}
