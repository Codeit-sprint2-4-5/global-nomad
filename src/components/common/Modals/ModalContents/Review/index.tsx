import Image from 'next/image';
import ReviewFrom from './ReviewForm';
import styles from '../ModalContents.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

const mook = {
  title: '가나다라마바사',
  date: '2024-03-04',
  startTime: '17:00',
  endTime: '18:00',
  headCount: '3',
  totalPrice: 30000,
};

const bannerImageUrl =
  'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/a.png' || 'dd';

export default function Review() {
  const formattedDate = mook.date.split('-').join('.');

  return (
    <>
      <h1 className={cn('title')}>후기 작성</h1>
      <article className={cn('activity')}>
        <div className={cn('activity-img')}>
          <Image fill alt="체험 이미지" src={bannerImageUrl} />
        </div>
        <div className={cn('activity-text')}>
          <h2 className={cn('activity-text-title')}>{mook.title}</h2>
          <p className={cn('activity-text-detail')}>
            {formattedDate} {'\u00B7'} {mook.startTime}-{mook.endTime} {'\u00B7'} {mook.headCount}명
          </p>
          <h3 className={cn('activity-text-price')}>
            {'\uFFE6'} {mook.totalPrice.toLocaleString()}
          </h3>
        </div>
      </article>
      <ReviewFrom />
    </>
  );
}
