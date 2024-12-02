import { useState, useEffect, RefObject } from 'react';


export default function useClickOnElement(ref: RefObject<HTMLElement>) {
  const [ isClicked, setIsClicked ] = useState(false);

  useEffect(() => {
    if (!ref.current) {
      return;
    };

    const element = ref.current;
 
    const closeOnOverlayClick = (e: MouseEvent) => {
      if (e.target instanceof HTMLElement && e.target.id === ref?.current?.id) {
        setIsClicked(true);
      }
    };

    element.addEventListener('click', closeOnOverlayClick);

    return () => {
      element.removeEventListener('click', closeOnOverlayClick);
    };
  });

  return isClicked;
}
