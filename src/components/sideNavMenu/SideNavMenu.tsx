import Image from "next/image";
import Link from "next/link";
import styles from "./sideNavMenu.module.scss";
import classNames from "classnames/bind";
import { ICON } from "@/constants/importImages";

interface SideNavMenuProps {
  userProfileImage: string | null;
}

export default function SideNavMenu({ userProfileImage }: SideNavMenuProps) {
  const cn = classNames.bind(styles);

  const profileImage = userProfileImage
    ? userProfileImage
    : "/images/default_profile_image.png";

  return (
    <div className={cn("side-menu-entire")}>
      <div className={cn("user-profile")}>
        <Image
          src={profileImage}
          height={160}
          width={160}
          alt="profileImage"
          className={cn("user-profile-image")}
        />
        <button></button>
      </div>

      <div className={cn("side-menu")}>
        <Link href="#">
          {" "}
          <div className={cn("side-menu-link")}>
            <Image
              src={ICON.accountCheck.default.src}
              width={24}
              height={24}
              alt={ICON.accountCheck.default.alt}
              className={cn("side-menu-Image")}
            />
            <span>내 정보</span>
          </div>
        </Link>

        <Link href="#">
          <div className={cn("side-menu-link")}>
            <Image
              src={ICON.textBoxCheck.default.src}
              width={24}
              height={24}
              alt={ICON.textBoxCheck.default.alt}
              className={cn("side-menu-Image")}
            />
            <span>예약 내역</span>
          </div>
        </Link>

        <Link href="#">
          <div className={cn("side-menu-link")}>
            <Image
              src={ICON.setting.default.src}
              width={24}
              height={24}
              alt={ICON.setting.default.alt}
              className={cn("side-menu-Image")}
            />
            <span>내 체험 관리</span>
          </div>
        </Link>

        <Link href="#">
          <div className={cn("side-menu-link")}>
            <Image
              src={ICON.calendarCheck.default.src}
              width={24}
              height={24}
              alt={ICON.calendarCheck.default.alt}
              className={cn("side-menu-Image")}
            />
            <span>예약 현황</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
