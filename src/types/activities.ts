export interface GetActivitiesList {
  address: string;
  bannerImageUrl: string;
  category: string;
  createdAt: string;
  description: string;
  id: number;
  price: number;
  rating: number;
  reviewCount: number;
  title: string;
  updatedAt: string;
  userId: number;
}

export type GetActivityDetail = {
  address: string;
  bannerImageUrl: string;
  category: string;
  createdAt: string;
  description: string;
  id: number;
  price: number;
  rating: number;
  reviewCount: number;
  schedules: {
    id: number;
    date: string;
    startTime: string;
    endTime: string;
  }[];
  subImages: {
    id: number;
    imageUrl: string;
  }[];
  title: string;
  updatedAt: string;
  userId: number;
};
