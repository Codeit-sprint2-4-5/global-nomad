import { instance } from '@/apis/axios';
import { ICON, IMAGE } from '@/constants';
import { useToggleButton } from '@/hooks';
import { myInfoProps } from '@/types/myInfo';
import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Avatar from '../avatar/Avatar';
import DropdownMenu from '../dropdownMenu/DropdownMenu';
import styles from './GNB.module.scss';

const cn = classNames.bind(styles);

export default function GNB() {
	const router = useRouter();
	const [Auth, setAuth] = useState(false);
	const { isToggle: isDropdownOpen, handleToggleClick: setIsDropdownOpen } = useToggleButton();

	const getMyInfo = async () => {
		const { data } = await instance.get<myInfoProps>('/users/me');
		return data;
	};

	const { data: MyInfoData, isPending } = useQuery({
		queryKey: ['myInfo'],
		queryFn: getMyInfo,
    retry: false,
	});

	const handleLogout = () => {
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
		if (!localStorage.getItem('accessToken')) {
			setIsDropdownOpen();
			router.push('/');
		}
	};

  const handleMyPageClick = () => {
    setIsDropdownOpen();
    router.push('/mypage');
  }

	const MyMenuList = [
		{
			text: '내 정보',
			handleClick: handleMyPageClick,
		},
		{
			text: '로그아웃',
			handleClick: handleLogout,
		},
	];

	useEffect(() => {
		if (localStorage.getItem('accessToken')) {
			setAuth(true);
			return;
		}
		setAuth(false);
	}, []);

	if (isPending) {
		return null;
	}

	return (
		<div className={cn('container')}>
			<button>
				<Image src={IMAGE.logo.nav.src} alt={IMAGE.logo.nav.alt} height={28} width={166} />
			</button>
			<div>
				{!Auth ? (
					<div className={cn('not', 'user')}>
						<Link href='/signin'>로그인</Link>
						<Link href='/signup'>회원가입</Link>
					</div>
				) : (
					<div className={cn('user')}>
						<button className={cn('gnb-button')}>
							<Image src={ICON.notification.default.src} alt={ICON.notification.default.alt} />
						</button>
						<div className={cn('dropdown-menu-box')}>
							<div className={cn('stroke')} />
							<div className={cn('user-profile-box')}>
								<Avatar profileImageUrl={MyInfoData?.profileImageUrl} type='gnb' />
								<button className={cn('gnb-button')} onClick={setIsDropdownOpen}>
									{MyInfoData?.nickname}
								</button>
								{isDropdownOpen && <DropdownMenu type='gnb' dropdownMenuList={MyMenuList} />}
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
