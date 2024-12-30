'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Plus } from 'lucide-react';

import { getModalContainerElement } from '@/utils/dom';
import { cnJoin } from '@/utils/formatting';
import Button from '@/components/[design-system]/button';
import ModalWindow from '@/components/[design-system]/modal-window';
import QueryFormCreate from './query-form-create';

export default function QueryButtonCreate() {
  const [ isCreateModalOpen, setIsCreateModalOpen ] = useState(false);

  return (
    <>
      <Button className={twButtonCreate} element="button" onClick={() => setIsCreateModalOpen(true)}>
        <Plus size={24} />
      </Button>

      {isCreateModalOpen && (
        createPortal(
          <ModalWindow
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

const twButtonCreate = cnJoin(`
  right-[40px] top-[100px] h-12 w-12 px-1 py-1
  flex justify-center items-center
  bg-[#e4e4e4] text-black/70 rounded-full duration-150
  hover:bg-[#ececec]
  static lg:absolute
`);