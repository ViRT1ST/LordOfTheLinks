'use client';

import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

import { cnJoin } from '@/utils/formatting';
import useKeyDown from '@/hooks/useKeyDown';
import useClickOnElement from '@/hooks/useClickOnElement';
import useTrapFocus from '@/hooks/useTrapFocus';

type ModalWindowProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  content: JSX.Element;
  isOverlayClickDoClose?: boolean;
  isCloseButtonVisible?: boolean;
  focusOnFirstElement?: boolean;
};

export default function ModalWindow({
  setIsOpen,
  content,
  isOverlayClickDoClose = true,
  isCloseButtonVisible = true,
  focusOnFirstElement = false,
}: ModalWindowProps) {
  const modalRef = useRef<HTMLDialogElement>(null);

  const isEscPressed = useKeyDown('Escape');
  const isOverlayClicked = useClickOnElement(modalRef);
  useTrapFocus(modalRef, focusOnFirstElement);

  useEffect(() => {
    if (isEscPressed || (isOverlayClickDoClose && isOverlayClicked)) {
      setIsOpen(false);
    }
  }, [isEscPressed, isOverlayClickDoClose, isOverlayClicked]);

  return (
    <dialog
      ref={modalRef}
      id="modal-window"
      role="dialog"
      aria-modal="true"
      className={twModalOverlay}>
      <div className="relative">
        {content}
        {isCloseButtonVisible && (
          <button className={twCloseButton} onClick={() => setIsOpen(false)}>
            <X />
          </button>
        )}
      </div>
    </dialog>
  );
}

const twModalOverlay = cnJoin(
  'z-50 w-screen h-screen fixed pb-8',
  'flex flex-col justify-center items-center',
  'bg-black/80'
);

const twCloseButton = cnJoin(
  'absolute top-4 right-4 h-8 w-8 p-1',
  'text-neutral-600 border-0 rounded-sm',
  'cursor-pointer transition-all duration-75',
  'ring-offset-0 ring-offset-transparent',
  'hover:ring-1 hover:ring-neutral-500 hover:text-black/80',
);