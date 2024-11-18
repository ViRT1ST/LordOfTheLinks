'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { cnJoin } from '@/utils/classes';
import ModalWindow from '@/components/common/modal-window';
import CreateLinkForm from '@/components/forms/create-link-form';
import SearchForm from '@/components/forms/search-form';

export default function Header() {
  const [ isNewLinkModalOpen, setIsNewLinkModalOpen ] = useState(false);

  return (
    <header className={twHeader}>
      {/* <div className={twHeaderLimiter}> */}

        <div className={twContainerLeft}>
          <Link className={twButton} href="/?show=all">
            All Links
          </Link>
          <Link className={twButton} href="/?show=pq">
            Pinned Queries
          </Link>
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

      {/* </div> */}
    </header>
  );
}

const twHeader = cnJoin(
  'z-10 fixed top-0 left-0 px-5 h-14 w-full flex justify-center',
  // 'bg-[#cfcecd]',
  'bg-[#dad7d7]',
);

// const twHeaderLimiter = cnJoin(
//   'w-[1400px] px-5 flex flex-row', // w-[1200px] w-full
  
// );

const twContainerLeft = cnJoin(
  'flex items-center gap-x-4' //px-5 
);

const twContainerMiddle = cnJoin(
  'flex items-center justify-center flex-grow',
  // '2xl:pr-12'
);

const twContainerRight = cnJoin(
  'flex items-center gap-x-4' //px-5 
);

const twButton = cnJoin(
  'h-8 py-2 px-4 inline-flex justify-center items-center gap-2',
  'bg-transparent border border-black/10 text-black/60 rounded-md',
  'text-sm font-medium whitespace-nowrap transition-all',
  'hover:text-black hover:border-black/15', 
);
