import { instance } from '../axios';

export const postReservation = async (activityId: number, data: unknown) => {
  try {
    const res = await instance.post(`/activities/${activityId}/reservations`, data);
    return res;
  } catch (e: any) {
    alert(e.response.message);
  }
};
