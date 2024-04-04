import { ICON, IMAGE } from '@/constants';
import classNames from 'classnames/bind';
import Image, { StaticImageData } from 'next/image';
import { useEffect, useRef, useState } from 'react';
import styles from './Banner.module.scss';

const cn = classNames.bind(styles);

export default function Banner() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [bannerList, setBannerList] = useState<{ imageSrc: StaticImageData; title: string; text: string }[]>([]);
  const [isHover, setIsHover] = useState(false);

  const bannerRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const bannerImageList: { imageSrc: StaticImageData; title: string; text: string }[] = [
      {
        imageSrc: IMAGE.banner.first.src,
        title: '고민없이 여행을',
        text: '여행을 갈 때 무엇을 할지에 대한 해답을 제공합니다.',
      },
      {
        imageSrc: IMAGE.banner.second.src,
        title: '간편한 체험 예약',
        text: '원하는 여행지의 다양한 체험 상품을 탐색하고, 몇 번의 클릭만으로 예약을 완료할 수 있습니다.',
      },
      {
        imageSrc: IMAGE.banner.third.src,
        title: '체험 상품 등록',
        text: '여행지의 체험을 등록해 체험을 소개하고, 여행자들에게 잊지 못할 추억을 선사해 주세요.',
      },
    ];

    const startData = bannerImageList[0];
    const endData = bannerImageList[2];
    const newList = [endData, ...bannerImageList, startData];

    setBannerList(newList);
  }, []);

  useEffect(() => {
    if (bannerRef.current !== null) {
      bannerRef.current.style.transform = `translateX(-${currentIndex}00%)`;
    }
  }, [currentIndex]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isHover) {
        const newIndex = currentIndex + 1;

        if (newIndex === 4) {
          moveToNthBanner(1);
        }

        setCurrentIndex((prevCurrentIndex) => prevCurrentIndex + 1);

        if (bannerRef.current !== null) {
          bannerRef.current.style.transition = 'all 0.5s ease-in-out';
        }
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [currentIndex, isHover]);

  const moveToNthBanner = (index: number) => {
    setTimeout(() => {
      setCurrentIndex(index);
      if (bannerRef.current !== null) {
        bannerRef.current.style.transition = '';
      }
    }, 500);
  };

  const handleSwipeClick = (direction: number) => {
    const newIndex = currentIndex + direction;

    if (newIndex === 4) {
      moveToNthBanner(1);
    }

    if (newIndex === 0) {
      moveToNthBanner(3);
    }

    setCurrentIndex((prevCurrentIndex) => prevCurrentIndex + direction);

    if (bannerRef.current !== null) {
      bannerRef.current.style.transition = 'all 0.5s ease-in-out';
    }
  };

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  return (
    <>
      <div className={cn('container')} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <div className={cn('wrapper')}>
          <button onClick={() => handleSwipeClick(-1)} className={cn('swipeLeft')}>
            <Image src={ICON.leftArrow.variant1.src} alt='이전 배너' height={47} width={24} />
          </button>
          <button onClick={() => handleSwipeClick(1)} className={cn('swipeRight')}>
            <Image src={ICON.leftArrow.variant1.src} alt='다음 배너' height={47} width={24} />
          </button>
          <ul className={cn('banner')} ref={bannerRef}>
            {bannerList?.map((banner, index) => (
              <li className={cn('banner-item', `banner-item-${index}`)} key={`${banner.title}-${index}`}>
                <div className={cn('banner-image-box')}>
                  <Image src={banner.imageSrc} alt='배너 이미지' fill priority objectFit='cover' />
                </div>
                <div className={cn('banner-text')}>
                  <span className={cn('title')}>{banner.title}</span>
                  <span className={cn('rank')}>{banner.text}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={cn('blank')} />
    </>
  );
}
