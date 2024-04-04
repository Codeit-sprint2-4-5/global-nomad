import Image from 'next/image';
import { ICON } from '@/constants';
import style from '@/components/common/Input/inputField.module.scss';
import classNames from 'classnames/bind';
import { DetailedHTMLProps, forwardRef, InputHTMLAttributes, useMemo, useRef, useState } from 'react';
import { useOutsideClick, useToggleButton } from '@/hooks';
import SmallCalender from '../Modals/ModalContents/dateForm/smallCalendar/SmallCalender';
import { Value } from '../Modals/ModalContents/dateForm/DateForm';
import { postformatDate, displayDateFormat } from '../Modals/ModalContents/utills';

const cn = classNames.bind(style);

const { calendar } = ICON;

interface DateInputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  onPostDataValue: (value: string) => void;
  name: string;
}

export default forwardRef<HTMLInputElement, DateInputProps>(function DateInput(
  { name, onPostDataValue, ...props },
  ref
) {
  const [calenderValue, onChangeCalender] = useState<Value>();

  const { isToggle, handleToggleClick } = useToggleButton();
  const [selectedDate, setSelectedDate] = useState('');
  const outsideRef = useRef(null);

  useOutsideClick(outsideRef, isToggle, handleToggleClick);

  const nextShowValue = useMemo(() => calenderValue && displayDateFormat(calenderValue as Date), [calenderValue]);
  const nextPostValue = useMemo(() => calenderValue && postformatDate(calenderValue as Date), [calenderValue]);
  useMemo(() => {
    if (!nextShowValue) return;

    setSelectedDate(nextShowValue);
    onPostDataValue(nextPostValue as string);
  }, [calenderValue]);

  const handleDateSelected = (data: string | Value) => {
    onChangeCalender(data as Value);
    setSelectedDate(data as string);
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
            placeholder='YY/MM/DD'
            ref={ref}
          />
          <div className={cn('date-input-img')}>
            <Image src={calendar.default.src} alt={calendar.default.alt} width={28} height={28} />
          </div>
        </button>

        {isToggle && (
          <div className={cn('date-input-modal')}>
            <SmallCalender value={calenderValue} onChange={handleDateSelected} ref={outsideRef} />
          </div>
        )}
      </div>
    </>
  );
});
