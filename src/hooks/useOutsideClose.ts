import { MutableRefObject, useEffect } from 'react';

export function useOutsideClick(ref: MutableRefObject<HTMLElement | null>, state: boolean, close: () => void) {
  const handleOutsideClick = (e: MouseEvent) => {
    if (state && ref.current && !ref.current.contains(e.target as Node)) {
      close();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [ref, state, close]);
}
