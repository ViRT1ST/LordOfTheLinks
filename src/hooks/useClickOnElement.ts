import { useState, useEffect, RefObject } from 'react';

export default function useClickOnElement(ref: RefObject<HTMLElement>) {
  const [ isClicked, setIsClicked ] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    };

    const onElementClick = (e: MouseEvent) => {
      if (e.target instanceof HTMLElement && e.target.id === element.id) {
        setIsClicked(true);
      }
    };

    element.addEventListener('click', onElementClick);

    return () => {
      element.removeEventListener('click', onElementClick);
    };
  }, []);

  return isClicked;
}
