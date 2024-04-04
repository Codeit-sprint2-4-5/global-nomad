import { FormValues, ProfileFormValues } from '@/types/auth';
import { instance } from '@/apis/axios';
import axios from 'axios';

export const auth = {
  signup: async (userData: FormValues) => {
    const response = await instance.post('/users', userData);
    return response.data;
  },
  signin: async (userData: FormValues) => {
    const response = await instance.post('/auth/login', userData);
    return response.data;
  },
  getUser: async () => {
    const response = await instance.get('/users/me');
    return response.data;
  },
  patchUser: async (patchData: ProfileFormValues) => {
    const response = await instance.patch('/users/me', patchData);
    return response.data;
  },
  getImageUrl: async (imageUrl: FormData) => {
    const response = await instance.post('/users/me/image', imageUrl);
    return response.data;
  },
  tokensUpdate: async (refreshToken: string) => {
    const response = await axios.post(
      'https://sp-globalnomad-api.vercel.app/2-5/auth/tokens',
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  },
};
