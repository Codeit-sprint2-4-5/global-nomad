import { useState } from 'react';
import { Control, Controller, UseFormGetValues, UseFormSetValue } from 'react-hook-form';
import BaseButton from '@/components/common/button/BaseButton';
import SmallCalender from './smallCalendar/SmallCalender';
import { AbledReservationListData } from '@/types/dateform';
import styles from './DateForm.module.scss';
import classNames from 'classnames/bind';
import { PostformatDate } from '../utills';

const cn = classNames.bind(styles);

interface DateFormProps {
  control?: Control<any>;
  abledReservationListData?: AbledReservationListData[];
  onClickCloseModal?: () => void;
  className?: string;
  getValues?: UseFormGetValues<any>;
  setValue?: UseFormSetValue<any>;
  getdate?: string;
}

export default function DateForm({
  control,
  abledReservationListData,
  onClickCloseModal,
  className,
  setValue,
  getdate,
}: DateFormProps) {
  const [abled, setAbled] = useState(false);
  const [scheduleId, setScheduleId] = useState<number>();
  const abledDate = abledReservationListData?.find((date: any) => date.date === PostformatDate(getdate as string));

  console.log('날짜 데이터', abledDate);

  const handleClickTimes = (id: number) => {
    if (setValue) {
      setScheduleId(id);
      setValue('scheduleId', id);
    }
  };

  return (
    <>
      <h2 className={cn('title', className)}>날짜</h2>
      <div className={cn('date-form', className)}>
        <SmallCalender name='date' control={control} setValue={setValue} />
        <div className={cn('abled-time')}>
          <label htmlFor='abled-time' className={cn('abled-time-label')}>
            예약 가능한 시간
          </label>
          <ul className={cn('abled-time-input-list')}>
            <Controller
              name='scheduleId'
              control={control}
              render={({ field }) => (
                <>
                  {abledDate && abledDate.times.length > 0 ? (
                    abledDate.times.map((time) => (
                      <li key={time.id}>
                        <BaseButton
                          onClick={() => handleClickTimes(time.id)}
                          text={`${time.startTime}~${time.endTime}`}
                          size='sm'
                          variant={scheduleId === time.id ? 'primary' : 'outline'}
                        />
                      </li>
                    ))
                  ) : (
                    <p>해당하는 날짜에 예약 가능한 시간이 없습니다</p>
                  )}
                </>
              )}
            />
          </ul>
        </div>
        {onClickCloseModal && <BaseButton onClick={onClickCloseModal} type='button' text='작성하기' size='lg' />}
      </div>
    </>
  );
}
