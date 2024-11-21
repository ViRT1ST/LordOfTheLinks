import { useState, useEffect, RefObject } from 'react';
import { set } from 'zod';

export default function useMouseLeave(reactRef: RefObject<HTMLElement>) {
  const [ isMouseLeaved, setIsMouseLeaved ] = useState(false);

  useEffect(() => {
    const handleMouseLeave = () => {
      setIsMouseLeaved(true);
      setTimeout(() => setIsMouseLeaved(false), 100);
    };
  
    const element = reactRef.current;
  
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