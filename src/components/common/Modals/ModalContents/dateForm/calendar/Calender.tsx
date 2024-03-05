import Calendar from 'react-calendar';
import { Control, Controller } from 'react-hook-form';
import styles from './Calender.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

interface CalenderProps {
  control?: Control;
  abledDate?: string[];
}

export default function Calender({ control, abledDate }: CalenderProps) {
  const disabledDate = '';
  return (
    <Controller
      name="date"
      control={control}
      render={({ field }) => (
        <div className={cn('calendar-container')}>
          <Calendar
            minDate={new Date()}
            // formatDay={(date) =>
            //   new Intl.DateTimeFormat({
            //     year: 'numeric',
            //     month: '2-digit',
            //     day: '2-digit',
            //   }).format(date)
            // //tileDisabled={({ date }) => isDisabled(date)} // 수정된 부분
            locale="en"
            {...field}
          />
        </div>
      )}
    />
  );
}
