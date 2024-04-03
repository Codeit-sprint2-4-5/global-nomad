import IconButton from '@/components/common/button/IconButton';
import { ICON } from '@/constants';
import { Schedules } from '@/types';
import styles from './ScheduleList.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);
const { minusTime } = ICON;

interface ListProp {
  onDeleteSchedule: (id: number) => void;
  schedules: Schedules[];
}

interface ItemProp {
  onDeleteSchedule: (id: number) => void;
  schedule: Schedules;
}

export default function ScheduleList({ schedules, onDeleteSchedule }: ListProp) {
  return (
    <>
      <div className={cn('time-list-lable-box')}>
        <p className={cn('time-list-lable')}>날짜</p>
        <p className={cn('time-list-lable')}>시작 시간</p>
        <p className={cn('time-list-lable')}>종료 시간</p>
        <div style={{ width: 56 }}></div>
      </div>
      {schedules.map((schedule: Schedules) => (
        <ScheduleItem key={schedule.id} schedule={schedule} onDeleteSchedule={onDeleteSchedule} />
      ))}
    </>
  );
}

function ScheduleItem({ schedule, onDeleteSchedule }: ItemProp) {
  return (
    <article className={cn('date-list', 'box')}>
      <p className={cn('date-list-item', 'date')}>{schedule.date}</p>
      <p className={cn('date-list-item', 'time')}>{schedule.startTime}</p>
      <div className={cn('wave')}> ~ </div>
      <p className={cn('date-list-item', 'time')}>{schedule.endTime}</p>
      <IconButton
        type='button'
        size='56'
        onClick={() => schedule.id && onDeleteSchedule(schedule.id)}
        svg={minusTime.default.src}
        alt={minusTime.default.alt}
      />
    </article>
  );
}
