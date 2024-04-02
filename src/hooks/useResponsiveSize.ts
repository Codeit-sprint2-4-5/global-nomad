import { useState, useEffect } from 'react';

interface WindowSize {
  width: number | undefined;
}

const useWindowSize = (): WindowSize => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
  });

  useEffect(() => {
    let timeoutId: number | null = null;
    setWindowSize({
      width: window.innerWidth,
    });
    const handleResize = () => {
      if (timeoutId === null) {
        timeoutId = window.setTimeout(() => {
          setWindowSize({
            width: window.innerWidth,
          });
          timeoutId = null;
        }, 100);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowSize;
};

const useResponsiveSize = (P = 8, T = 9, M = 4, S = 4): number => {
  const { width } = useWindowSize();
  const [sizeState, setSizeState] = useState<number>(8);

  useEffect(() => {
    if (!width) return;
    
    if (width >= 1200) {
      setSizeState(P);
      return;
    }
    
    if (width >= 768) {
      setSizeState(T);
      return;
    }
    
    if (width >= 430) {
      setSizeState(M);
      return;
    }
    
    if (width < 430) {
      setSizeState(S);
      return;
    }
  }, [P, T, M, S, width]);

  return sizeState;
};

export default useResponsiveSize;
