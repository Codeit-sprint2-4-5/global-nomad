import { useEffect, useState } from 'react';

export function useIsLoggedIn() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (!accessToken || !refreshToken) {
      setIsLoggedIn(false);
      return;
    }
    setIsLoggedIn(true);
  }, []);

  return isLoggedIn;
}
