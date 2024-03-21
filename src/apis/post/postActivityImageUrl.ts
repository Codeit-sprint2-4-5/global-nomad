import { instance } from '../axios';

export const postActivityImageUrl = async (postData: FormData) => {
  const res = await instance.post('/activities/image', postData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res;
};
