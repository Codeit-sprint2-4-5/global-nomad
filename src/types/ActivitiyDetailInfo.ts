interface SubImage {
  id: number;
  imageUrl: string;
}

interface Schedule {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
}

interface ActivityDetailInfo {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
  subImages: SubImage[];
  schedules: Schedule[];
}
export default ActivityDetailInfo;
