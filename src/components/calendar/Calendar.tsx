import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Calendar.module.scss';

const cn = classNames.bind(styles);

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const dayArr = ['SUN', 'MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT'];

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const prevMonthStartDay = new Date(currentYear, currentMonth, 1).getDay();
  const prevMonthEndDate = new Date(currentYear, currentMonth, 0).getDate();
  const currentMonthDay = new Date(currentYear, currentMonth + 1, 0);
  const remainingDate = 6 - currentMonthDay.getDay();
  const dateRow = currentMonthDay.getDay() === 0 ? 6 : 5;

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

  return (
    <>
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
                  {Array(7)
                    .fill(null)
                    .map((_, i) => {
                      const currentMonthDate = dayIdx * 7 + i;
                      const remainingDate =
                        currentMonthDate < prevMonthDate.length ||
                        currentMonthDate > prevMonthDate.length + currentMonthDay.getDate() - 1;

                      return (
                        <td key={i} className={cn({ active: remainingDate })}>
                          {days[currentMonthDate]}
                        </td>
                      );
                    })}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
