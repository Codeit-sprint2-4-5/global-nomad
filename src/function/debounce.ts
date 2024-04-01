export default function debounce(callback: () => void, time: number) {
  let timmer: NodeJS.Timeout;

  return () => {
    clearTimeout(timmer);
    timmer = setTimeout(() => {
      callback();
    }, time);
  };
}
