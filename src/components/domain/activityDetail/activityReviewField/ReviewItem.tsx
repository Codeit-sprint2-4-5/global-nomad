import Image, { StaticImageData } from 'next/image';
import styles from './ReviewItem.module.scss';
import classNames from 'classnames/bind';
import { Review } from './ActivityReviewField';
import { displayDateFormat } from '@/components/common/Modals/ModalContents/utills';
import { IMAGE } from '@/constants/importImages';

const cn = classNames.bind(styles);

function ReviewItem({ review }: { review: Review }) {
  const ceratedDate = displayDateFormat(review.createdAt)?.split('/').join('.');
  const isProfileImage: any =
    review.user.profileImageUrl === null ? '/images/Image_default_profile_image.png' : review.user.profileImageUrl;

  return (
    <div className={cn('review-item')}>
      <Image
        className={cn('review-item-user-profileImg')}
        src={isProfileImage}
        alt='프로필 이미지'
        width={45}
        height={45}
      />
      <div className={cn('review-item-text-box')}>
        <h5 className={cn('review-item-user-nickname')}>
          {review.user.nickname} | <span className={cn('review-item-createdDate')}>{ceratedDate}</span>
        </h5>
        <p className={cn('review-item-content')}>{review.content}</p>
      </div>
    </div>
  );
}

export default function ReviewList({ reviews }: { reviews: Review[] }) {
  return (
    <article className={cn('review-list')}>
      {reviews.map((review: Review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </article>
  );
}
