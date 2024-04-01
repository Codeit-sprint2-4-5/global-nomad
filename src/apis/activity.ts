import { instance } from '@/apis/axios';

export const activity = {
  getActivityDetail: async (id: string) => {
    const response = await instance.get(`/activities/${id}`);
    return response.data;
  },
};
