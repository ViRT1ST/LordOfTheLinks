import { useState, useEffect } from 'react';

export default function useSubmitEvent() {
  const [ isEventDisaptched, setIsEventDisaptched ] = useState(false);

  useEffect(() => {
    const onSubmit = () => {
      setIsEventDisaptched(true);
    };

    document.body.addEventListener('submit', onSubmit);
      
    return () => {
      document.body.removeEventListener('submit', onSubmit);
      setIsEventDisaptched(false);
    };
  });

  return isEventDisaptched;
}
