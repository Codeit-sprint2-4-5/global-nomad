import { activity } from '@/apis/activity';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/router';
import style from './ImageField.module.scss';
import classNames from 'classnames/bind';
import IconButton from '@/components/common/button/IconButton';
import { ICON } from '@/constants';
import { useEffect, useRef, useState } from 'react';
import debounce from '@/function/debounce';
import { GetActivityDetail } from '@/types';
import { AxiosError } from 'axios';
import Confirm from '@/components/common/popup/confirm/Confirm';

const cn = classNames.bind(style);

const { leftArrow, rightArrow } = ICON;

export default function ImageField() {
  const [fieldWidth, setFieldWitdh] = useState(0);
  const [imageFieldIndex, setImageFieldIndex] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const baseImageUrl =
    'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/b.png';
  const router = useRouter();
  const id = router.query.id as string;
  const {
    data: activityDetailData,
    error,
    isLoading,
  } = useQuery<GetActivityDetail, AxiosError>({
    queryKey: ['activity-detail', id],
    queryFn: () => activity.getActivityDetail(id),
  });
  const imageRef = useRef<HTMLImageElement | null>(null);
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const nextButtonEnable =
    activityDetailData?.subImages &&
    activityDetailData.subImages.length > 0 &&
    activityDetailData.subImages.length - imageFieldIndex !== 0 &&
    activityDetailData.subImages[0].imageUrl !== baseImageUrl;

  const subImageEnable =
    activityDetailData?.subImages &&
    activityDetailData.subImages.length <= 1 &&
    activityDetailData.subImages[0].imageUrl === baseImageUrl;

  const handleNextClick = () => {
    setImageFieldIndex((prev) => {
      const nextIndex = prev + 1;
      onScroll(fieldWidth, nextIndex);
      return nextIndex;
    });
  };
  const handlePrevClick = () => {
    setImageFieldIndex((prev) => {
      const nextIndex = prev - 1;
      onScroll(fieldWidth, nextIndex);
      return nextIndex;
    });
  };

  const handleResize = debounce(() => {
    if (window.innerWidth < 768 && imageRef.current) {
      const { clientWidth } = imageRef.current;
      setFieldWitdh(clientWidth);
      setImageFieldIndex(0);
      onScroll(0, 0, true);
    }
  }, 100);

  const handleBannerImageNewWindowOpenClick = () => {
    if (activityDetailData) {
      localStorage.removeItem('newWindowImageUrl');
      localStorage.setItem('newWindowImageUrl', activityDetailData.bannerImageUrl);
      window.open('/newWindow', 'newWindow', 'width=640,height=427');
    }
  };
  const handleSubImageNewWindowOpenClick = (index: number) => {
    if (activityDetailData) {
      localStorage.removeItem('newWindowImageUrl');
      localStorage.setItem('newWindowImageUrl', activityDetailData.subImages[index].imageUrl);
      window.open('/newWindow', 'newWindow', 'width=640,height=480');
    }
  };

  const onScroll = (width: number, index: number, initialize: boolean = false) => {
    const container = document.querySelector('#image-field');
    if (!container) return;
    const scrollPosition = width * index;

    if (initialize) {
      container.scrollTo({
        left: scrollPosition,
        behavior: 'instant',
      });
      return;
    }
    container.scrollTo({
      left: scrollPosition,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    if (!activityDetailData && !imageRef.current) return;
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [activityDetailData, imageRef]);

  useEffect(() => {}, []);

  if (isLoading) return <div>Loading....</div>;

  if (error) console.error(error);

  return (
    <>
      <Confirm dialogRef={dialogRef} text={errorMessage} />
      {activityDetailData && (
        <div className={cn('activity-image')}>
          <div id={'image-field'} className={cn('image-field', { subImage: subImageEnable })} ref={imageRef}>
            {imageFieldIndex !== 0 && (
              <div className={cn('btn-left')}>
                <IconButton
                  type='button'
                  size='sm'
                  svg={leftArrow.variant1.src}
                  alt={leftArrow.variant1.alt}
                  onClick={handlePrevClick}
                />
              </div>
            )}
            {nextButtonEnable && (
              <div className={cn('btn-right')}>
                <IconButton
                  type='button'
                  size='sm'
                  svg={rightArrow.variant1.src}
                  alt={rightArrow.variant1.alt}
                  onClick={handleNextClick}
                />
              </div>
            )}
            <div className={cn('image-field-banner')} onClick={handleBannerImageNewWindowOpenClick}>
              <Image
                className={cn('image')}
                src={activityDetailData.bannerImageUrl}
                alt={activityDetailData.title}
                sizes={'100%'}
                fill
                priority
              />
            </div>
            {!subImageEnable && (
              <div
                className={cn(
                  'image-field-sub',
                  { 'grid-pattern1': activityDetailData.subImages.length === 1 },
                  { 'grid-pattern2': activityDetailData.subImages.length === 2 },
                  { 'grid-pattern3': activityDetailData.subImages.length === 3 }
                )}
              >
                {activityDetailData.subImages.map(
                  (image, index) =>
                    image.imageUrl &&
                    image.imageUrl !== baseImageUrl && (
                      <div
                        key={image.id}
                        className={cn('sub-image')}
                        onClick={() => handleSubImageNewWindowOpenClick(index)}
                      >
                        <Image
                          className={cn('image')}
                          src={image.imageUrl}
                          alt={'서브 이미지'}
                          sizes={'100%'}
                          fill
                          priority
                        />
                      </div>
                    )
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
