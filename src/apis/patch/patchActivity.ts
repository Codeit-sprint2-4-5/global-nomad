import { instance } from '../axios';

export const patchActivity = async (activityId: number, data: unknown) => {
  try {
    const res = await instance.patch(`/my-activities/${activityId}`, data);

    return res;
  } catch (error: any) {
    return console.log(error);
  }
};
