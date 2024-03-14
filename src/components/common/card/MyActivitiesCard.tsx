import Image from "next/image";
import styles from "./Card.module.scss";
import classNames from "classnames/bind";
import { GetActivitiesList } from "@/types/activities";
import { ICON } from "@/constants";
import IconButton from "../button/IconButton";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";

const cn = classNames.bind(styles);

interface MyActivitiesCardProps {
  activityInfo: GetActivitiesList;
  handleDelete: (id: number) => void;
}

export default function MyActivitiesCard({
  activityInfo,
  handleDelete,
}: MyActivitiesCardProps) {
  const [kebabClick, setKebabClick] = useState<boolean>(false);
  const router = useRouter();
  const kebabRef = useRef<HTMLDivElement>(null);

  const handleKebabClick = () => {
    setKebabClick((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (kebabRef.current && !kebabRef.current.contains(event.target as Node)) {
      setKebabClick(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleModifyClick = (id: number) => {
    setKebabClick(false);
    router.push(`/my-activities/${id}`);
  };

  return (
    <div className={cn("card-container")}>
      <Image
        src={activityInfo.bannerImageUrl}
        width={204}
        height={204}
        alt="배너이미지"
        className={cn("card-image")}
      />
      <div className={cn("card-info-container")}>
        <div className={cn("info-section")}>
          <div className={cn("info-rating")}>
            <Image
              src={ICON.star.active.src}
              width={20}
              height={20}
              alt={ICON.star.active.alt}
              className={cn("rating-star-image")}
            />
            {activityInfo.rating}
            &nbsp; ({activityInfo.reviewCount})
          </div>
          <div className={cn("title")}>{activityInfo.title}</div>
        </div>
        <div className={cn("info-section2")}>
          <div className={cn("section2-price")}>
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
            <div className={cn("context-menu")} ref={kebabRef}>
              <div
                className={cn("menu", "border")}
                onClick={() => handleModifyClick(activityInfo.id)}
              >
                수정하기
              </div>
              <div
                className={cn("menu")}
                onClick={() => {
                  handleDelete(activityInfo.id);
                  setKebabClick(false);
                }}
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
