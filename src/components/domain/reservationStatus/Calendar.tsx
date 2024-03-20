import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { instance } from '@/apis/axios';
import Chips from '@/components/common/chips/Chips';
import Dropdown from '@/components/common/dropdown/Dropdown';
import classNames from 'classnames/bind';
import styles from './Calendar.module.scss';
import { all } from 'axios';
import { resourceUsage } from 'process';

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

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activityId, setActivityId] = useState(0);
  const dayArr = ['SUN', 'MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT'];

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const prevMonthStartDay = new Date(currentYear, currentMonth, 1).getDay();
  const prevMonthEndDate = new Date(currentYear, currentMonth, 0).getDate();
  const currentMonthDay = new Date(currentYear, currentMonth + 1, 0);
  const remainingDate = 6 - currentMonthDay.getDay();
  const dateRow = currentMonthDay.getDay() === 0 ? 6 : 5;
  const formattedmonth = currentMonth + 1 < 10 ? '0' + (currentMonth + 1) : currentMonth + 1;

  const prevMonthDate = Array.from(
    { length: prevMonthStartDay },
    (_, i) => prevMonthEndDate - prevMonthStartDay + i + 1
  );
  const currentMonthDate = Array.from({ length: currentMonthDay.getDate() }, (_, i) => i + 1);
  const nextMonthDate = Array.from({ length: remainingDate }, (_, i) => i + 1);
  const days = [...prevMonthDate, ...currentMonthDate, ...nextMonthDate];

  const handlePrevClick = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1));
  };

  const handleNextClick = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1));
  };

  const onSelectedId = (id: number) => {
    setActivityId(id);
  };

  async function getAllActivity() {
    try {
      const res = await instance.get('/my-activities');
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }

  async function getMonthActivity() {
    try {
      const res = await instance.get(`/my-activities/${activityId}/reservation-dashboard`, {
        params: { year: currentYear, month: formattedmonth },
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }

  const { data: allActivity } = useQuery({
    queryKey: ['/my-activities'],
    queryFn: getAllActivity,
  });

  const { data: monthActivity } = useQuery({
    queryKey: [`/my-activities/${activityId}`],
    queryFn: getMonthActivity,
    enabled: activityId !== 0,
  });

  return (
    <>
      <Dropdown lists={allActivity?.activities} name='dropdown' labelText='체험명' onSelectedId={onSelectedId} />
      <div className={cn('date-control')}>
        <button type='button' className={cn('button', 'prev')} onClick={handlePrevClick}>
          이전
        </button>
        <div className={cn('date')}>
          <p className={cn('year')}>{currentYear}년</p>
          <p className={cn('month')}>{currentMonth + 1}월</p>
        </div>
        <button type='button' className={cn('button', 'next')} onClick={handleNextClick}>
          다음
        </button>
      </div>
      <div className={cn('calendar')}>
        <table className={cn('table')}>
          <colgroup>
            <col style={{ width: '14.2%' }} />
            <col style={{ width: '14.2%' }} />
            <col style={{ width: '14.2%' }} />
            <col style={{ width: '14.2%' }} />
            <col style={{ width: '14.2%' }} />
            <col style={{ width: '14.2%' }} />
            <col style={{ width: '14.2%' }} />
          </colgroup>
          <thead>
            <tr>
              {dayArr.map((day, i) => (
                <th key={i}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array(dateRow)
              .fill(null)
              .map((_, dayIdx) => (
                <tr key={dayIdx}>
                  <Days
                    dayIdx={dayIdx}
                    prevMonthDate={prevMonthDate}
                    currentMonthDay={currentMonthDay}
                    monthActivity={monthActivity}
                    currentYear={currentYear}
                    currentMonth={currentMonth}
                    days={days}
                  />
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function Days({ dayIdx, prevMonthDate, currentMonthDay, monthActivity, currentYear, currentMonth, days }: Props) {
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
