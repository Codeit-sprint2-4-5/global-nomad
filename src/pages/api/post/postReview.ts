import { instance } from '@/pages/api/axios';

export const postMyReview = async (activityId: number, reviewData: unknown) => {
  try {
    await instance.post(`my-reservations/${activityId}/reviews`, reviewData);
  } catch (error: any) {
    alert(error.response.data.message);
  }
};
