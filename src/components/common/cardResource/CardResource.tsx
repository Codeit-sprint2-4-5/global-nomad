import styles from './CardResource.module.scss';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { ICON } from '@/constants';
import { GetActivitiesList } from '@/types/activities';
import { useRouter } from 'next/router';

const cn = classNames.bind(styles);

interface CardResourceProps {
  activitiesData: GetActivitiesList;
  banner: boolean;
}

export default function CardResource({
  activitiesData,
  banner,
}: CardResourceProps) {
  const router = useRouter();
  const handleClick = (id: number) => {
    router.push(`/activityDetail/${id}`);
  };

  return (
    <div
      onClick={() => handleClick(activitiesData.id)}
      className={cn('entire', { banner })}
    >
      <Image
        src={activitiesData.bannerImageUrl}
        width={384}
        height={384}
        alt="배너 이미지"
        className={cn('image')}
      />

      <div className={cn('info')}>
        <div className={cn('info-rating')}>
          <Image
            src={ICON.star.active.src}
            width={20}
            height={20}
            alt={ICON.star.active.alt}
            className={cn('info-rating-star')}
          />
          {activitiesData.rating}
          &nbsp;
          <span> ({activitiesData.reviewCount})</span>
        </div>
        <div className={cn('info-title')}>{activitiesData.title}</div>
        <div className={cn('info-price')}>
          {activitiesData.price === 0 ? (
            '무료체험'
          ) : (
            <>
              ￦ {activitiesData.price.toLocaleString()} <span>/ 인</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
