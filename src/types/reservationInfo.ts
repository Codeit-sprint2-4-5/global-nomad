export interface ReservationCardType {
  activityId: number;
  createdAt: string | Date;
  date: string | Date;
  endTime: string;
  headCount: number;
  id: number;
  nickname: string;
  reviewSubmitted: boolean;
  scheduleId: number;
  startTime: string;
  status: 'declined' | 'confirmed' | 'pending';
  teamId: string;
  totalPrice: number;
  updatedAt: string | Date;
  userId: number;
}
