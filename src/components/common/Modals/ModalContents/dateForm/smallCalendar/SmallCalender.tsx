import Calendar from 'react-calendar';
import { MutableRefObject } from 'react';
import { Value } from '../DateForm';
import styles from './SmallCalender.module.scss';
import classNames from 'classnames/bind';
import moment from 'moment';

const cn = classNames.bind(styles);

interface CalenderProps {
  value?: Value;
  onChange: (data: Value | string) => void;
  ref?: MutableRefObject<null>;
  abledDate?: string[];
}

export default function SmallCalender({ onChange, value, ref, abledDate }: CalenderProps) {
  return (
    <>
      <div className={cn('calendar-container')}>
        <Calendar
          minDate={new Date()}
          locale='en'
          ref={ref}
          value={value}
          onChange={onChange}
          tileDisabled={({ date }) => {
            return abledDate ? !abledDate.find((day) => day === moment(date).format('YYYY-MM-DD')) : false;
          }}
        />
      </div>
    </>
  );
}
