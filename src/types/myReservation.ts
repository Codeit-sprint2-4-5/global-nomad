import { GetActivitiesList } from "./activities";

export interface Reservation {
  activity: GetActivitiesList;
  scheduleId: number;
  id: number;
  teamId: string;
  userId: number;
  status: string;
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetMyReservationListResponse {
  totalCount: number;
  reservations: Reservation[];
  cursorId: number;
}

export interface Reservations extends Reservation {
  nickname: string;
  activityId: number;
}

export interface ReservationResponse {
  reservations: Reservations[];
  totalCount: number;
  cursorId: number | null;
}
