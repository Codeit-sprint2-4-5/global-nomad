import { ICON } from '@/constants/importImages';
import { useToggleButton } from '@/hooks';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import DropdownMenu from '../dropdownMenu/DropdownMenu';
import styles from './Filter.module.scss';

const cn = classNames.bind(styles);

interface FilterProps {
	type: 'price' | 'filter';
	setFilterState: Dispatch<SetStateAction<string>>;
}

interface FilterTypeProps {
	[type: string]: {
		text: string;
		list: {
			text: string;
			handleClick: () => void;
		}[];
	};
}

export default function Filter({ type, setFilterState }: FilterProps) {
	const { isToggle: isOpen, handleToggleClick: isOpentoggle } = useToggleButton();

	const handleDropdownOptionClick = (option: string) => {
		setFilterState(option);
		isOpentoggle();
	};

	const FilterType: FilterTypeProps = {
		price: {
			text: '가격',
			list: [
				{
					text: '가격이 낮은 순',
					handleClick: () => handleDropdownOptionClick('price_asc'),
				},
				{
					text: '가격이 높은 순',
					handleClick: () => handleDropdownOptionClick('price_desc'),
				},
			],
		},
		filter: {
			text: '필터',
			list: [
				{
					text: '예약 신청',
					handleClick: () => handleDropdownOptionClick('pending'),
				},
				{
					text: '예약 취소',
					handleClick: () => handleDropdownOptionClick('canceled'),
				},
				{
					text: '예약 승인',
					handleClick: () => handleDropdownOptionClick('confirmed'),
				},
				{
					text: '예약 거절',
					handleClick: () => handleDropdownOptionClick('declined'),
				},
				{
					text: '체험 완료',
					handleClick: () => handleDropdownOptionClick('completed'),
				},
			],
		},
	};

	return (
		<div className={cn('dropdown')}>
			<button className={cn('dropdown-button', { open: isOpen })} onClick={isOpentoggle}>
				<span>{FilterType[type].text}</span>
				<Image src={ICON.filter.default.src} alt={ICON.filter.default.alt} height={22} width={22} />
			</button>
			{isOpen && <DropdownMenu dropdownMenuList={FilterType[type].list} />}
		</div>
	);
}
