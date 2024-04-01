import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { instance } from '@/apis/axios';
import { useRouter } from 'next/router';
import throttle from '@/function/throttle';
import classNames from 'classnames/bind';
import styles from './Skeleton.module.scss';

const cn = classNames.bind(styles);

type Props = 'popular' | 'all' | 'detail' | 'reservation' | 'management';

export default function Skeleton({ type }: { type: Props }) {
  const [allItem, setAllItem] = useState(8);
  const [popularItem, setPopularItem] = useState(3);
  const router = useRouter();
  const { id } = router.query;

  async function getActivity() {
    try {
      const res = await instance.get(`/activities/${id}`);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }

  const { data, isLoading } = useQuery({
    queryKey: ['/activities'],
    queryFn: getActivity,
    enabled: id === 'activityDetail'
  });

  useEffect(() => {
    const handleResize = throttle(() => {
      const breakPoint = window.innerWidth;

      if (breakPoint > 1200) {
        setAllItem(8);
        setPopularItem(3);
      } else if (breakPoint > 768) {
        setAllItem(9);
        setPopularItem(3);
      } else if (breakPoint > 375) {
        setAllItem(4);
        setPopularItem(9);
      }
    }, 100);

    window.addEventListener('resize', handleResize);
    document.body.style.overflowX = 'hidden';

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (isLoading) return;

  const subImagesLength = data.subImages.length;
  let length = '';
  switch (subImagesLength) {
    case 1:
      length = 'one';
      break;
    case 2:
      length = 'two';
      break;
    case 3:
      length = 'three';
      break;
    default:
      return;
  };

  switch (type) {
    case 'popular':
      return (
        <div className={cn('popular-container')}>
          {[...Array(popularItem)].map((_, idx) => (
            <div key={idx} className={cn('box')}></div>
          ))}
        </div>
      );
    case 'all':
      return (
        <div className={cn('all-container')}>
          {[...Array(allItem)].map((_, idx) => (
            <div key={idx} className={cn('wrap')}>
              <div className={cn('img')}></div>
              <div className={cn('rating')}></div>
              <div className={cn('title')}></div>
              <div className={cn('price')}></div>
            </div>
          ))}
        </div>
      );
    case 'detail':
      return (
        <div className={cn('detail-container')}>
          <div className={cn('img')}></div>
          <div className={cn('wrap')}>
            {[...Array(subImagesLength)].map((_, idx) => (
              <div key={idx} className={`${cn('box', `${length}`)}`}></div>
            ))}
          </div>
        </div>
      );
    case 'reservation':
      return (
        <div className={cn('card-container')}>
          {[...Array(6)].map((_, idx) => (
            <div key={idx} className={cn('card-wrap')}>
              <div className={cn('img')}></div>
              <div className={cn('text-wrap')}>
                <div className={cn('status')}></div>
                <div className={cn('title')}></div>
                <div className={cn('date')}></div>
                <div className={cn('reservation-price')}></div>
              </div>
            </div>
          ))}
        </div>
      );
    case 'management':
      return (
        <div className={cn('card-container')}>
          {[...Array(3)].map((_, idx) => (
            <div key={idx} className={cn('card-wrap')}>
              <div className={cn('img')}></div>
              <div className={cn('text-wrap')}>
                <div className={cn('status')}></div>
                <div className={cn('title')}></div>
                <div className={cn('management-price')}></div>
              </div>
            </div>
          ))}
        </div>
      );
    default:
      return;
  }
}
