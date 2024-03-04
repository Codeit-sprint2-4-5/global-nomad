import Image from "next/image";
import styles from "./sideNavMenu.module.scss";
import classNames from "classnames/bind";
import { ICON } from "@/constants/importImages";
import { ChangeEvent, useRef, useState } from "react";

const cn = classNames.bind(styles);
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
  const initialValue = userProfileImage || "/images/default_profile_image.png";
  const [profileImage, setProfileImage] = useState<string>(initialValue);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
    return;
  };
  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if (!file) return;

    try {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    } catch (error) {
      console.error("이미지 업로드 중 오류가 발생했습니다.", error);
    }
  };

  const menuItems = [
    {
      name: "myInfo",
      iconSrc: ICON.accountCheck.default.src,
      iconAlt: ICON.accountCheck.default.alt,
      content: "내 정보",
    },
    {
      name: "reservationInfo",
      iconSrc: ICON.textBoxCheck.default.src,
      iconAlt: ICON.textBoxCheck.default.alt,
      content: "예약 내역",
    },
    {
      name: "myExperience",
      iconSrc: ICON.setting.default.src,
      iconAlt: ICON.setting.default.alt,
      content: "내 체험 관리",
    },
    {
      name: "reservationStatus",
      iconSrc: ICON.calendarCheck.default.src,
      iconAlt: ICON.calendarCheck.default.alt,
      content: "예약 현황",
    },
  ];

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
            src={ICON.pen.default.src}
            width={24}
            height={24}
            alt={ICON.pen.default.alt}
            className={cn("side-menu-Image-modify-icon")}
          />
        </div>
      </div>

      <ul className={cn("side-menu")}>
        {menuItems.map((menu, index) => (
          <li
            key={index}
            className={cn("side-menu-link", {
              active: activeMenu === menu.name,
            })}
            onClick={() => onclick(menu.name)}
          >
            <Image
              width={24}
              height={24}
              src={menu.iconSrc}
              alt={menu.iconAlt}
              className={cn("side-menu-Image")}
            />
            <span>{menu.content}</span>
          </li>
        ))}
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
