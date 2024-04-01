import Calendar from 'react-calendar';
import { Dispatch, MutableRefObject, Ref, SetStateAction } from 'react';
import { Value } from '../DateForm';
import styles from './smallCalender.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

interface CalenderProps {
  value?: Value;
  onChange: (data: Value | string) => void;
  ref?: MutableRefObject<null>;
}

export default function SmallCalender({ onChange, value }: CalenderProps) {
  return (
    <>
      <div className={cn('calendar-container')}>
        <Calendar minDate={new Date()} locale='en' value={value} onChange={onChange} />
      </div>
    </>
  );
}
