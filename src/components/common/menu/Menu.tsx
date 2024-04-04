import { ICON } from '@/constants/importImages';
import { useOutsideClick, useToggleButton } from '@/hooks';
import classNames from 'classnames/bind';
import Image from 'next/image';
import DropdownMenu from '../dropdownMenu/DropdownMenu';
import styles from './Menu.module.scss';
import { useRef } from 'react';

const cn = classNames.bind(styles);

interface MenuProps {
	handleModifyClick: () => void;
	handleDeleteClick: () => void;
}

interface MenuListProps {
	list: [
		{
			text: string;
			handleClick: () => void;
		},
		{
			text: string;
			handleClick: () => void;
		}
	];
}

export default function Menu({ handleModifyClick, handleDeleteClick }: MenuProps) {
	const { isToggle: isOpen, handleToggleClick: isOpenToggle } = useToggleButton();
  const ref = useRef<HTMLButtonElement>(null);

  useOutsideClick(ref,isOpen,isOpenToggle)

	const handleModifyOptionClick = () => {
		handleModifyClick();
		isOpenToggle();
	};

	const handleDeleteOptionClick = () => {
		handleDeleteClick();
		isOpenToggle();
	};

	const MenuList: MenuListProps = {
		list: [
			{
				text: '수정하기',
				handleClick: () => handleModifyOptionClick(),
			},
			{
				text: '삭제하기',
				handleClick: () => handleDeleteOptionClick(),
			},
		],
	};

	return (
		<div className={cn('menu')}>
			<button className={cn('menu-button', { open: isOpen })} onClick={isOpenToggle} ref={ref}>
				<Image src={ICON.menu.default.src} alt={ICON.menu.default.alt} height={40} width={40} />
			</button>
			{isOpen && <DropdownMenu dropdownMenuList={MenuList.list} type='meatball' />}
		</div>
	);
}
