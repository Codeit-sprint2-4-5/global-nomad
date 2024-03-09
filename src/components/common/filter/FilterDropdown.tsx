import classNames from 'classnames/bind';
import styles from './Filter.module.scss';

const cn = classNames.bind(styles);

interface FilterDropdownProps {
  dropdownMenuList: { text: string; handleClick: () => void }[];
}

export default function FilterDropdown({ dropdownMenuList }: FilterDropdownProps) {
  return (
    <div className={cn('dropdown-menu')}>
      {dropdownMenuList.map((dropdownMenu) => (
        <button key={dropdownMenu.text} onClick={dropdownMenu.handleClick}>{dropdownMenu.text}</button>
      ))}
    </div>
  );
}
