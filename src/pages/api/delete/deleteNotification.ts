import { instance } from '../axios';

export const delelteNotifications = async (id: number) => {
  try {
    const res = await instance.delete(`/my-notifications/${id}`);

    return res.data;
  } catch (error: any) {
    alert(error.message);
  }
};
