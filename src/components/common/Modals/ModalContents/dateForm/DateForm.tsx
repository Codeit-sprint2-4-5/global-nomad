import { useState } from 'react';
import { Control, Controller, UseFormSetValue } from 'react-hook-form';
import BaseButton from '@/components/common/button/BaseButton';
import SmallCalender from './smallCalendar/SmallCalender';
import styles from './DateForm.module.scss';
import classNames from 'classnames/bind';
import { postformatDate } from '../utills';
import { PostReservationData } from '@/components/common/floatingBox/FloatingBox';
import { GetActivityDetail } from '@/types';

const cn = classNames.bind(styles);

interface DateFormProps {
  control?: Control<PostReservationData, any>;
  onClickCloseModal?: () => void;
  className?: string;
  handleSelectSchedule?: (id: number) => void;
  abledShedule?: GetActivityDetail['schedules'];
}
type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function DateForm({
  handleSelectSchedule,
  control,
  onClickCloseModal,
  className,
  abledShedule,
}: DateFormProps) {
  const [calenderValue, onChangeCalender] = useState<Value>();
  const [scheduleId, setscheduleId] = useState<number>();
  const abledDate = abledShedule?.map((schedule) => schedule.date);

  const formatDate = postformatDate(calenderValue as Date);

  const handleClickTimes = (id: number) => {
    setscheduleId(id);
    if (handleSelectSchedule) {
      handleSelectSchedule(id);
    }
  };

  const handleChangeValue = (data: Value | string) => {
    onChangeCalender(data as Value);
  };

  return (
    <>
      <h2 className={cn('title', className)}>날짜</h2>
      <div className={cn('date-form', className)}>
        <SmallCalender abledDate={abledDate} value={calenderValue} onChange={handleChangeValue} />
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
                  {abledShedule?.map((schedule) =>
                    formatDate === schedule.date ? (
                      <li key={schedule.id} value={field.value}>
                        <BaseButton
                          onClick={() => handleClickTimes(schedule.id)}
                          text={`${schedule.startTime}~${schedule.endTime}`}
                          size='sm'
                          variant={scheduleId === schedule.id ? 'primary' : 'outline'}
                        />
                      </li>
                    ) : null
                  )}
                  {abledShedule?.filter((schedule) => formatDate === schedule.date).length === 0 && (
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
