import { instance } from '@/apis/axios';
import { useCustomInfiniteQuery } from '@/hooks/useCustomInfiniteQuery';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useRef, useState } from 'react';

import styles from '../MyCommonCard.module.scss';
import classNames from 'classnames/bind';
import Image from 'next/image';
import MyActivitiesCard from '@/components/common/card/MyActivitiesCard';
import { GetActivitiesList } from '@/types/activities';
import Title from '@/components/common/title/Title';
import { useRouter } from 'next/router';
import Question from '@/components/common/popup/question/Question';
import NoDataMessage from '@/components/common/noDataMessgae/NoDataMessage';
import { ICON } from '@/constants';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import Skeleton from '@/components/common/skeleton/Skeleton';

const cn = classNames.bind(styles);

export default function MyActivities() {
  const [deleteActivityId, setDeleteActivityId] = useState<number>(0);

  const queryClient = useQueryClient();
  const router = useRouter();
  const deleteDialogRef = useRef<HTMLDialogElement>(null);
  const observerRef = useRef<HTMLDivElement>(null);
  const [loadingShow, setLoadingShow] = useState(false);
  //inFiniteScroll을 위한 쿼리요청 키와 함수를 써줘야함
  const { fetchNextPage, hasNextPage, isFetching, data } =
    useCustomInfiniteQuery({
      queryKey: ['MyActivities'],
      queryFn: ({ pageParam }: { pageParam: number | undefined }) =>
        getMyActivities({ pageParam }),
    });
  //본인이 등록한 체험정보 get API
  async function getMyActivities({
    pageParam,
  }: {
    pageParam: number | undefined;
  }) {
    try {
      const response = await instance.get('/my-activities', {
        params: {
          cursorId: pageParam ? pageParam : null,
          size: 6,
        },
      });

      return response.data;
    } catch (error) {
      console.error('활동을 불러오는 중 오류 발생:', onmessage);
      return error;
    }
  }

  //체험 카드 삭제 요청 API
  async function deleteActivity(activityId: number) {
    try {
      await instance.delete(`/my-activities/${activityId}`);
    } catch (error) {
      console.error('Error deleting activity:', error);
    }
  }

  //서버에 변경 작업 요청시 사용 캐시된 데이터를 무효화하고 success의 경우 데이터를 다시 불러옴
  const { mutate } = useMutation({
    mutationFn: deleteActivity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['MyActivities'] });
    },
  });

  //삭제하기 버튼의 동작
  const handleDeleteClick = (activityId: number) => {
    try {
      if (!deleteDialogRef.current) return;
      deleteDialogRef.current.close();

      mutate(activityId);
    } catch (error) {
      console.error('Error deleting activity:', error);
    }
  };

  //피그마에는 없는데 확인작업으로 정말로 삭제하시겠습니까 모달 만들어 동작하게함
  const handleOpenDeleteModal = (id: number) => {
    setDeleteActivityId(id);
    if (!deleteDialogRef.current) return;
    deleteDialogRef.current.showModal();
  };
  const handleRegisterClick = () => {
    router.push('/addActivity');
  };

  const handleBackButtonClick = () => {
    router.back();
  };

  //옵저버의 위치 다음페이지 유무 데이터 불러오는 상태에 따라 무한 스크롤이 구현됨
  useIntersectionObserver({
    observerRef,
    hasNextPage,
    isFetching,
    fetchNextPage,
    loadingShow,
  });

  useEffect(() => {
    if (isFetching && !loadingShow) {
      setLoadingShow(true);
    }
    if (!isFetching) {
      setLoadingShow(false);
    }
  }, [isFetching, loadingShow]);
  if (loadingShow) {
    return (
      <div className={cn('reservations-container')}>
        <div className={cn('title')}>
          <div className={cn('back-button')}>
            <button className={cn('back-icon')} onClick={handleBackButtonClick}>
              <Image
                width={40}
                height={40}
                src={ICON.leftArrow.default.src}
                alt={ICON.leftArrow.default.alt}
              />
            </button>
            <Title text="내 체험 관리" />
          </div>

          <button
            className={cn('register-button')}
            onClick={handleRegisterClick}
          >
            체험 등록하기
          </button>
        </div>
        <div className={cn('card-container')}>
          <Skeleton type="reservation" />
        </div>
      </div>
    );
  }
  return (
    <>
      <div className={cn('reservations-container')}>
        <div className={cn('title')}>
          <div className={cn('back-button')}>
            <button className={cn('back-icon')} onClick={handleBackButtonClick}>
              <Image
                width={40}
                height={40}
                src={ICON.leftArrow.default.src}
                alt={ICON.leftArrow.default.alt}
              />
            </button>
            <Title text="내 체험 관리" />
          </div>

          <button
            className={cn('register-button')}
            onClick={handleRegisterClick}
          >
            체험 등록하기
          </button>
        </div>
        <div className={cn('card-container')}>
          {data?.totalCount !== 0 ? (
            <>
              <div className={cn('card-lists')}>
                {data?.pages.map((activity: GetActivitiesList) => (
                  <MyActivitiesCard
                    key={activity.id}
                    activityInfo={activity}
                    handleDelete={handleOpenDeleteModal}
                  />
                ))}
              </div>
              <div ref={observerRef} className={cn('ref-box')}></div>

              {isFetching && hasNextPage && (
                <div className={cn('loading-container')}>
                  <Image
                    src="/icons/Icon_loading.svg"
                    width={50}
                    height={50}
                    alt="loadingIcon"
                    className={cn('loading-image')}
                  />
                </div>
              )}
            </>
          ) : (
            <div className={cn('nodata-container')}>
              <NoDataMessage message="아직 등록한 체험이 없어요." />
            </div>
          )}
        </div>
      </div>
      <Question
        text="정말로 삭제하시겠습니까?"
        buttonText="삭제하기"
        dialogRef={deleteDialogRef}
        onClick={() => handleDeleteClick(deleteActivityId)}
      />
    </>
  );
}
