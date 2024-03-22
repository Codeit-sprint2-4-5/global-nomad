export default function throttle(callback: () => void, interval: number): () => void {
  let isThrottle = false;
  return function () {
    if (!isThrottle) {
      isThrottle = true;
      callback();

      setTimeout(() => {
        isThrottle = false;
      }, interval);
    }
  };
}
