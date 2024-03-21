export default function debounce<T extends (...args: any[]) => void>(
  callback: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeOutId: ReturnType<typeof setTimeout>;

  return function (...args: Parameters<T>) {
    clearTimeout(timeOutId);
    timeOutId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}
