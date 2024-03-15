import Image from 'next/image';
import classNames from 'classnames/bind';
import styles from './Avatar.module.scss';
import { IMAGE } from '@/constants/importImages'; 

const cn = classNames.bind(styles);

interface AvatarProps {
	profileImageUrl: string | null;
  type: string;
}

export default function Avatar({ profileImageUrl, type }: AvatarProps) {
  const imageUrl = profileImageUrl || IMAGE.avatar.default.src;
	return (
  <div className={cn('container', type)}>
    <Image className={cn(type)} src={imageUrl} alt='프로필 이미지' height={45} width={45} />
  </div>
  );
}
