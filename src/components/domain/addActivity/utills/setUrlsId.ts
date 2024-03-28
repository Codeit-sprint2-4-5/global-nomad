export default function setUrlsId(url: string) {
  const startIndex = url.lastIndexOf('/2-5_') + 1; // 마지막 슬래시 다음부터
  const endIndex = url.lastIndexOf('.jpeg'); // .jpeg 직전까지

  if (startIndex !== -1 && endIndex !== -1 && endIndex - startIndex >= 6) {
    return url.slice(startIndex + 9, endIndex);
  } else {
    return '6자리 숫자를 찾을 수 없습니다.';
  }
}
