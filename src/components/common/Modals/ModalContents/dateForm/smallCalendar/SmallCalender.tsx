import Calendar from 'react-calendar';
import { Control, Controller, UseFormSetValue } from 'react-hook-form';
import styles from './smallCalender.module.scss';
import classNames from 'classnames/bind';
import { PostformatDate } from '../../utills';
import moment from 'moment';
import { useState } from 'react';

const cn = classNames.bind(styles);

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

interface CalenderProps {
  control?: Control;
  abledDate?: string[];
  name: 'date';
  setValue?: UseFormSetValue<any>;
}

export default function SmallCalender({ control, name, setValue }: CalenderProps) {
  const disabledDate = '2024-03-24';
  const DATE = new Date(disabledDate);

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className={cn('calendar-container')}>
            <Calendar
              minDate={new Date()}
              locale='en'
              value={field.value}
              onChange={(date) => {
                field.onChange(date);
                if (setValue) {
                  setValue(name, date);
                }
              }}
            />
          </div>
        )}
      />
    </>
  );
}
