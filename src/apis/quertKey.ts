export const queryKey = {
  reservation: (activitiesId: number, year: number, month: string) => ['activities', activitiesId, year, month],
  myNotifications: ['myNotifications'],
  myActivities: ['my-activities'],
  myReservations: ['my-reservations'],
  getMyReservationsUseTime: (scheduledId: number, selectedStatus: string) => [
    'my-activities',
    'reservation',
    scheduledId,
    selectedStatus,
  ],
  getMyReservationUseDate: (date: string) => ['my-activities', 'reservation', date],
};
