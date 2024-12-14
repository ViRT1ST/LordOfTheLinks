'use client';

import { X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

import { cn, cnJoin } from '@/utils/formatting';
import { useStore } from '@/store/useStore';
import useKeyDown from '@/hooks/useKeyDown';
import useClickOnElement from '@/hooks/useClickOnElement';
import useTrapFocus from '@/hooks/useTrapFocus';

type ModalWindowProps = {
  content: React.ReactNode;
  isOverlayClickDoClose?: boolean;
  isCloseButtonVisible?: boolean;
  focusOnFirstElement?: boolean;
};

export default function ModalWindow({
  content,
  isOverlayClickDoClose = true,
  isCloseButtonVisible = true,
  focusOnFirstElement = false,
}: ModalWindowProps) {
  const [ isOpen, setIsOpen ] = useState(true);
  const modalRef = useRef<HTMLDialogElement>(null);

  const resetModalWindowStates = useStore((state) => state.resetModalWindowStates);

  const isEscPressed = useKeyDown('Escape');
  const isOverlayClicked = useClickOnElement(modalRef);
  useTrapFocus(modalRef, focusOnFirstElement);

  useEffect(() => {
    if (!isOpen) {
      resetModalWindowStates();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isEscPressed || (isOverlayClickDoClose && isOverlayClicked)) {
      setIsOpen(false);
    }
  }, [isEscPressed, isOverlayClickDoClose, isOverlayClicked]);

  return (isOpen ? (
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
  ) : (
    null
  ));
}

const twModalOverlay = cnJoin(
  'z-50 relative w-screen h-screen fixed',
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