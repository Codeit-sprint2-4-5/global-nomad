import { instance } from '@/apis/axios';

export const getAbledResrvationList = async (activityId = 152, year: number, month: string) => {
  const res = await instance.get(`/activities/${activityId}/available-schedule`, { params: { year, month } });
  return res;
};

export const getMyReserVations = async () => {
  const res = await instance.get(`/my-reservations?size=10`);

  return res.data;
};
