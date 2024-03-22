import Image from 'next/image';
import styles from './sideNavMenu.module.scss';
import classNames from 'classnames/bind';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import MENU_ITEMS from '@/constants/menuItems';
import { ICON } from '@/constants';
import { useRouter } from 'next/router';
import { useMutation, useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import { auth } from '@/apis/auth';
import { AxiosError } from 'axios';
import Confirm from '../popup/confirm/Confirm';
import { GetUserData, ProfileFormValues } from '@/types/auth';

const cn = classNames.bind(styles);

type ErrorMessage = {
  message: string;
};
export default function SideNavMenu({ initialState }: { initialState?: string }) {
  const initialValue = '/images/Image_default_profile_image.png';
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [selectedMenu, setSelectedMenu] = useState(initialState);
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
      console.error('이미지 업로드 중 오류가 발생했습니다.', error);
    }
    const formData = new FormData();
    formData.append('image', file);
    getMutate(formData);
  };

  const handleMenuClick = (menuId: string) => {
    setSelectedMenu(menuId);
    router.push(`/mypage/${menuId}`);
  };
  useEffect(() => {
    if (userData?.profileImageUrl) {
      setProfileImage(userData.profileImageUrl);
    }
  }, [userData]);

  return (
    <>
      <div className={cn('side-menu-entire')}>
        <div className={cn('user-profile')}>
          <Image
            src={profileImage}
            height={160}
            width={160}
            alt='profileImage'
            className={cn('user-profile-image')}
            onClick={handleButtonClick}
            priority
          />
          <div className={cn('side-menu-Image-modify')} onClick={handleButtonClick}>
            <Image
              src={ICON.pen.default.src}
              width={24}
              height={24}
              alt={ICON.pen.default.alt}
              className={cn('side-menu-Image-modify-icon')}
            />
          </div>
        </div>

        <ul className={cn('side-menu')}>
          {MENU_ITEMS.map((menuItem) => (
            <li
              key={menuItem.id}
              className={cn('side-menu-link', {
                active: selectedMenu === menuItem.id,
              })}
              onClick={() => handleMenuClick(menuItem.id)}
            >
              <Image
                width={24}
                height={24}
                src={menuItem.iconSrc}
                alt={menuItem.iconAlt}
                className={cn('side-menu-Image')}
              />
              <span>{menuItem.content}</span>
            </li>
          ))}
        </ul>
        <input
          type='file'
          accept='image/jpeg, image/bmp, image/svg+xml,image/jpg'
          onChange={handleImageChange}
          className={cn('side-menu-file-input')}
          ref={inputRef}
        />
      </div>
      <Confirm dialogRef={dialogRef} text={popupMessage} />
    </>
  );
}
