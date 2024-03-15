import Image from "next/image";
import styles from "./sideNavMenu.module.scss";
import classNames from "classnames/bind";
import { ChangeEvent, useRef, useState } from "react";
import MENU_ITEMS from "@/constants/menuItems";
import { ICON } from "@/constants";
import { useRouter } from "next/router";
const cn = classNames.bind(styles);
export default function SideNavMenu({
  isVisible = false,
}: {
  isVisible?: boolean;
}) {
  const router = useRouter();
  const pathname = router.pathname;
  const selectedValue = pathname.substring("/mypage/".length);
  const initialValue = "/images/default_profile_image.png";
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

  const handleMenuClick = (menuId: string) => {
    router.push(`/mypage/${menuId}`);
  };

  return (
    <div className={cn("side-menu-entire", { isVisible: isVisible })}>
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
        {MENU_ITEMS.map((menuItem, index) => (
          <li
            key={index}
            className={cn("side-menu-link", {
              active: selectedValue === menuItem.id,
            })}
            onClick={() => handleMenuClick(menuItem.id)}
          >
            <Image
              width={24}
              height={24}
              src={menuItem.iconSrc}
              alt={menuItem.iconAlt}
              className={cn("side-menu-Image")}
            />
            <span>{menuItem.content}</span>
          </li>
        ))}
      </ul>
      <input
        type="file"
        accept="image/jpeg, image/bmp, image/svg+xml,image/jpg"
        onChange={handleImageChange}
        className={cn("side-menu-file-input")}
        ref={inputRef}
      />
    </div>
  );
}
