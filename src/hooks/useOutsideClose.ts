import { MutableRefObject, useEffect } from 'react';

export function useOutsideClick(ref: MutableRefObject<HTMLElement | null>, state: boolean, close: () => void) {
  const handleOutsideClick = (e: MouseEvent) => {
    if (state && ref.current && !ref.current.contains(e.target as Node)) {
      close();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [ref, state, close]);
}
