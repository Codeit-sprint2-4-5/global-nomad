export interface Schedules {
  date: string;
  startTime: string;
  endTime: string;
  id?: number;
}
export interface PostActivityFormValues {
  title: string;
  category: string;
  description: string;
  address?: string;
  price: number;
  schedules: Schedules | Schedules[];
  bannerImageUrl: string;
  subImageUrls?: string[];
}

export interface PatchValues {
  title: string;
  category: string;
  description: string;
  price: number;
  address?: string;
  bannerImageUrl: string;
  subImageIdsToRemove: number[];
  subImageUrlsToAdd: string[];
  scheduleIdsToRemove: number[];
  schedulesToAdd?: Schedules[];
  schedules?: Schedules | Schedules[];
  subImageUrls?: string[];
}
