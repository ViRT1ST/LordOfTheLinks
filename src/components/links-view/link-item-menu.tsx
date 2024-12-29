'use client';

import { useState } from 'react';
import { Ellipsis } from 'lucide-react';
import { createPortal } from 'react-dom';

import type { DropdownItem, DbLinkWithTags } from '@/types/index';
import { getModalContainerElement } from '@/utils/dom';
import { cnJoin } from '@/utils/formatting';
import Dropdown from '@/components/[design-system]/dropdown';
import ModalWindow from '@/components/[design-system]/modal-window';
import LinkFormUpdate from '@/components/links-view/link-form-update';
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
      <button className={twMenuTrigger} onClick={() => setIsDropdownOpen((prev) => !prev)}>
        <Ellipsis className={twMenuTriggerIcon} />
      </button>

      {isDropdownOpen && (
        <Dropdown
          setIsOpen={setIsDropdownOpen}
          items={items}
          classNames="w-[110px] -mt-[8px] ml-[-80px]"
        />
      )}

      {isUpdateModalOpen && (
        createPortal(
          <ModalWindow
            setIsOpen={setIsUpdateModalOpen}
            content={
              <LinkFormUpdate
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
