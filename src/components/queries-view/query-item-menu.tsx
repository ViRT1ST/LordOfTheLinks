'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import type { DropdownItem, DbPinnedQuery } from '@/types';
import { getModalContainerElement } from '@/utils/dom';
import Dropdown from '@/components/[design-system]/dropdown';
import ModalWindow from '@/components/[common-ui]/modal-window';
import QueryFormEdit from '@/components/queries-view/query-form-edit';
import QueryFormDelete from '@/components/queries-view/query-form-delete';

type QueryItemMenuProps = {
  isContextMenuOpen: boolean;
  setIsContextMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  query: DbPinnedQuery;
};

export default function QueryItemMenu({
  isContextMenuOpen,
  setIsContextMenuOpen,
  query
}: QueryItemMenuProps) {
  const [ isUpdateModalOpen, setIsUpdateModalOpen ] = useState(false);
  const [ isDeleteModalOpen, setIsDeleteModalOpen ] = useState(false);

  const items: Array<DropdownItem> = [
    { label: 'EDIT', invokeOnClick: () => setIsUpdateModalOpen(true) },
    { label: 'DELETE', invokeOnClick: () => setIsDeleteModalOpen(true) }
  ];

  return (
    <>
      <Dropdown
        isOpen={isContextMenuOpen}
        setIsOpen={setIsContextMenuOpen}
        items={items}
        classNames="w-[110px] -mt-[8px] ml-[18px]"
      />

      {isUpdateModalOpen && (
        createPortal(
          <ModalWindow
            isOpen={isUpdateModalOpen}
            setIsOpen={setIsUpdateModalOpen}
            content={
              <QueryFormEdit
                query={query}
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
              <QueryFormDelete
                query={query}
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

