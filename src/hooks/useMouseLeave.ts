import { useState, useEffect, RefObject } from 'react';

export default function useMouseLeave(ref: RefObject<HTMLElement>) {
  const [ isMouseLeaved, setIsMouseLeaved ] = useState(false);

  useEffect(() => {
    if (!ref.current) {
      return;
    };

    const element = ref.current;

    const handleMouseLeave = () => {
      setIsMouseLeaved(true);
      setTimeout(() => setIsMouseLeaved(false), 10);
    };
  
    if (element) {
      element.addEventListener('mouseleave', handleMouseLeave);
    }
    
    return () => {
      if (element) {
        element.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return isMouseLeaved;
}