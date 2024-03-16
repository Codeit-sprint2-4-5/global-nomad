import { DetailedHTMLProps, InputHTMLAttributes, useRef, useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames/bind';
import { useOutsideClick, useToggleButton } from '@/hooks';
import { ICON } from '@/constants';
import style from '@/components/common/dropdown/dropdown.module.scss';

const { downArrow, check } = ICON;

const cn = classNames.bind(style);

interface DropdownProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  name: string;
  labelText?: string;
  lists: { id: number; category: string; title?: string }[];
}

export default function Dropdown({ name, labelText, lists, ...props }: DropdownProps) {
  const { isToggle, handleToggleClick } = useToggleButton();
  const [selectedList, setSelectedList] = useState<number | null>(labelText ? lists[0].id : null);
  const dropdownRef = useRef(null);
  const isLabelText = labelText ? lists[selectedList as number]?.title : lists[selectedList as number]?.category;

  useOutsideClick(dropdownRef, isToggle, handleToggleClick);

  const handleSelectedClick = (id: number) => {
    setSelectedList(id);
    handleToggleClick();
  };

  return (
    <div className={cn('dropdown-field')}>
      <button
        className={cn('dropdown-btn', { 'rotate-arrow': isToggle })}
        type='button'
        onClick={handleToggleClick}
        ref={dropdownRef}
      >
        <input {...props} className={cn('dropdown')} name={name} readOnly value={isLabelText} />
        {labelText && <span className={cn('dropdown-label')}>{labelText}</span>}
        <Image
          className={cn('dropdown-btn-img')}
          src={downArrow.default.src}
          alt={downArrow.default.alt}
          width={48}
          height={48}
        />
      </button>
      <ul className={cn('dropdown-options', { show: isToggle })}>
        {lists.map((list) => (
          <li className={cn('dropdown-option')} key={`key-${list.id}`}>
            <button
              type='button'
              className={cn('dropdown-option-btn', { selected: list.id === selectedList })}
              onClick={() => handleSelectedClick(list.id)}
            >
              {list.id === selectedList && (
                <Image src={check.default.src} alt={check.default.alt} width={20} height={20} />
              )}
              <span>{labelText ? list.title : list.category}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
