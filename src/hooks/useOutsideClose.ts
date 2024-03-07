import { MutableRefObject, useEffect } from 'react';

export function useOutsideClick(ref: MutableRefObject<HTMLElement | null>, state: boolean, close: () => void) {
  const handleClickOutside = (e: MouseEvent) => {
    if (state && ref.current && !ref.current.contains(e.target as Node)) {
      close();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [ref, state, close]);
}
