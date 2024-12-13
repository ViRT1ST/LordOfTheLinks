import { useEffect } from 'react';

export default function useOutsideClick(
  ref: React.RefObject<HTMLElement>,
  state: boolean,
  stateSetter: (value: boolean) => void
) {
  useEffect(() => {    
    const onOutsideClick = (e: MouseEvent) => {
      const refElement = ref.current;

      if (refElement && !refElement.contains(e.target as Node)) {
        stateSetter(false);
      }
    };

    if (state) {
      document.addEventListener('click', onOutsideClick);  
    } else {
      document.removeEventListener('click', onOutsideClick);
    }
  }, [state]);
};