import Image from 'next/image';
import styles from './Card.module.scss';
import classNames from 'classnames/bind';
import { GetActivitiesList } from '@/types/activities';
import { ICON } from '@/constants';
import { useRouter } from 'next/router';
import Menu from '../menu/Menu';

const cn = classNames.bind(styles);

interface MyActivitiesCardProps {
  activityInfo: GetActivitiesList;
  handleDelete: (id: number) => void;
}

export default function MyActivitiesCard({
  activityInfo,
  handleDelete,
}: MyActivitiesCardProps) {
  const router = useRouter();

  const handleModifyClick = (id: number) => {
    router.push(`/editActivity/${id}`);
  };
  const handlePageRouter = (id: number) => {
    router.push(`/activityDetail/${id}`);
  };
  return (
    <div className={cn('card-container')}>
      <button type="button" onClick={() => handlePageRouter(activityInfo.id)}>
        <Image
          src={activityInfo.bannerImageUrl}
          width={204}
          height={204}
          alt="배너이미지"
          className={cn('card-image')}
        />
      </button>
      <div className={cn('card-info-container')}>
        <div className={cn('info-section')}>
          <div className={cn('info-rating')}>
            <Image
              src={ICON.star.active.src}
              width={20}
              height={20}
              alt={ICON.star.active.alt}
              className={cn('rating-star-image')}
            />
            {activityInfo.rating}
            &nbsp; ({activityInfo.reviewCount})
          </div>
          <div className={cn('title')}>{activityInfo.title}</div>
        </div>
        <div className={cn('info-section2')}>
          <div className={cn('price')}>
            {activityInfo.price === 0 ? (
              '무료체험'
            ) : (
              <>
                ￦ {activityInfo.price.toLocaleString()} <span>/ 인</span>
              </>
            )}
          </div>
          <Menu
            handleModifyClick={() => handleModifyClick(activityInfo.id)}
            handleDeleteClick={() => {
              handleDelete(activityInfo.id);
            }}
          />
        </div>
      </div>
    </div>
  );
}
