'use client';

import { X } from 'lucide-react';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';

import { cn, cnJoin } from '@/utils/classes';
import useKeyDown from '@/hooks/useKeyDown';
import useClickOnElementId from '@/hooks/useClickOnElementId';

type ModalWindowProps = {
  content: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isOverlayClickDoClose?: boolean;
  isOverlayDarkened?: boolean;
  isCloseButtonVisible?: boolean;
  top?: number | null;
  left?: number | null;
  right?: number | null;
  bottom?: number | null;
};

const modalOverlayElementId = 'modal-overlay';
const modalContainerElementId = 'modal-container';

export default function ModalWindow({
  isOpen,
  setIsOpen,
  content,
  isOverlayClickDoClose = true,
  isOverlayDarkened = true,
  isCloseButtonVisible = true,
  top = null,
  left = null,
  right = null,
  bottom = null,
}: ModalWindowProps) {
  const isEscPressed = useKeyDown('Escape');
  const isOverlayClicked = useClickOnElementId(modalOverlayElementId);
  const customCoords = top || left || right || bottom;

  console.log(top, left, right, bottom);

  useEffect(() => {
    if (isEscPressed) {
      setIsOpen(false);
    }

    if (isOverlayClickDoClose && isOverlayClicked) {
      setIsOpen(false);
    }
  }, [isEscPressed, isOverlayClicked]);

  if (!isOpen) {
    return null;
  }

  return (
    ReactDOM.createPortal(
      (<div
        id={modalOverlayElementId}
        className={cn(twModalOverlay, isOverlayDarkened && 'bg-black/80')}
      >
        <div
          className={customCoords ? 'absolute' : 'relative'}
          style={{
            top: `${top}px`,
            left: `${left}px`,
            right: `${right}px`,
            bottom: `${bottom}px`,
          }}
        >
          {isCloseButtonVisible && (
            <button className={twCloseButton} onClick={() => setIsOpen(false)}>
              <X />
            </button>
          )}
          {content}
        </div>
      </div>),
      document.getElementById(modalContainerElementId) as HTMLElement
    )
  );
}

const twModalOverlay = cnJoin(
  'z-50 relative w-screen h-screen fixed',
  'flex flex-col justify-center items-center'
);

// const twContentAndCloseButton = cnJoin(
//   'absolute w-screen h-screen flex flex-col justify-center items-center',
// );

const twCloseButton = cnJoin(
  'absolute top-4 right-4 h-8 w-8 p-1',
  'text-neutral-600 border-0 rounded-sm',
  'cursor-pointer transition-all duration-75',
  'ring-offset-1 ring-offset-transparent',
  'hover:ring-1 hover:ring-neutral-400 hover:text-black/80',
);