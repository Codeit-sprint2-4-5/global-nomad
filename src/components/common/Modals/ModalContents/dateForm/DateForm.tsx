import { useState } from 'react';
import { Control, Controller, UseFormGetValues, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import BaseButton from '@/components/common/button/BaseButton';
import SmallCalender from './smallCalendar/SmallCalender';
import { AbledReservationListData } from '@/types/dateform';
import styles from './DateForm.module.scss';
import classNames from 'classnames/bind';
import { PostformatDate } from '../utills';
import { PostReservationData } from '@/components/common/floatingBox/FloatingBox';

const cn = classNames.bind(styles);

interface DateFormProps {
  control?: Control<PostReservationData, any, PostReservationData>;
  abledReservationListData?: AbledReservationListData[];
  onClickCloseModal?: () => void;
  className?: string;
  getValues?: UseFormGetValues<any>;
  setValue?: UseFormSetValue<any>;
  getdate?: string;
  register?: UseFormRegister<PostReservationData>;
}
type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function DateForm({
  setValue,
  control,
  abledReservationListData,
  onClickCloseModal,
  className,
}: DateFormProps) {
  const [calenderValue, onChangeCalender] = useState<Value>();
  const formatDate = PostformatDate(calenderValue as Date);

  const [scheduleId, setscheduleId] = useState<number>();
  const abledDate = abledReservationListData?.find((data: AbledReservationListData) => data.date === formatDate);

  const handleClickTimes = (id: number) => {
    setscheduleId(id);
    if (setValue) {
      setValue('scheduleId', id);
    }
  };

  return (
    <>
      <h2 className={cn('title', className)}>날짜</h2>
      <div className={cn('date-form', className)}>
        <SmallCalender value={calenderValue} onChange={onChangeCalender} />
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
                      <li key={time.id} value={field.value}>
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
