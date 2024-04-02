import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { instance } from '@/apis/axios';
import Dropdown from '@/components/common/dropdown/Dropdown';
import NoDataMessage from '@/components/common/noDataMessgae/NoDataMessage';
import Modal from '@/components/common/Modals';
import Title from '@/components/common/title/Title';
import Days from './Days';
import classNames from 'classnames/bind';
import styles from './Calendar.module.scss';

const cn = classNames.bind(styles);

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activityId, setActivityId] = useState(0);
  const [reservedDate, setReservedDate] = useState('');
  const [showModal, setShowModal] = useState('');
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

  const onReservedDate = (date: string) => {
    setReservedDate(date);
  };

  const onShowModal = (type: string) => {
    setShowModal(type);
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

  useEffect(() => {
    if (allActivity) {
      setActivityId(allActivity?.activities[0].id);
    }
  }, [allActivity?.activities]);

  if (allActivity?.activities.length === 0) return <NoDataMessage message='아직 등록한 체험이 없어요' />;

  return (
    <>
      <Title text='예약 현황' />
      <div className={cn('container')}>
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
        <div className={cn('calendar')} id='modal-root' style={{ position: 'relative' }}>
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
                      formattedmonth={formattedmonth}
                      onReservedDate={onReservedDate}
                      onShowModal={onShowModal}
                    />
                  </tr>
                ))}
            </tbody>
          </table>
          {showModal === 'reservationInfo' && (
            <Modal
              className={cn('reservedInfo')}
              modalType='reservationInfo'
              setShowModal={setShowModal}
              date={reservedDate}
              activityId={activityId}
            />
          )}
        </div>
      </div>
    </>
  );
}
