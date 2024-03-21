import Image from 'next/image';
import ReviewFrom from './ReviewForm';
import { useQuery } from '@tanstack/react-query';
import { getMyReserVations } from '@/apis/get/getAbledResrvations';
import styles from '../ModalContents.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

interface Props {
  onClickCloseModal: () => void;
  id?: number;
}

export default function Review({ id = 522, onClickCloseModal }: Props) {
  const { data: reservationsData } = useQuery({
    queryKey: ['my-reservations'],
    queryFn: () => getMyReserVations(10),
  });
  console.log('dd', reservationsData?.reservations);
  const reservation = reservationsData?.reservations.find((reservation: any) => reservation.id === id);

  const formattedDate = reservation?.date.split('-').join('.');
  console.log('fff', reservation);

  return (
    <>
      <h1 className={cn('title')}>후기 작성</h1>
      {reservation && (
        <article className={cn('activity')}>
          <div className={cn('activity-img')}>
            <Image fill alt='체험 이미지' src={reservation.activity.bannerImageUrl} style={{ objectFit: 'cover' }} />
          </div>
          <div className={cn('activity-text')}>
            <h2 className={cn('activity-text-title')}>{reservation.activity.title}</h2>
            <p className={cn('activity-text-detail')}>
              {formattedDate} {'\u00B7'} {reservation.startTime}-{reservation.endTime} {'\u00B7'}
              {reservation.headCount}명
            </p>
            <h3 className={cn('activity-text-price')}>
              {'\uFFE6'} {reservation.totalPrice.toLocaleString()}
            </h3>
          </div>
        </article>
      )}
      <ReviewFrom id={id} onClickCloseModal={onClickCloseModal} />
    </>
  );
}
