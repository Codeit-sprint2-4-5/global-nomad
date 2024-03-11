export const queryKey = {
  reservation: (activitiesId: number, year: number, month: string) => ['activities', activitiesId, year, month],
  myNotifications: ['myNotifications'],
};
