import { FormValues } from '@/types/auth';
import { instance } from '@/apis/axios';

export const auth = {
  signup: async (userData: FormValues) => {
    const response = await instance.post('/users', userData);
    return response.data;
  },
  signin: async (userData: FormValues) => {
    const response = await instance.post('/auth/login', userData);
    return response.data;
  },
};
