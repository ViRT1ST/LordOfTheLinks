'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Plus } from 'lucide-react';

import { getModalContainerElement } from '@/utils/others';
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

const twButtonCreate = cnJoin(
  /* common */
  'absolute right-[40px] top-[100px]',
  'h-12 w-12 px-2 py-2',
  'rounded-full duration-150 bg-[#e4e4e4]',
  /* states */
  'hover:bg-[#ededed]'
);

