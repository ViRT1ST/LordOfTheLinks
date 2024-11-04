'use client';

import { X } from 'lucide-react';
import { useEffect} from 'react';
import ReactDOM from 'react-dom';

import { cn } from '@/utils/classes';

type ModalWindowProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  content: React.ReactNode;
};

export default function ModalWindow({ content, isOpen, setIsOpen }: ModalWindowProps) {
  useEffect(() => {
    const closeOnEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    const closeOnBubblingSubmit = (e: SubmitEvent) => {
      e.stopPropagation();
      setIsOpen(false);
    };

    const closeOnOverlayClick = (e: MouseEvent) => {
      if (isOpen) {
        if (e.target instanceof HTMLElement && e.target.id === 'modal-overlay') {
          setIsOpen(false);
        }
      }
    };

    function onShowModal() {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollBarWidth}px`;
      document.body.addEventListener('keydown', closeOnEscKey);
      document.body.addEventListener('click', closeOnOverlayClick);
      document.body.addEventListener('submit', closeOnBubblingSubmit);
    }

    function onCloseModal() {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      document.body.removeEventListener('keydown', closeOnEscKey);
      document.body.removeEventListener('click', closeOnOverlayClick);
      document.body.removeEventListener('submit', closeOnBubblingSubmit);
    }

    if (isOpen) {
      onShowModal();
    } 

    return () => {
      onCloseModal();
    };
  }, [isOpen]);
  
  if (!isOpen) {
    return null;
  }

  return (
    ReactDOM.createPortal(
      <div id="modal-overlay" className={twModalOverlay}>
        <div className="relative">
          <X className={twCloseButton} onClick={(e) => {
            e.stopPropagation();
            setIsOpen(false);
          }} />
          {content}
        </div>
      </div>,
      document.querySelector('#modal-container') as HTMLElement
    )
  );
}

const twModalOverlay = cn(
  'z-50 w-full h-svh flex flex-col justify-center items-center bg-black/80'
);

const twCloseButton = cn(
  'absolute top-4 right-4 h-6 w-6',
  'text-neutral-600 border-2 border-transparent rounded-sm',
  'ring-offset-1 ring-offset-transparent',
  'hover:ring-1 hover:ring-neutral-400',
);