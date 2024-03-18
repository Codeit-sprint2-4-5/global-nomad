import { useState } from 'react';
import { Controller, Control, UseFormGetValues, useWatch, UseFormSetValue } from 'react-hook-form';
import BaseButton from '@/components/common/button/BaseButton';

import styles from './DateForm.module.scss';
import classNames from 'classnames/bind';
import { AbledReservationListData } from '@/components/common/floatingBox/FloatingBox';
import SmallCalender from './smallCalendar/SmallCalender';

const cn = classNames.bind(styles);

export interface AbledReservationListDataType {
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
  setValue?: UseFormSetValue<any>;
}

export default function DateForm({
  control,
  abledReservationListData,
  onClickCloseModal,
  className,
  setValue,
}: DateFormProps) {
  const [disabled, setDisabled] = useState(false);
  const abledDate = abledReservationListData?.map((date: any) => date.date);

  console.log('날짜 데이터', abledDate);

  return (
    <>
      <h2 className={cn('title', className)}>날짜</h2>
      <div className={cn('date-form', className)}>
        <SmallCalender name='date' abledDate={abledDate} control={control} setValue={setValue} />
        <div className={cn('abled-time')}>
          <label htmlFor='abled-time' className={cn('abled-time-label')}>
            예약 가능한 시간
          </label>
          <ul className={cn('abled-time-input-list')}>
            {/* {abledDate?..map(
              (time) => (
                // date.times.map((time) =>
                <li key={time.id}>
                  <BaseButton text={`${time.startTime}~${time.endTime}`} size='sm' variant={'outline'} />
                </li>
              )

              // <p key='dd'>해당하는 날짜에 예약 가능한 시간이 없습니다</p>
            )} */}
          </ul>
        </div>
        {onClickCloseModal && <BaseButton onClick={onClickCloseModal} type='button' text='작성하기' size='lg' />}
      </div>
    </>
  );
}
