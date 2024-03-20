import Chips from '@/components/common/chips/Chips';
import classNames from 'classnames/bind';
import styles from './Calendar.module.scss';

const cn = classNames.bind(styles);

interface Item {
  date: string;
  reservations: {
    pending: string;
    confirmed: string;
    completed: string;
  };
}

interface Props {
  dayIdx: number;
  prevMonthDate: number[];
  currentMonthDay: Date;
  monthActivity: any;
  currentYear: number;
  currentMonth: number;
  days: number[];
}

export default function Days({
  dayIdx,
  prevMonthDate,
  currentMonthDay,
  monthActivity,
  currentYear,
  currentMonth,
  days,
}: Props) {
  return (
    <>
      {Array(7)
        .fill(null)
        .map((_, i) => {
          const currentMonthDate = dayIdx * 7 + i;
          const remainingDate =
            currentMonthDate < prevMonthDate.length ||
            currentMonthDate > prevMonthDate.length + currentMonthDay.getDate() - 1;

          let statusPending;
          let statusConfirmed;
          let statusCompleted;
          const reservationDate = monthActivity?.some((item: Item) => {
            const [year, month, day] = item.date.split('-').map(Number);
            const formattedMonth = month < 10 ? '0' + month : month;
            const { pending, confirmed, completed } = item.reservations;
            statusPending = pending;
            statusConfirmed = confirmed;
            statusCompleted = completed;

            return (
              year === currentYear && Number(formattedMonth) === currentMonth + 1 && day === days[currentMonthDate]
            );
          });

          const isStatusCompleted = statusCompleted ? 'active' : '';
          let status: 'confirmed' | 'reservation' | 'complete' | 'seat';
          let count;

          if (statusPending !== 0) {
            status = 'reservation';
            count = statusPending;
          } else if (statusConfirmed !== 0) {
            status = 'confirmed';
            count = statusConfirmed;
          } else {
            status = 'complete';
            count = statusCompleted;
          }

          const handleDateClick = () => {
            //예약 정보 모달 연결
          };

          return (
            <td key={i} className={cn({ active: remainingDate }, { on: reservationDate })} onClick={handleDateClick}>
              {days[currentMonthDate]}
              {reservationDate && !remainingDate && (
                <>
                  <span className={cn('status', { active: isStatusCompleted })}></span>
                  <div className={cn('chips')}>
                    {statusPending && statusConfirmed ? (
                      <>
                        <Chips status={status} count={count} />
                        <Chips status={status} count={count} />
                      </>
                    ) : (
                      <Chips status={status} count={count} />
                    )}
                  </div>
                </>
              )}
            </td>
          );
        })}
    </>
  );
}
