import { MouseEvent, useRef, useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames/bind';
import { useOutsideClick, useToggleButton } from '@/hooks';
import { ICON, USER_CATEGORYS } from '@/constants';
import style from '@/components/common/dropdown/dropdown.module.scss';

const { downArrow, check } = ICON;

const cn = classNames.bind(style);

interface DropdownProps {
  name: string;
  labelText?: string;
  lists?: string[];
}

export default function Dropdown({ name, labelText, lists = USER_CATEGORYS, ...props }: DropdownProps) {
  const { isToggle, handleToggleClick } = useToggleButton();
  const [selectedList, setSelectedList] = useState<string | null>(labelText ? lists[0] : null);
  const dropdownRef = useRef(null);

  useOutsideClick(dropdownRef, isToggle, handleToggleClick);

  const handleCategorySelecte = (list: string | null, e: MouseEvent<HTMLLIElement>) => {
    setSelectedList(list);
    handleToggleClick();
    e.stopPropagation();
  };

  return (
    <div className={cn('dropdown-field')}>
      <button
        className={cn('dropdown-btn', { 'rotate-arrow': isToggle })}
        type='button'
        onClick={handleToggleClick}
        ref={dropdownRef}
      >
        <input
          className={cn('dropdown')}
          name={name}
          placeholder='카테고리'
          readOnly
          value={selectedList || ''}
          {...props}
        />
        {labelText && <span className={cn('dropdown-label')}>{labelText}</span>}
        <Image
          className={cn('dropdown-btn-img')}
          src={downArrow.default.src}
          alt={downArrow.default.alt}
          width={48}
          height={48}
        />
      </button>
      {isToggle && (
        <ul className={cn('dropdown-options')}>
          {lists.map((list, index) => (
            <li
              className={cn('dropdown-option')}
              key={`key-${index}`}
              onClick={(e) => {
                handleCategorySelecte(list, e);
              }}
            >
              <button className={cn('dropdown-option-btn', { selected: list === selectedList })}>
                {list === selectedList && (
                  <Image src={check.default.src} alt={check.default.alt} width={20} height={20} />
                )}
                <span>{list}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
