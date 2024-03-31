export default function isValidImage(file: File | null) {
  const extension = file?.name.split('.').pop();

  if (!file) return false;

  if (!extension || !['jpg', 'jpeg', 'png', 'gif'].includes(extension.toLowerCase())) {
    alert('사진을 선택해주세요.');
    return false;
  }
}
