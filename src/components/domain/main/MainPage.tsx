import { getActivities, getPopularActivities, getSearchActivities } from '@/apis/get/getActivities';
import MainLayout from '@/components/common/layout/MainLayout';
import Pagination from '@/components/common/pagination/Pagination';
import Search from '@/components/common/search/Search';
import Skeleton from '@/components/common/skeleton/Skeleton';
import ActivitiesList from '@/components/domain/main/activitiesList/ActivitiesList';
import Banner from '@/components/domain/main/banner/Banner';
import CategoryFilter from '@/components/domain/main/categoryFilter/CategoryFilter';
import PopularActivities from '@/components/domain/main/popularActivitiesList/PopularActivitiesList';
import { IMAGE } from '@/constants';
import useResponsiveSize from '@/hooks/useResponsiveSize';
import { useCategoryFilterStore } from '@/stores/Activities';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { ChangeEvent, useEffect, useState } from 'react';
import styles from './MainPage.module.scss';

const cn = classNames.bind(styles);

export default function MainPage() {
  const [keyword, setKeyword] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const currentSize = useResponsiveSize();

  const { mainCategory, setMainCategory, mainFilter, setMainFilter } = useCategoryFilterStore();

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const onSearchResult = () => {
    setMainCategory('');
    setMainFilter('');
    setCurrentPage(1);
    if (keyword) {
      setSearchKeyword(keyword);
      return;
    }
    setSearchKeyword('');
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [mainCategory, mainFilter]);

  const { data: popularActivitiesData, isSuccess: isGetPopularActivitiesSuccess } = useQuery({
    queryKey: ['popularActivities'],
    queryFn: getPopularActivities,
    retry: false,
  });

  const { data: activitiesData, isSuccess: isGetActivitiesSuccess } = useQuery({
    queryKey: ['activities', { categoryFilter: `${mainCategory}-${mainFilter}`, page: currentPage, size: currentSize }],
    queryFn: () => getActivities({ currentPage, currentSize, category: mainCategory, filter: mainFilter }),
    retry: false,
    placeholderData: keepPreviousData,
  });

  const { data: searchResultData, isSuccess: isGetSearchResultDataSuccess } = useQuery({
    queryKey: ['activities', { keyword: searchKeyword, page: currentPage, size: currentSize }],
    queryFn: () => getSearchActivities({ currentPage, currentSize, keyword: searchKeyword }),
    retry: false,
    enabled: !!searchKeyword,
  });

  if (!isGetPopularActivitiesSuccess || !isGetActivitiesSuccess)
    return (
      <MainLayout>
        <Banner />
        <div className={cn('search-box')}>
          <Search keyword={keyword} onSubmit={onSearchResult} onChange={handleValueChange} />
        </div>
        <div className={cn('list-box')}>
          <Skeleton type='popular' />
          <CategoryFilter />
          <Skeleton type='all' />
        </div>
      </MainLayout>
    );

  return (
    <MainLayout>
      <Banner />
      <div className={cn('search-box')}>
        <Search keyword={keyword} onSubmit={onSearchResult} onChange={handleValueChange} />
      </div>
      {!!searchKeyword ? (
        <>
          {isGetSearchResultDataSuccess && searchResultData.totalCount > 0 ? (
            <>
              <div className={cn('list-box')}>
                <ActivitiesList
                  activities={searchResultData.activities}
                  search={searchKeyword}
                  searchTotalCount={searchResultData.totalCount}
                />
              </div>
              <div className={cn('pagination-box')}>
                <Pagination
                  data={searchResultData}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  PAGE_LIMIT={currentSize}
                />
              </div>
            </>
          ) : (
            <div className={cn('no-result')}>
              <Image src={IMAGE.noData.default.src} alt={IMAGE.noData.default.alt} height={177} width={130} />
              <span>검색 결과가 없습니다.</span>
            </div>
          )}
        </>
      ) : (
        <>
          <div className={cn('list-box')}>
            <PopularActivities popularActivities={popularActivitiesData.activities} />
            <CategoryFilter />
            <ActivitiesList category={mainCategory} activities={activitiesData?.activities} />
          </div>
          <div className={cn('pagination-box')}>
            <Pagination
              data={activitiesData}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              PAGE_LIMIT={currentSize}
            />
          </div>
        </>
      )}
    </MainLayout>
  );
}
