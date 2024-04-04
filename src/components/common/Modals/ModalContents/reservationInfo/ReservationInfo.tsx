import { useEffect, useState, useRef } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import ReservationCard from './ReservationCard';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { useCustomInfiniteQuery } from '@/hooks/useCustomInfiniteQuery';
import Dropdown from '@/components/common/dropdown/Dropdown';
import { getMyActivitiesReservation, getReservedScheduleDate } from '@/apis/get/getAbledResrvations';
import { changeDateToStringFormat } from '../utills';
import { ReservationCardType } from '@/types/reservationInfo';
import styles from './ReservationInfo.module.scss';
import classNames from 'classnames/bind';
import { queryKey } from '@/apis/queryKey';

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
  onClickCloseModal?: () => void;
}

const STATUSES = ['신청', '확정', '거절'];

export default function ReservationInfo({ date = '2024-03-20', activityId = 178, onClickCloseModal }: Props) {
  const queryClient = useQueryClient();
  const [selectedStatus, setSelectedStatus] = useState<ReservationCardType['status']>('pending');
  const [scheduledId, setScheduledId] = useState<number>(0);
  const [schedule, setSchedule] = useState();
  const observerRef = useRef<HTMLDivElement>(null);

  const { data: reservedScheduleData, isSuccess } = useQuery({
    queryKey: queryKey.getMyReservationUseDate(date),
    queryFn: () => getReservedScheduleDate(activityId, date),
  });

  const {
    fetchNextPage,
    hasNextPage,
    isFetching,
    data: reservationStatusData,
  } = useCustomInfiniteQuery({
    queryKey: queryKey.getMyReservationsUseTime(scheduledId, selectedStatus),
    queryFn: ({ pageParam }: { pageParam: number | undefined }) =>
      getMyActivitiesReservation(activityId, scheduledId, selectedStatus, 10, { pageParam }),
  });

  useIntersectionObserver({
    observerRef,
    hasNextPage,
    isFetching,
    fetchNextPage,
  });

  useEffect(() => {
    if (reservedScheduleData) {
      setScheduledId(reservedScheduleData[0]?.scheduleId);

      const nextschedule = reservedScheduleData?.find(
        (schedule: ReservationSchedule) => scheduledId === schedule.scheduleId
      );
      setSchedule(nextschedule?.count);
    }
  }, [reservedScheduleData, scheduledId]);

  const dropdownList = reservedScheduleData?.map((reservation: ReservationSchedule) => ({
    id: reservation.scheduleId,
    title: `${reservation.startTime} ~ ${reservation.endTime}`,
  })) ?? [{ id: scheduledId }];

  const cardList = reservationStatusData?.pages ?? [];

  const onSelectedId = async (id: number) => {
    setScheduledId(id);
    queryClient.invalidateQueries({ queryKey: queryKey.getMyReservationsUseTime(id, selectedStatus) });
  };

  const handleSelect = (status: string) => {
    const newSelectedStatus = status === '신청' ? 'pending' : status === '확정' ? 'confirmed' : 'declined';
    setSelectedStatus(newSelectedStatus);
    queryClient.invalidateQueries({ queryKey: queryKey.getMyReservationsUseTime(scheduledId, status) });
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
          <Dropdown name='dateDropdown' onSelectedId={onSelectedId} labelText=' ' lists={dropdownList} />
        </div>
        <div className={cn('reservation-history')}>
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
                  onClickCloseModal={onClickCloseModal}
                />
              ))
            ) : (
              <li className={cn('reservation-card-item-none')}>예약 내역이 없습니다</li>
            )}
          </ul>
        </div>
      </article>
      {reservedScheduleData?.length !== 0 && (
        <div className={cn('reservation-current-situation')}>
          <h2>예약 현황</h2>
          <h2>{reservedScheduleData?.length}</h2>
        </div>
      )}
    </>
  );
}
