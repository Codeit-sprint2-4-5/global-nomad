import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./cardResource.module.scss";
import classNames from "classnames/bind";
import Image from "next/image";
import { ICON } from "@/constants";
import { GetActivitiesList } from "@/types/activities";

const cn = classNames.bind(styles);
interface CardResourceProps {
  activitiesData: GetActivitiesList;
  banner: boolean;
}
export default function CardResource({
  activitiesData,
  banner,
}: CardResourceProps) {
  return (
    <div className={cn("card-resource-entire", { banner: banner })}>
      <Image
        src={activitiesData.bannerImageUrl}
        width={384}
        height={384}
        alt="배너 이미지"
        className={cn("card-resource-image", { banner: banner })}
      />

      <div className={cn("card-resource-info", { banner: banner })}>
        <div className={cn("card-resource-info-rating", { banner: banner })}>
          <Image
            src={ICON.star.active.src}
            width={20}
            height={20}
            alt={ICON.star.active.alt}
            className={cn("card-resource-info-rating-star", { banner: banner })}
          />
          {activitiesData.rating}
          &nbsp;
          <span> ({activitiesData.reviewCount})</span>
        </div>
        <div className={cn("card-resource-info-title", { banner: banner })}>
          {activitiesData.title}
        </div>
        <div className={cn("card-resource-info-price", { banner: banner })}>
          ￦ {activitiesData.price.toLocaleString()}
          <span>/ 인</span>
        </div>
      </div>
    </div>
  );
}
