import { instance } from '../axios';

export const getMyNotifications = async () => {
  const res = await instance.get(`/my-notifications?size=10`);

  return res.data;
};
