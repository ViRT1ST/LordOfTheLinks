'use client';

import { useState } from 'react';
import ModalWindow from '@/components/common/modal-window';
import CreatePinnedQueryForm from '../forms/create-pq-form';
import { cnJoin } from '@/utils/classes';

export default function PinnedQueriesCreateButton() {
  const [ isNewModalOpen, setIsNewModalOpen ] = useState(false);

  return (
    <>
      <button className={twButton} onClick={() => setIsNewModalOpen(true)}>
        Add Query
      </button>

      <ModalWindow
        isOpen={isNewModalOpen}
        setIsOpen={setIsNewModalOpen}
        content={<CreatePinnedQueryForm />}
      />
    </>
  );
}



// const twButton = cnJoin(
//   'h-8 py-2 px-4 inline-flex justify-center items-center gap-2',
//   'bg-transparent border border-black/10 text-black/60 rounded-md',
//   'text-sm font-medium whitespace-nowrap transition-all',
//   'hover:text-black hover:border-black/15', 
// );

const twButton = cnJoin(
  'h-8 inline-flex rounded-md border border-black/10  px-4 py-4',
  'justify-center items-center',
  'text-sm  font-medium text-black/60',
  // 'text-base font-roboto'

    // bg-based on flowers backround
  'bg-[#e9e9e9]'
);
