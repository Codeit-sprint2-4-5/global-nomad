import CardResource from '@/components/common/cardResource/CardResource';
import { GetActivitiesList } from '@/types/activities';
import classNames from 'classnames/bind';
import styles from './ActivitiesList.module.scss';
import SearchActivitiesHeader from './SearchActivitiesHeader';

const cn = classNames.bind(styles);

interface ActivitiesListProps {
  category?: string;
  activities?: GetActivitiesList[];
  search?: string;
  searchTotalCount?: number;
}

export default function ActivitiesList({
  category = '전체',
  activities,
  search,
  searchTotalCount,
}: ActivitiesListProps) {
  return (
    <div className={cn('container')}>
      {search && searchTotalCount ? (
        <>
          <SearchActivitiesHeader search={search} searchTotalCount={searchTotalCount} />
          <ul className={cn('list-box')}>
            {activities?.map((activity, index) => (
              <li key={`${activity.id}-${activity.userId}-${index}`}>
                <CardResource activitiesData={activity} banner={false} />
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <h2 className={cn('category')}>{category ? category : '전체 체험'}</h2>
          <ul className={cn('list-box')}>
            {activities?.map((activity, index) => (
              <li key={`${activity.id}-${activity.userId}-${index}`}>
                <CardResource activitiesData={activity} banner={false} />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
