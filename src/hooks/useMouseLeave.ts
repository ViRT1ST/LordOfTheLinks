import { useState, useEffect, RefObject } from 'react';

export default function useMouseLeave(ref: RefObject<HTMLElement>) {
  const [ isMouseLeaved, setIsMouseLeaved ] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    };

    const handleMouseLeave = () => {
      setIsMouseLeaved(true);
    };

    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return isMouseLeaved;
}