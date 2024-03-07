import { useState } from 'react';

export function useToggleButton(): { isToggle: boolean; handleToggleClick: () => void } {
  const [isToggle, setIsToggle] = useState<boolean>(false);

  const handleToggleClick = () => {
    setIsToggle((prev) => !prev);
  };

  return { isToggle, handleToggleClick };
}
