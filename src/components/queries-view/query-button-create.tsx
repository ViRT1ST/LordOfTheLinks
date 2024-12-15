'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Plus } from 'lucide-react';

import { cnJoin } from '@/utils/formatting';
import { getModalContainerElement } from '@/utils/dom';
import ModalWindow from '@/components/[common-ui]/modal-window';
import QueryFormCreate from './query-form-create';

export default function QueryButtonCreate() {
  const [ isCreateModalOpen, setIsCreateModalOpen ] = useState(false);

  return (
    <>
      <button className={twButton} onClick={() => setIsCreateModalOpen(true)}>
        <Plus />
      </button>

      {isCreateModalOpen && (
        createPortal(
          <ModalWindow
            isOpen={isCreateModalOpen}
            setIsOpen={setIsCreateModalOpen}
            content={<QueryFormCreate setIsOpen={setIsCreateModalOpen} />}
            isOverlayClickDoClose={false}
            focusOnFirstElement={true}
          />,
          getModalContainerElement()
        )
      )}
    </>

  );
}

const twButton = cnJoin(
  'absolute right-[42px] top-[100px]',

  'text-black rounded-full trasnsition-all duration-150 ',
  'h-12 w-12 flex items-center justify-center',

  'bg-[#e4e4e4] text-neutral-600 border border-black/10',
  'hover:bg-[#f4f4f4] hover:text-neutral-800 hover:border-black/20',
);

