import { useEffect, RefObject } from 'react';

export default function useTrapFocus(ref: RefObject<HTMLElement>, focusOnFirst: boolean) {
  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const selectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const focusableElements = Array.from(element.querySelectorAll(selectors));
    const firstFocusable = focusableElements[0] as HTMLElement;
    const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;

    if (firstFocusable && focusOnFirst) {
      firstFocusable.focus();
    } else {
      lastFocusable.focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        // Shift + Tab: Move focus to last element if at first
        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            lastFocusable.focus();
            e.preventDefault();
          }

        // Tab: Move focus to first element if at last
        } else {
          if (document.activeElement === lastFocusable) {
            firstFocusable.focus();
            e.preventDefault();
          }
        }
      }
    };

    element.addEventListener('keydown', handleKeyDown);

    return () => {
      element.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
}
