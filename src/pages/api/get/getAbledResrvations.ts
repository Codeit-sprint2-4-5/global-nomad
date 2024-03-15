import { instance } from '@/pages/api/axios';

// export const postMyReview = async (activityId: number, reviewData: unknown) => {
//   try {
//     await instance.post(`my-reservations/${activityId}/reviews`, reviewData);
//   } catch (error) {
//     alert(error?.message);
//   }
// };

export const getAbledResrvationList = async (activityId = 152, year: number, month: string) => {
  const res = await instance.get(`/activities/${activityId}/available-schedule`, { params: { year, month } });
  return res;
};

export const getMyReserVations = async () => {
  const res = await instance.get(`/my-reservations?size=10`);

  return res.data;
};
