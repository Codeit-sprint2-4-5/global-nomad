import { instance } from '../axios';

export const postReservation = async (activityId: number, data: unknown) => {
  const res = await instance.post(`/activities/${activityId}/reservations`, data);
  return res;
};
