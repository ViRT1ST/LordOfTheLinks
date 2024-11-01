'use client';

import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

type ModalProps = {
  show: boolean;
  children: React.ReactNode;
};

export default function Modal({ show, children }: ModalProps) {
  const [ isOpen, setIsOpen ] = useState(false);

  useEffect(() => {
    setIsOpen(show);
  }, [show]);
  
  
  if (!isOpen) {
    return null;
  }

  const modal = (
    <div className="bg-black/50 w-full h-svh flex flex-col justify-center items-center" >
      {children}
    </div>
  );

  const modalContainer = document.querySelector('#modal-container') as HTMLElement;
  return ReactDOM.createPortal(modal, modalContainer);
}
