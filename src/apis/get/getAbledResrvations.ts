import { instance } from '@/apis/axios';

export const getAbledResrvationList = async (activityId = 152, year: number, month: string) => {
  const res = await instance.get(`/activities/${activityId}/available-schedule`, { params: { year, month } });
  return res.data;
};

export const getMyActivityReservationThisMonth = async (activityId: number, year: number, month: string) => {
  try {
    const res = await instance.get(`/my-activities/${activityId}/reservation-dashboard/`, { params: { year, month } });

    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const getReservedScheduleDate = async (activityId: number, date: string) => {
  const res = await instance.get(`/my-activities/${activityId}/reserved-schedule`, { params: { date } });
  const data = res.data;
  return data;
};

export const getMyActivitiesReservation = async (
  activityId: number,
  scheduleId: number,
  status: 'declined' | 'confirmed' | 'pending',
  size = 10,
  { pageParam }: { pageParam: number | undefined }
) => {
  try {
    const res = await instance.get(`/my-activities/${activityId}/reservations`, {
      params: { size, scheduleId, status, cursorId: pageParam ? pageParam : null },
    });

    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const getMyReserVations = async (size: number) => {
  const res = await instance.get(`/my-reservations`, { params: { size } });

  return res.data;
};
