import Image from 'next/image';
import { ICON } from '@/constants';
import style from '@/components/common/Input/inputField.module.scss';
import classNames from 'classnames/bind';
import { DetailedHTMLProps, InputHTMLAttributes, useRef, useState } from 'react';
import { useOutsideClick, useToggleButton } from '@/hooks';

const cn = classNames.bind(style);

const { calendar } = ICON;

interface DateInputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  name: string;
}

export default function DateInput({ name, ...props }: DateInputProps) {
  const { isToggle, handleToggleClick } = useToggleButton();
  const [selectedDate, setSelectedDate] = useState('');
  const outsideRef = useRef(null);

  useOutsideClick(outsideRef, isToggle, handleToggleClick);

  const handleDateSelected = (data) => {
    setSelectedDate(data);
    handleToggleClick();
  };

  return (
    <>
      <div className={cn('date-input-field')}>
        <button className={cn('date-input-btn')} type='button' onClick={handleToggleClick}>
          <input
            {...props}
            className={cn('date-input')}
            name={name}
            type='text'
            value={selectedDate ? selectedDate : ''}
            readOnly
            placeholder='yy/mm/dd'
          />
          <div className={cn('date-input-img')}>
            <Image src={calendar.default.src} alt={calendar.default.alt} width={28} height={28} />
          </div>
        </button>
      </div>
      <div className={cn('date-input-modal', { visible: isToggle })}>
        {/* 모달 추가 TODO */}
        {/* <DatePicker onSelecte={handleDateSelecte} ref={outsideRef} /> */}
        {/* ref 지정해주어야 외부 클릭시 닫힙니다 */}
      </div>
    </>
  );
}
