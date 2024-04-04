export default function isValidImage(file: File | null) {
  const extension = file?.name.split('.').pop();

  if (!file) return false;

  if (!extension || !['jpg', 'jpeg', 'png', 'gif'].includes(extension.toLowerCase())) {
    alert('사진을 선택해주세요.');
    return false;
  }

  if (file.size > 1024 * 1024 * 2) {
    return alert('사진 크기는 2MB를 초과할 수 없습니다.');
  }
}
