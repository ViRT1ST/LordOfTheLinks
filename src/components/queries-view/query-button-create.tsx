'use client';

import { Plus } from 'lucide-react';
import { useState } from 'react';

import { cnJoin } from '@/utils/formatting';
import { useStore } from '@/store/useStore';

import { createPortal } from 'react-dom';

import ModalWindow from '@/components/[common-ui]/modal-window-new';
import QueryFormCreate from './query-form-create';

export default function QueryButtonCreate() {
  const [ isModalOpen, setIsModalOpen ] = useState(false);

  const setCurrentModalWindow = useStore((state) => state.setCurrentModalWindow);

  // const handleClick = () => {
  //   const modalContainer = document.getElementById('modal-container');
  //   if (modalContainer) {

  //   }
  //   setCurrentModalWindow('query-create');

  // };

  //() => setCurrentModalWindow('query-create')
  return (
    <>
      <button className={twButton} onClick={() => setIsModalOpen(true)}>
        <Plus />
      </button>

      {isModalOpen && (
        createPortal(
          <ModalWindow
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
            content={<QueryFormCreate />}
            isOverlayClickDoClose={false}
            focusOnFirstElement={true}
  
          />,
          document.getElementById('modal-container') as HTMLElement
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

