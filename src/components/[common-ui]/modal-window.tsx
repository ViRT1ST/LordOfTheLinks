'use client';

import { X } from 'lucide-react';
import { useState, useEffect } from 'react';

import { cn, cnJoin } from '@/utils/classes';
import { useStore } from '@/store/useStore';
import useKeyDown from '@/hooks/useKeyDown';
import useClickOnElement from '@/hooks/useClickOnElement';

type ModalWindowProps = {
  content: React.ReactNode;
  isOverlayClickDoClose?: boolean;
  isOverlayDarkened?: boolean;
  isCloseButtonVisible?: boolean;
  positionStyles?: React.CSSProperties | null;
};

export default function ModalWindow({
  content,
  isOverlayClickDoClose = true,
  isOverlayDarkened = true,
  isCloseButtonVisible = true,
  positionStyles = null,
}: ModalWindowProps) {
  const [ isOpen, setIsOpen ] = useState(true);

  const resetModalWindowStates = useStore((state) => state.resetModalWindowStates);

  const isEscPressed = useKeyDown('Escape');
  const isOverlayClicked = useClickOnElement('modal-window');

  const contentClassNames = positionStyles ? 'absolute' : 'relative';
  const contentStyles = positionStyles ? positionStyles : {};

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
    <div id="modal-window" className={cn(twModalOverlay, isOverlayDarkened && 'bg-black/80')}>
      <div className={contentClassNames} style={contentStyles}>
        {isCloseButtonVisible && (
          <button className={twCloseButton} onClick={() => setIsOpen(false)}>
            <X />
          </button>
        )}
        {content}
      </div>
    </div>
  ) : (
    null
  ));
}

const twModalOverlay = cnJoin(
  'z-50 relative w-screen h-screen fixed',
  'flex flex-col justify-center items-center'
);

const twCloseButton = cnJoin(
  'absolute top-4 right-4 h-8 w-8 p-1',
  'text-neutral-600 border-0 rounded-sm',
  'cursor-pointer transition-all duration-75',
  'ring-offset-0 ring-offset-transparent',
  'hover:ring-1 hover:ring-neutral-500 hover:text-black/80',
);