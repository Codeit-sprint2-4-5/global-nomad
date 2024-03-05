export default function getTimeAgo(timestamp: string): string {
  const current = new Date();
  const previous = new Date(timestamp);
  const diff = Math.abs(current.getTime() - previous.getTime()) / 1000;

  const seconds = Math.floor(diff);
  const minutes = Math.floor(diff / 60);
  const hours = Math.floor(diff / 3600);
  const days = Math.floor(diff / 86400);
  const months = Math.floor(diff / 2629800);
  const years = Math.floor(diff / 31557600);

  if (seconds < 60) {
    return '방금 전';
  } else if (minutes < 60) {
    return `${minutes}분 전`;
  } else if (hours < 24) {
    return `${hours}시간 전`;
  } else if (days < 30) {
    return `${days}일 전`;
  } else if (months < 12) {
    return `${months}달 전`;
  } else {
    return `${years}년 전`;
  }
}
