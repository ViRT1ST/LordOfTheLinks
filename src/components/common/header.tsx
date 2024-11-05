'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { cnJoin } from '@/utils/classes';
import ModalWindow from '@/components/common/modal-window';
import CreateLinkForm from '@/components/forms/create-link-form';

export default function Header() {
  const router = useRouter();

  const [ isNewLinkModalOpen, setIsNewLinkModalOpen ] = useState(false);

  const handleShowAllLinks = () => {
    router.push('/?show=all');
  };

  return (
    <div className={headerContainer}>

      <div className={twContainerLeft}>
        <button className={twButton} onClick={handleShowAllLinks}>
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

const headerContainer = cnJoin(
  'h-12 w-full px-5 flex justify-between',
  'bg-black/10'
);

const twContainerLeft = cnJoin(
  'h-full flex items-center gap-x-4'
);

const twContainerRight = cnJoin(
  'h-full flex items-center'
);

const twButton = cnJoin(
  'h-7 py-2 px-4 inline-flex justify-center items-center gap-2',
  'bg-transparent border border-black/10 text-black/60 rounded-md',
  'text-sm font-medium whitespace-nowrap'
);
