import classNames from 'classnames/bind';
import styles from './DropdownMenu.module.scss';

const cn = classNames.bind(styles);

interface DropdownMenuProps {
	type?: 'meatball' | 'gnb';
	dropdownMenuList: { text: string; handleClick: () => void }[];
}

export default function DropdownMenu({ type, dropdownMenuList }: DropdownMenuProps) {
	return (
		<div className={cn('dropdown-menu', type)}>
			{dropdownMenuList.map((dropdownMenu) => (
				<button key={dropdownMenu.text} onClick={dropdownMenu.handleClick}>
					{dropdownMenu.text}
				</button>
			))}
		</div>
	);
}
