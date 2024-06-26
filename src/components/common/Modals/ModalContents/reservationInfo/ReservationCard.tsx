import { useMutation, useQueryClient } from '@tanstack/react-query';
import BaseButton from '@/components/common/button/BaseButton';
import { patchReservationStatus } from '@/apis/patch/patchReservationStatus';
import ReservationTag from '@/components/common/ReservationTag';
import classNames from 'classnames/bind';
import styles from './ReservationInfo.module.scss';
import { queryKey } from '@/apis/queryKey';
const cn = classNames.bind(styles);

interface ReservationStatusProps {
  selectedStatus: 'pending' | 'declined' | 'confirmed';
  reservationId: number;
  activityId: number;
  onClickCloseModal?: () => void;
}
interface Props extends ReservationStatusProps {
  nickname: string;
  headCount: number;
  status: ReservationStatusProps['selectedStatus'];
}
function ReservationStatus({ selectedStatus, reservationId, activityId, onClickCloseModal }: ReservationStatusProps) {
  const queryClient = useQueryClient();

  const patchStatusMutation = useMutation({
    mutationFn: (data: { status: ReservationStatusProps['selectedStatus'] }) =>
      patchReservationStatus(activityId, reservationId, data),

    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: queryKey.getMyReservationsUseTime(reservationId, selectedStatus) });
      queryClient.invalidateQueries({ queryKey: [`/my-activities/${activityId}`] });
      onClickCloseModal && onClickCloseModal();
    },
  });
  const handleClickConfirmed = () => {
    patchStatusMutation.mutate({ status: 'confirmed' });
  };

  const handleClickDeclined = () => {
    patchStatusMutation.mutate({ status: 'declined' });
  };
  switch (selectedStatus) {
    case 'pending':
      return (
        <>
          <BaseButton size='sm' onClick={handleClickConfirmed} text='확정하기' />
          <BaseButton size='sm' onClick={handleClickDeclined} variant='outline' text='거절하기' />
        </>
      );
      break;
    case 'declined':
      return <ReservationTag status='declined' />;
      break;
    case 'confirmed':
      return <ReservationTag status='confirmed' />;
      break;
    default:
      return;
      break;
  }
}

export default function ReservationCard({
  selectedStatus,
  nickname,
  headCount,
  status,
  reservationId,
  activityId,
  onClickCloseModal,
}: Props) {
  if (status === selectedStatus) {
    return (
      <li className={cn('reservation-card-item')}>
        <p className={cn('reservation-card-item-info')}>
          닉네임<span>{nickname}</span>
        </p>
        <p className={cn('reservation-card-item-info')}>
          인원<span>{headCount}명</span>
        </p>
        <div className={cn('reservation-card-item-status')}>
          <ReservationStatus
            onClickCloseModal={onClickCloseModal}
            activityId={activityId}
            reservationId={reservationId}
            selectedStatus={selectedStatus}
          />
        </div>
      </li>
    );
  } else {
    return <li className={cn('reservation-card-item-none')}>해당하는 예약 내역이 없습니다</li>;
  }

  //여기서 처리해주면안됨 제대로 처리해야=
}
