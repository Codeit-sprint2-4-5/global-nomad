import { instance } from '../axios';

export const getMyNotifications = async (size: number) => {
  const res = await instance.get(`/my-notifications`, { params: { size } });

  return res.data;
};
