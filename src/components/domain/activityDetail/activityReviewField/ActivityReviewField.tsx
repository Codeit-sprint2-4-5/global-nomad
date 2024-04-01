import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { ICON, IMAGE } from '@/constants';
import { queryKey } from '@/apis/quertKey';
import { getReviews } from '@/apis/get/getReviews';

import styles from './ActivityReviewField.module.scss';
import classNames from 'classnames/bind';
import ReviewList from './ReviewItem';
import { getEvaluationFromRating } from './utill/getEvaluationFromRating';
import { useState } from 'react';
import Pagination from '@/components/common/pagination/Pagination';
const cn = classNames.bind(styles);

const { star } = ICON;
const { noData } = IMAGE;

export interface Review {
  id: number;
  user: {
    id: number;
    nickname: string;
    profileImageUrl: string;
  };
  activityId: number;
  content: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Reviews {
  reviews: Review[];
  averageRating: number;
  totalCount: number;
}

function EmptyReview() {
  return (
    <article className={cn('review-none-box')}>
      <Image src={noData.default.src} alt={noData.default.alt} />
      <p>아직 후기가 없습니다.</p>
    </article>
  );
}

export default function ActivityReviewField() {
  const router = useRouter();
  const { query } = router;
  const id = Number(query.id);
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_LIMIT = 3;
  const { data: reviewData, isSuccess } = useQuery<Reviews>({
    queryKey: queryKey.getActivityReview(id),
    queryFn: () => getReviews(id, currentPage),
  });

  if (!isSuccess) return <EmptyReview />;

  const evaluation = getEvaluationFromRating(reviewData.averageRating);

  return (
    <section className={cn('review-field')}>
      <h4 className={cn('review-title')}>후기</h4>
      {reviewData.totalCount !== 0 ? (
        <>
          <article className={cn('review-total-box')}>
            <h3 className={cn('review-total-average')}>{reviewData.averageRating}</h3>
            <div className={cn('review-total-count')}>
              <p className={cn('review-total-count-rating')}>{evaluation}</p>

              <p className={cn('review-total-count-text')}>
                <Image src={star.active.src} alt={star.default.alt} width={16} height={16} />
                {reviewData.totalCount}개 후기
              </p>
            </div>
          </article>
          <ReviewList reviews={reviewData.reviews} />
          <div className={cn('pagination-line')}>
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              data={reviewData}
              PAGE_LIMIT={PAGE_LIMIT}
            />
          </div>
        </>
      ) : (
        <EmptyReview />
      )}
    </section>
  );
}
