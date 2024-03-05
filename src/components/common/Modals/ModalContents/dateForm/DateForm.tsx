import { useState } from 'react';
import { Controller, Control, UseFormGetValues } from 'react-hook-form';
import Calender from '@/components/common/Modals/ModalContents/dateForm/calendar/Calender';
import BaseButton from '@/components/common/button/BaseButton';

import styles from './DateForm.module.scss';
import classNames from 'classnames/bind';
import { AbledReservationListData } from '@/components/common/floatingBox/FloatingBox';

const cn = classNames.bind(styles);

interface AbledReservationListDataItem {
  date: string;
  times: {
    id: number;
    startTime: string;
    endTime: string;
  }[];
}

interface DateFormProps {
  control?: Control<any>;
  abledReservationListData?: AbledReservationListData[];
  onClickCloseModal?: () => void;
  className?: string;
  getValues?: UseFormGetValues<any>;
}

export default function DateForm({ control, abledReservationListData, onClickCloseModal, className }: DateFormProps) {
  const [disabled, setDisabled] = useState(false);
  const abledDate = abledReservationListData;

  console.log('날짜 데이터', abledDate);
  return (
    <>
      <h2 className={cn('title', className)}>날짜</h2>
      <div className={cn('date-form', className)}>
        <Calender control={control} />
        <div className={cn('abled-time')}>
          <label htmlFor="abled-time" className={cn('abled-time-label')}>
            예약 가능한 시간
          </label>
          <ul className={cn('abled-time-input-list')}>
            {abledDate ? (
              abledDate[0].times.map((time) => (
                // date.times.map((time) =>
                <li key={time.id}>
                  <Controller
                    control={control}
                    name="abled-time"
                    render={({ ...field }) => (
                      <input
                        id="abled-time"
                        type="button"
                        {...field}
                        className={cn('abled-time-input-item')}
                        value={`${time.startTime}~${time.endTime}`}
                        disabled={disabled}
                      />
                    )}
                  />
                </li>
              ))
            ) : (
              <p key="dd">해당하는 날짜에 예약 가능한 시간이 없습니다</p>
            )}
          </ul>
        </div>
        {onClickCloseModal && <BaseButton onClick={onClickCloseModal} type="button" text="작성하기" size="lg" />}
      </div>
    </>
  );
}
