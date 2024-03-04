import Image from "next/image";
import styles from "./sideNavMenu.module.scss";
import classNames from "classnames/bind";
import { ICON } from "@/constants/importImages";
import { ChangeEvent, useRef, useState } from "react";

interface SideNavMenuProps {
  userProfileImage: string | null;
  activeMenu: string;
  onclick: (menu: string) => void;
}

export default function SideNavMenu({
  userProfileImage,
  activeMenu,
  onclick,
}: SideNavMenuProps) {
  const [profileImage, setProfileImage] = useState<string>(
    userProfileImage || "/images/default_profile_image.png"
  );

  const cn = classNames.bind(styles);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if (!file) return;

    try {
      const imageUrl = await readFileAsDataURL(file);
      setProfileImage(imageUrl);
    } catch (error) {
      console.error("이미지 업로드 중 오류가 발생했습니다.", error);
    }
  };

  const readFileAsDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          reject(new Error("파일을 읽는 데 실패했습니다."));
        }
      };
      reader.onerror = () => {
        reject(reader.error);
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className={cn("side-menu-entire")}>
      <div className={cn("user-profile")}>
        <Image
          src={profileImage}
          height={160}
          width={160}
          alt="profileImage"
          className={cn("user-profile-image")}
          onClick={handleButtonClick}
        />
        <div
          className={cn("side-menu-Image-modify")}
          onClick={handleButtonClick}
        >
          <Image
            width={24}
            height={24}
            src={ICON.pen.default.src}
            alt={ICON.pen.default.alt}
            className={cn("side-menu-Image-modify-icon")}
          />
        </div>
      </div>

      <ul className={cn("side-menu")}>
        <li
          className={cn("side-menu-link", {
            active: activeMenu === "myInfo",
          })}
          onClick={() => onclick("myInfo")}
        >
          <Image
            src={ICON.accountCheck.default.src}
            width={24}
            height={24}
            alt={ICON.accountCheck.default.alt}
            className={cn("side-menu-Image")}
          />
          <span>내 정보</span>
        </li>

        <li
          className={cn("side-menu-link", {
            active: activeMenu === "reservationInfo",
          })}
          onClick={() => onclick("reservationInfo")}
        >
          <Image
            src={ICON.textBoxCheck.default.src}
            width={24}
            height={24}
            alt={ICON.textBoxCheck.default.alt}
            className={cn("side-menu-Image")}
          />
          <span>예약 내역</span>
        </li>

        <li
          className={cn("side-menu-link", {
            active: activeMenu === "myExperience",
          })}
          onClick={() => onclick("myExperience")}
        >
          <Image
            src={ICON.setting.default.src}
            width={24}
            height={24}
            alt={ICON.setting.default.alt}
            className={cn("side-menu-Image")}
          />
          <span>내 체험 관리</span>
        </li>

        <li
          className={cn("side-menu-link", {
            active: activeMenu === "reservationStatus",
          })}
          onClick={() => onclick("reservationStatus")}
        >
          <Image
            src={ICON.calendarCheck.default.src}
            width={24}
            height={24}
            alt={ICON.calendarCheck.default.alt}
            className={cn("side-menu-Image")}
          />
          <span>예약 현황</span>
        </li>
      </ul>
      <input
        type="file"
        accept="image/jpeg"
        onChange={handleImageChange}
        className={cn("side-menu-file-input")}
        ref={inputRef}
      />
    </div>
  );
}
