'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { cnJoin } from '@/utils/classes';
import ModalWindow from '@/components/common/modal-window';
import CreateLinkForm from '@/components/forms/create-link-form';
import SearchForm from '@/components/forms/search-form';

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
          All Links
        </button>
        <button className={twButton}>
          Show Pinned Queries
        </button>
      </div>

      <div className={twContainerMiddle}>
        <SearchForm />
      </div>

      <div className={twContainerRight}>
        <button className={twButton} onClick={() => setIsNewLinkModalOpen(true)}>
          Add New Link
        </button>
        <button className={twButton} onClick={() => setIsNewLinkModalOpen(true)}>
          Settings
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
  'z-10 fixed top-0 left-0 h-14 py-1 w-full flex',
  'bg-[#cfcecd]',
);

const twContainerLeft = cnJoin(
  'px-5 flex items-center gap-x-4'
);

const twContainerMiddle = cnJoin(
  'flex items-center justify-center flex-grow',
  '2xl:pr-12'
);

const twContainerRight = cnJoin(
  'px-5 flex items-center gap-x-4'
);

const twButton = cnJoin(
  'h-8 py-2 px-4 inline-flex justify-center items-center gap-2',
  'bg-transparent border border-black/10 text-black/60 rounded-md',
  'text-sm font-medium whitespace-nowrap'
);
