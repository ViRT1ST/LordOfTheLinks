import { useEffect, useState } from 'react';

export default function useOutsideClick(ref: React.RefObject<HTMLElement>) {
  const [isOutsideClicked, setIsOutsideClicked] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    };

    const onOutsideClick = (e: MouseEvent) => {
      if (element && !element.contains(e.target as Node)) {
        setIsOutsideClicked(true);
      }
    };
  
    document.addEventListener('click', onOutsideClick);
    document.addEventListener('contextmenu', onOutsideClick);  

    return () => {
      document.removeEventListener('click', onOutsideClick);
      document.removeEventListener('contextmenu', onOutsideClick);  
    };
  }, []);

  return isOutsideClicked;
};