import { GetActivitiesList } from '@/types/activities';
import classNames from 'classnames/bind';
import styles from './PopularActivitiesList.module.scss';
import Image from 'next/image';
import { ICON } from '@/constants';
import CardResource from '@/components/common/cardResource/CardResource';
import { useEffect, useRef, useState } from 'react';

const cn = classNames.bind(styles);

interface PopularActivitiesListProps {
  popularActivities?: GetActivitiesList[];
}

export default function PopularActivitiesList({ popularActivities }: PopularActivitiesListProps) {
  const ref = useRef<HTMLUListElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasNext, setHasNext] = useState(true);
  const [hasPrev, setHasPrev] = useState(false);

  useEffect(() => {
    if (ref.current !== null) {
      ref.current.style.transition = 'all 0.5s ease-in-out';
    }
  }, []);

  useEffect(() => {
    if (ref.current !== null) {
      ref.current.style.transform = `translateX(-${currentIndex}0%)`;
    };
  }, [currentIndex]);

  const handleArrowButtonClick = (direction: number) => {
    const newIndex = currentIndex + direction;

    if (newIndex >= 0 && newIndex <= 7) {
      setCurrentIndex(newIndex);
      setHasPrev(newIndex !== 0);
      setHasNext(newIndex !== 7);
    }
  };

  return (
    <div className={cn('container')}>
      <div className={cn('title-button-box')}>
        <h2 className={cn('title')}>🔥 인기 체험</h2>
        <div className={cn('button-box')}>
          <button className={cn('left-arrow-button')} onClick={() => handleArrowButtonClick(-1)} disabled={!hasPrev}>
            <Image src={ICON.leftArrow.default.src} alt={ICON.leftArrow.default.alt} height={48} width={48} />
          </button>
          <button className={cn('right-arrow-button')} onClick={() => handleArrowButtonClick(1)} disabled={!hasNext}>
            <Image src={ICON.leftArrow.default.src} alt={ICON.leftArrow.default.alt} height={48} width={48} />
          </button>
        </div>
      </div>
      <div className={cn('popular-activities-container')}>
        <ul className={cn('popular-activities-box')} ref={ref}>
          {popularActivities?.map((popularActivity) => (
            <li key={popularActivity.id} className={cn('popular-activities-item')}>
              <CardResource activitiesData={popularActivity} banner />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
