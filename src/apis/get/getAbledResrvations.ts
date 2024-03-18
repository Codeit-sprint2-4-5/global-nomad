import { instance } from '@/apis/axios';

export const getAbledResrvationList = async (activityId = 152, year: number, month: string) => {
  const res = await instance.get(`/activities/${activityId}/available-schedule`, { params: { year, month } });
  return res.data;
};

export const getMyActivityReservationThisMonth = async (activityId: number, year: number, month: string) => {
  try {
    const res = await instance.get(`/my-activities/${activityId}/reservation-dashboard/`, { params: { year, month } });
    console.log('월별 예약 리스트', res);
    return res;
  } catch (e) {
    console.log(e);
  }
};

export const getMyActivitiesReservation = async (
  activityId: number,
  scheduleId: number,
  status = 'pending',
  size = 10
) => {
  try {
    const res = await instance.get(`/my-activities/${activityId}/reservations`, {
      params: { size, scheduleId, status },
    });

    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const getMyReserVations = async () => {
  const res = await instance.get(`/my-reservations?size=10`);

  return res.data;
};
