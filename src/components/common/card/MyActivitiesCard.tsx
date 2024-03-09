import Image from "next/image";
import styles from "./Card.module.scss";
import classNames from "classnames/bind";
import { GetActivitiesList } from "@/types/activities";
import { ICON } from "@/constants";
import IconButton from "../button/IconButton";
import { useRef, useState } from "react";
import { useRouter } from "next/router";

const cn = classNames.bind(styles);

interface MyActivitiesCardProps {
  activityInfo: GetActivitiesList;
  onDelete: (id: number) => void;
}
export default function MyActivitiesCard({
  activityInfo,
  onDelete,
}: MyActivitiesCardProps) {
  const [kebabClick, setKebabClick] = useState<boolean>(false);
  const router = useRouter();

  const handleKebabClick = () => {
    setKebabClick((prev) => !prev);
  };
  const handleModifyClick = (id: number) => {
    console.log(id);
    setKebabClick((prev) => !prev);
    // router.push(`/my-activities/${id}`);
  };

  return (
    <div className={cn("card-entire")}>
      <Image
        src={activityInfo.bannerImageUrl}
        width={204}
        height={204}
        alt="배너이미지"
        className={cn("card-image")}
      />
      <div className={cn("card-info")}>
        <div className={cn("card-info-first")}>
          <div className={cn("card-info-rating")}>
            <Image
              src={ICON.star.active.src}
              width={20}
              height={20}
              alt={ICON.star.active.alt}
              className={cn("info-rating-star")}
            />
            {activityInfo.rating}
            &nbsp; ({activityInfo.reviewCount})
          </div>
          <div className={cn("card-info-title")}>{activityInfo.title}</div>
        </div>
        <div className={cn("info-second")}>
          <div className={cn("info-price")}>
            ￦ {activityInfo.price.toLocaleString()}
            <span>/ 인</span>
          </div>
          <div onClick={handleKebabClick}>
            <IconButton
              svg={ICON.menu.default.src}
              size="40"
              alt={ICON.menu.default.alt}
            />
          </div>
          {kebabClick && (
            <div className={cn("context-menu")}>
              <div
                className={cn("menu", "border")}
                onClick={() => handleModifyClick(activityInfo.id)}
              >
                수정하기
              </div>
              <div
                className={cn("menu")}
                onClick={() => (
                  onDelete(activityInfo.id), setKebabClick(false)
                )}
              >
                삭제하기
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
