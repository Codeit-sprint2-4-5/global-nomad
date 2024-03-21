import Image from 'next/image';
import ReviewFrom from './ReviewForm';
import styles from '../ModalContents.module.scss';
import classNames from 'classnames/bind';
import { Reservation } from '@/types';

const cn = classNames.bind(styles);

interface Props {
  onClickCloseModal: () => void;
  reservationInfo?: Reservation;
}

<<<<<<< HEAD
export default function Review({ reservationInfo, onClickCloseModal }: Props) {
  const formattedDate = reservationInfo?.date.split('-').join('.');
=======
export default function Review({ id = 522, onClickCloseModal }: Props) {
  const { data: reservationsData } = useQuery({
    queryKey: ['my-reservations'],
    queryFn: () => getMyReserVations(10),
  });
  console.log('dd', reservationsData?.reservations);
  const reservation = reservationsData?.reservations.find((reservation: any) => reservation.id === id);

  const formattedDate = reservation?.date.split('-').join('.');
  console.log('fff', reservation);
>>>>>>> 78094c8 (fix : 파일 대소문자 수정)

  return (
    <>
      <h1 className={cn('title')}>후기 작성</h1>
      {reservationInfo && (
        <>
          <article className={cn('activity')}>
            <div className={cn('activity-img')}>
              <Image
                fill
                alt='체험 이미지'
                src={reservationInfo.activity.bannerImageUrl}
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className={cn('activity-text')}>
              <h2 className={cn('activity-text-title')}>{reservationInfo.activity.title}</h2>
              <p className={cn('activity-text-detail')}>
                {formattedDate} {'\u00B7'} {reservationInfo.startTime}-{reservationInfo.endTime} {'\u00B7'}
                {reservationInfo.headCount}명
              </p>
              <h3 className={cn('activity-text-price')}>
                {'\uFFE6'} {reservationInfo.totalPrice.toLocaleString()}
              </h3>
            </div>
          </article>
          <ReviewFrom id={reservationInfo.id} onClickCloseModal={onClickCloseModal} />
        </>
      )}
    </>
  );
}
