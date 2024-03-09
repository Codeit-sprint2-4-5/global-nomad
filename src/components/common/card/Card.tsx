import Image from "next/image";
import styles from "./card.module.scss";
import { Reservation } from "@/types/myReservation";
import classNames from "classnames/bind";

const cn = classNames.bind(styles);

interface CardProps {
  reservationsInfo: Reservation;
  onCancel: (id: number) => void;
  onWriteReview: (id: number) => void;
}
export default function Card({
  reservationsInfo,
  onCancel,
  onWriteReview,
}: CardProps) {
  console.log(reservationsInfo);
  const statusText =
    reservationsInfo.status === "pending"
      ? "예약 신청"
      : reservationsInfo.status === "confirmed"
      ? "예약 완료"
      : reservationsInfo.status === "completed"
      ? "체험 완료"
      : reservationsInfo.status === "declined"
      ? "예약 거절"
      : reservationsInfo.status === "canceled"
      ? "예약 취소"
      : "알 수 없는 상태";

  const buttonContent =
    reservationsInfo.status === "confirmed"
      ? "예약 취소"
      : reservationsInfo.status === "completed"
      ? "후기 작성"
      : "";

  let onClickHandler;
  if (reservationsInfo.status === "confirmed") {
    onClickHandler = () => onCancel(reservationsInfo.id);
  } else if (reservationsInfo.status === "completed") {
    onClickHandler = () => onWriteReview(reservationsInfo.id);
  }
  return (
    <div className={cn("card-entire")}>
      <Image
        src={reservationsInfo.activity.bannerImageUrl}
        width={204}
        height={204}
        alt="배너이미지"
        className={cn("card-image")}
      />
      <div className={cn("card-info")}>
        <div className={cn("card-info-first")}>
          <div className={cn("card-info-status", `${reservationsInfo.status}`)}>
            {statusText}
          </div>
          <div className={cn("card-info-title")}>
            {reservationsInfo.activity.title}
          </div>
          <div className={cn("card-info-date")}>
            {reservationsInfo.date} · {reservationsInfo.startTime} -
            {reservationsInfo.endTime} · {reservationsInfo.headCount}명
          </div>
        </div>

        <div className={cn("card-info-second")}>
          <div className={cn("card-info-price")}>
            ₩{reservationsInfo.totalPrice.toLocaleString()}
          </div>

          {buttonContent && (
            <button
              className={cn("card-info-button", `${reservationsInfo.status}`)}
              onClick={onClickHandler}
            >
              {buttonContent}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
