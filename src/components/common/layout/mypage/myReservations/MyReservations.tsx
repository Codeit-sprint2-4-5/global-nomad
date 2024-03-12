import Card from "@/components/common/card/Card";
import {
  axiosInstance,
  refreshAndRetryRequest,
} from "@/pages/test/axiosInstance";
import { Reservation } from "@/types/myReservation";
import { useInfiniteQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import styles from "./MyReservations.module.scss";
import classNames from "classnames/bind";
const cn = classNames.bind(styles);
export default function MyReservation() {
  const [status, setStatus] = useState<string | null>(null);
  const { fetchNextPage, hasNextPage, isFetching, data } = useInfiniteQuery({
    queryKey: ["MyReservation"],
    queryFn: getMyReservation,
    getNextPageParam: (lastPage) =>
      lastPage.cursorId === null ? undefined : lastPage.cursorId,
    initialPageParam: null,
    select: (data) => (data.pages ?? []).flatMap((page) => page.reservations),
  });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  async function getMyReservation({ pageParam }: any) {
    try {
      const cursorId = pageParam ? `cursorId=${pageParam}` : "";
      const apiStatus = status === null ? "" : `&status=${status}`;

      const response = await axiosInstance.get(
        `my-reservations?${cursorId}&size=6${apiStatus}`
      );

      return response.data;
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        return refreshAndRetryRequest(error.config);
      } else {
        throw error;
      }
    }
  }

  const handleCancelReservation = (id: number) => {
    console.log(id, "reservationId 예약취소");
  };
  const handleWriteReview = (id: number) => {
    console.log(id, "reservationId 체험후기");
  };

  return (
    <div className={cn("reservations-container")}>
      {data?.map((reservation: Reservation) => (
        <Card
          key={reservation.id}
          reservationsInfo={reservation}
          handleCancelReservation={handleCancelReservation}
          handleWriteReview={handleWriteReview}
        />
      ))}
      <div ref={ref} style={{ height: "5px" }}></div>
      {isFetching && hasNextPage && (
        <div className={cn("loading-container")}>
          <Image
            src="/icons/Icon_loading.svg"
            width={40}
            height={40}
            alt="loadingIcon"
            className={cn("loading-image")}
          />
        </div>
      )}
    </div>
  );
}
