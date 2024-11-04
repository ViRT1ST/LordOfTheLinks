'use client';

import { useState } from 'react';

import { cn } from '@/utils/classes';
import ModalWindow from '@/components/common/modal-window';
import CreateLinkForm from '@/components/forms/create-link-form';

export default function Header() {
  const [ isNewLinkModalOpen, setIsNewLinkModalOpen ] = useState(false);

  return (
    <div className={headerContainer}>

      <div className={twContainerLeft}>
        <button className={twButton}>
          Show All Links
        </button>
        <button className={twButton}>
          Show All Tags
        </button>
      </div>

      <div className={twContainerRight}>
        <button className={twButton} onClick={() => setIsNewLinkModalOpen(true)}>
          Add New Link
        </button>
      </div>

      <ModalWindow
        isOpen={isNewLinkModalOpen}
        setIsOpen={setIsNewLinkModalOpen}
        content={<CreateLinkForm />}
      />
    </div>
  );
}

const headerContainer = cn(
  'h-12 w-full px-5 flex justify-between',
  'bg-black/10'
);

const twContainerLeft = cn(
  'h-full flex items-center gap-x-4'
);

const twContainerRight = cn(
  'h-full flex items-center'
);

const twButton = cn(
  'h-7 py-2 px-4 inline-flex justify-center items-center gap-2',
  'bg-transparent border border-black/10 text-black/60 rounded-md',
  'text-sm font-medium whitespace-nowrap'
);
