'use client';

import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

type ModalProps = {
  show: boolean;
  children: React.ReactNode;
};

export default function ModalWindow({ show, children }: ModalProps) {
  const [ isOpen, setIsOpen ] = useState(false);

  useEffect(() => {
    setIsOpen(show);
  }, [show]);
  
  if (!isOpen) {
    return null;
  }

  const modal = (
    <div className="w-full h-svh flex flex-col justify-center items-center bg-black/50" >
      {children}
    </div>
  );

  const modalContainer = document.querySelector('#modal-container') as HTMLElement;
  return ReactDOM.createPortal(modal, modalContainer);
}
