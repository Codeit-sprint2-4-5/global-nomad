import { instance } from '../axios';

export const getReviews = async (activityId: number, page = 1, size = 3) => {
  const res = await instance.get(`/activities/${activityId}/reviews`, { params: { page, size } });

  return res.data;
};
