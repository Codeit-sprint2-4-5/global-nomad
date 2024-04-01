import classNames from 'classnames/bind';
import styles from './ActivitiesList.module.scss';

const cn = classNames.bind(styles);

interface SearchActivitiesHeaderProps {
  search?: string;
  searchTotalCount?: number;
}

export default function SearchActivitiesHeader({ search, searchTotalCount }: SearchActivitiesHeaderProps) {
  return (
    <div className={cn('category-box')}>
      <h2 className={cn('category')}>
        <span className={cn('title')}>{search}</span>
        <span>(으)로 검색한 결과입니다.</span>
      </h2>
      <span className={cn('count')}>총 {searchTotalCount}개의 결과</span>
    </div>
  );
}
