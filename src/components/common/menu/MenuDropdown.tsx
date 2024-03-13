import classNames from 'classnames/bind';
import styles from './Menu.module.scss';

const cn = classNames.bind(styles);

interface MenuDropdownProps {
  dropdownMenuList: { text: string; handleClick: () => void }[];
}

export default function MenuDropdown({ dropdownMenuList }: MenuDropdownProps) {
  return (
    <div className={cn('dropdown-menu')}>
      {dropdownMenuList.map((dropdownMenu) => (
        <button key={dropdownMenu.text} onClick={dropdownMenu.handleClick}>{dropdownMenu.text}</button>
      ))}
    </div>
  );
}
