import { useState } from 'react';

export default function useToggleButton() {
  const [isToggle, setToggle] = useState(false);

  const handleToggleClick = () => {
    setToggle((prev) => !prev);
  };

  return { isToggle, handleToggleClick };
}
