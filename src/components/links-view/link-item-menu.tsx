'use client';

import { useState } from 'react';
import { Ellipsis } from 'lucide-react';
import { createPortal } from 'react-dom';

import type { DropdownItem, DbLinkWithTags } from '@/types/index';
import { getModalContainerElement } from '@/utils/dom';
import { cnJoin } from '@/utils/formatting';
import Dropdown from '@/components/[design-system]/dropdown';
import ModalWindow from '@/components/[design-system]/modal-window';
import LinkFormEdit from '@/components/links-view/link-form-edit';
import LinkFormDelete from '@/components/links-view/link-form-delete';

type LinkItemMenuProps = {
  link: DbLinkWithTags;
};

export default function LinkItemMenu({ link }: LinkItemMenuProps) {
  const [ isDropdownOpen, setIsDropdownOpen ] = useState(false);
  const [ isUpdateModalOpen, setIsUpdateModalOpen ] = useState(false);
  const [ isDeleteModalOpen, setIsDeleteModalOpen ] = useState(false);

  const items: Array<DropdownItem> = [
    { label: 'EDIT', invokeOnClick: () => setIsUpdateModalOpen(true) },
    { label: 'DELETE', invokeOnClick: () => setIsDeleteModalOpen(true) }
  ];

  return (
    <>
      <Dropdown
        isOpen={isDropdownOpen}
        setIsOpen={setIsDropdownOpen}
        items={items}
        classNames="w-[110px] mt-[30px] ml-[-40px]"
        trigger={(
          <button className={twMenuTrigger}>
            <Ellipsis className={twMenuTriggerIcon} />
          </button>
        )}
      />
    
      {isUpdateModalOpen && (
        createPortal(
          <ModalWindow
            isOpen={isUpdateModalOpen}
            setIsOpen={setIsUpdateModalOpen}
            content={
              <LinkFormEdit
                link={link}
                setIsOpen={setIsUpdateModalOpen}
              />
            }
            isOverlayClickDoClose={false}
            focusOnFirstElement={false}
            
          />,
          getModalContainerElement()
        )
      )}

      {isDeleteModalOpen && (
        createPortal(
          <ModalWindow
            isOpen={isDeleteModalOpen}
            setIsOpen={setIsDeleteModalOpen}
            content={
              <LinkFormDelete
                link={link}
                setIsOpen={setIsDeleteModalOpen}
              />
            }
            isOverlayClickDoClose={true}
            focusOnFirstElement={false}
          />,
          getModalContainerElement()
        )
      )}
    </>
  );
}

const twMenuTrigger = cnJoin(
  'px-3 py-2 opacity-30 transition-all',
  'hover:opacity-60',
);
const twMenuTriggerIcon = cnJoin(
  'h-6 w-6',
);
