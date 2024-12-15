import { useState, useEffect } from 'react';

export default function useKey(eventKey: string) {
  const [ isPressed, setIsPressed ] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === eventKey) {
        setIsPressed(true);
      }
    };

    document.addEventListener('keydown', onKeyDown);

    // imidiatelly reset state and remove event listener after every trigger
    // without it will work only once
    if (isPressed) {
      setIsPressed(false);
      document.removeEventListener('keydown', onKeyDown);
    }
      
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  });

  return isPressed;
}
