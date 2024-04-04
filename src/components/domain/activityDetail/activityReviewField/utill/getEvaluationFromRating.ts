export function getEvaluationFromRating(avgRating: number) {
  const scale5Rating = Math.round(avgRating);
  let evaluation = '';
  switch (scale5Rating) {
    case 1:
      evaluation = '매우 나쁨';
      break;
    case 2:
      evaluation = '나쁨';
      break;
    case 3:
      evaluation = '보통';
      break;
    case 4:
      evaluation = '좋음';
      break;
    case 5:
      evaluation = '매우 좋음';
      break;
    default:
      evaluation = '평가 불가';
      break;
  }
  return evaluation;
}
