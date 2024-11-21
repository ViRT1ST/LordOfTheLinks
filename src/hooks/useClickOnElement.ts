import { useState, useEffect } from 'react';

export default function useClickOnElement(elementId: string) {
  const [ isClicked, setIsClicked ] = useState(false);

  useEffect(() => {
    const closeOnOverlayClick = (e: MouseEvent) => {
      if (e.target instanceof HTMLElement && e.target.id === elementId) {
        setIsClicked(true);
      }
    };

    document.body.addEventListener('click', closeOnOverlayClick);
      
    return () => {
      document.body.removeEventListener('click', closeOnOverlayClick);
      setIsClicked(false);
    };
  });

  return isClicked;
}
