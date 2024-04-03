import React, { useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import Card from '@/components/common/card/Card';
import { Reservation } from '@/types/myReservation';
import classNames from 'classnames/bind';
import styles from '../MyCommonCard.module.scss';
import { useCustomInfiniteQuery } from '@/hooks/useCustomInfiniteQuery';
import NoDataMessage from '@/components/common/noDataMessgae/NoDataMessage';
import Title from '@/components/common/title/Title';
import { instance } from '@/apis/axios';
import Question from '@/components/common/popup/question/Question';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Filter from '@/components/common/filter/Filter';
import { ICON } from '@/constants';
import { useRouter } from 'next/router';
import Modal from '@/components/common/Modals';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import Skeleton from '@/components/common/skeleton/Skeleton';

const cn = classNames.bind(styles);

export default function MyReservations() {
  const [viewList, setViewList] = useState<string>('');
  const [reservationId, setReservationId] = useState<number>(0);
  const deleteDialogRef = useRef(null);
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState('');
  const [reservationInfo, setReservationInfo] = useState<Reservation>();
  const router = useRouter();
  const observerRef = useRef<HTMLDivElement>(null);
  const [loadingShow, setLoadingShow] = useState(false);

  const { fetchNextPage, hasNextPage, isFetching, data } =
    useCustomInfiniteQuery({
      queryKey: ['MyReservations', viewList],
      queryFn: ({ pageParam }: { pageParam: number | undefined }) =>
        getMyReservation({ pageParam }, viewList),
    });

  const { mutate } = useMutation({
    mutationFn: patchCancelMyReservation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['MyReservations'] });
    },
  });

  async function getMyReservation(
    { pageParam }: { pageParam: number | undefined },
    viewList: string
  ) {
    try {
      const response = await instance.get('my-reservations', {
        params: {
          cursorId: pageParam ? pageParam : null,
          size: 6,
          status: viewList === '' ? null : viewList,
        },
      });

      return response.data;
    } catch (error: any) {
      console.error('활동을 불러오는 중 오류 발생:', error.message);
      return null;
    }
  }

  async function patchCancelMyReservation(id: number) {
    try {
      const response = await instance.patch(`my-reservations/${id}`, {
        status: 'canceled',
      });
      return response.data;
    } catch (error: any) {
      console.error('활동을 불러오는 중 오류 발생:', error.message);
      return null;
    }
  }

  const handleCancelReservation = (id: number) => {
    setReservationId(id);
    if (!deleteDialogRef.current) return;
    deleteDialogRef.current.showModal();
  };

  const handleWriteReview = (reservationInfo: Reservation) => {
    setReservationInfo(reservationInfo);
    setShowModal('review');
  };

  const handleSubmitCancel = (id: number) => {
    if (!deleteDialogRef.current) return;

    deleteDialogRef.current.close();
    mutate(id);
  };

  const handleBackButtonClick = () => {
    router.back();
  };
  //옵저버
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
            <Title text="내 예약 관리" />
          </div>
          <Filter type="filter" setFilterState={setViewList} />
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
            <Title text="내 예약 관리" />
          </div>

          <Filter type="filter" setFilterState={setViewList} />
        </div>
        <div className={cn('card-container')}>
          {data?.totalCount !== 0 ? (
            <>
              <div className={cn('card-lists')}>
                {data?.pages.map((reservation: Reservation) => (
                  <Card
                    key={reservation.id}
                    reservationsInfo={reservation}
                    handleCancelReservation={handleCancelReservation}
                    handleWriteReview={handleWriteReview}
                  />
                ))}
              </div>
              <div ref={observerRef}>&nbsp;</div>

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
              <NoDataMessage message="아직 예약한 체험이 없어요." />
            </div>
          )}
        </div>
      </div>
      <Question
        text="예약을 취소하시겠습니까?"
        buttonText="취소하기"
        dialogRef={deleteDialogRef}
        onClick={() => handleSubmitCancel(reservationId)}
      />
      {showModal === 'review' && (
        <Modal
          modalType="review"
          reservationInfo={reservationInfo}
          setShowModal={setShowModal}
        />
      )}
    </>
  );
}
