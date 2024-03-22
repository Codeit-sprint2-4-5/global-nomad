import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Card from '@/components/common/card/Card';
import { Reservation } from '@/types/myReservation';
import classNames from 'classnames/bind';
import styles from '../MyCommonCard.module.scss';
import { useCustomInfiniteQuery } from '@/hooks/useInfiniteQuery';
import NoDataMessage from '@/components/common/noDataMessgae/NoDataMessage';
import Title from '@/components/common/title/Title';
import { instance } from '@/apis/axios';
import Question from '@/components/common/popup/question/Question';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Filter from '@/components/common/filter/Filter';
import { ICON } from '@/constants';
import { useRouter } from 'next/router';

const cn = classNames.bind(styles);

export default function MyReservations() {
  const [viewList, setViewList] = useState<string>('');
  const [reservationId, setReservationId] = useState<number>(0);
  const deleteDialogRef = useRef(null);
  const queryClient = useQueryClient();
  const { ref, inView } = useInView();
  const [showModal, setShowModal] = useState('');
  const [reservationInfo, setReservationInfo] = useState<Reservation>();
  const router = useRouter();

  const { fetchNextPage, hasNextPage, isFetching, data } =
    useCustomInfiniteQuery({
      queryKey: ['MyReservations', viewList],
      queryFn: ({ pageParam }: any) =>
        getMyReservation({ pageParam }, viewList),
    });
  console.log(reservationInfo);
  const { mutate } = useMutation({
    mutationFn: patchCancelMyReservation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['MyReservations'] });
    },
  });

  async function getMyReservation({ pageParam }: any, viewList: string) {
    const cursorId = pageParam ? `cursorId=${pageParam}` : '';
    const apiStatus = viewList === '' ? '' : `&status=${viewList}`;

    try {
      const response = await instance.get(
        `my-reservations?${cursorId}&size=6${apiStatus}`
      );
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

  console.log(reservationId);

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

  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView]);

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
          {data?.pages[0].totalCount !== 0 ? (
            <>
              <div className={cn('card-lists')}>
                {data?.pages.map((page, index) => (
                  <React.Fragment key={index}>
                    {page.reservations.map((reservation: Reservation) => (
                      <Card
                        key={reservation.id}
                        reservationsInfo={reservation}
                        handleCancelReservation={handleCancelReservation}
                        handleWriteReview={handleWriteReview}
                      />
                    ))}
                  </React.Fragment>
                ))}
              </div>
              <div ref={ref} className={cn('ref-box')}></div>

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
              <NoDataMessage message="예약 내역이 없습니다." />
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
      {/* {showModal === 'review' &&<Modal modalType = "review" 
                        reservationInfo={reservationInfo} setshowModal={setShowModal}} */}
    </>
  );
}
