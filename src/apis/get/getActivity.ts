import { instance } from '../axios';

export const getActiviy = async (activityId: string) => {
  const res = await instance.get(`/activities/${activityId}`);

  return res.data;
};
