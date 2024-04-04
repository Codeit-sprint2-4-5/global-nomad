import Category from '@/components/common/category/Category';
import Filter from '@/components/common/filter/Filter';
import { ICON } from '@/constants';
import useResponsiveSize from '@/hooks/useResponsiveSize';
import { useCategoryFilterStore } from '@/stores/Activities';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import styles from './CategoryFilter.module.scss';

const cn = classNames.bind(styles);

export default function CategoryFilter() {
  const [categoryState, setCategoryState] = useState('');
  const [filterState, setFilterState] = useState('');
  const [categoryXState, setCategoryXState] = useState(0);

  const translateSize = useResponsiveSize(1, 1, 2, 3);
  const categoryRef = useRef<HTMLUListElement>(null);

  const { mainCategory, setMainCategory, mainFilter, setMainFilter } = useCategoryFilterStore();

  const categoryList: ('문화 · 예술' | '식음료' | '스포츠' | '투어' | '관광' | '웰빙')[] = [
    '문화 · 예술',
    '식음료',
    '스포츠',
    '투어',
    '관광',
    '웰빙',
  ];

  const handleCategoryClick = (category: string) => {
    setFilterState('');
    if (category === categoryState) {
      setCategoryState('');
      return;
    }
    setCategoryState(category);
  };

  const handleButtonClick = (direction: number) => {
    const newIndex = categoryXState + direction;

    if (newIndex >= 0 && newIndex <= translateSize) {
      setCategoryXState(newIndex);
    }
  };

  useEffect(() => {
    if (categoryRef.current !== null) {
      categoryRef.current.style.transition = 'all 0.5s ease-in-out';
    }

    if (categoryRef.current !== null) {
      categoryRef.current.style.transform = `translateX(-${categoryXState * 50}%)`;
    }
  }, [categoryXState, translateSize]);

  useEffect(() => {
    setMainCategory(categoryState);
    setFilterState('');
    setMainFilter('');
  }, [categoryState, setMainCategory, setMainFilter]);

  useEffect(() => {
    setMainFilter(filterState);
  }, [filterState, setMainFilter]);

  return (
    <div className={cn('container')}>
      <div className={cn('category-button-box')}>
        <div className={cn('category-box-container')}>
          <ul className={cn('category-box')} ref={categoryRef}>
            {categoryList.map((category, index) => (
              <li key={`${category}-${index}`}>
                <Category category={category} isActive={categoryState === category} onClick={handleCategoryClick} />
              </li>
            ))}
          </ul>
        </div>
        {categoryXState !== 0 && (
          <div className={cn('category-button', 'left')}>
            <button onClick={() => handleButtonClick(-1)}>
              <Image src={ICON.rightArrow.default.src} alt={ICON.rightArrow.default.alt} height={32} width={32} />
            </button>
          </div>
        )}
        {categoryXState < translateSize && (
          <div className={cn('category-button', 'right')}>
            <button onClick={() => handleButtonClick(1)}>
              <Image src={ICON.rightArrow.default.src} alt={ICON.rightArrow.default.alt} height={32} width={32} />
            </button>
          </div>
        )}
      </div>
      <div>
        <Filter type='price' filterState={filterState} setFilterState={setFilterState} />
      </div>
    </div>
  );
}
