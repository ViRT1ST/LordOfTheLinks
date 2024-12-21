'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';

import type { DropdownItem, DbPinnedQuery } from '@/types';
import { getModalContainerElement } from '@/utils/others';
import Dropdown from '@/components/[design-system]/dropdown';
import ModalWindow from '@/components/[design-system]/modal-window';
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
      {isContextMenuOpen && (
        <Dropdown
          setIsOpen={setIsContextMenuOpen}
          items={items}
          classNames="w-[110px] -mt-[6px] ml-[18px]"
        />
      )}

      {isUpdateModalOpen && (
        createPortal(
          <ModalWindow
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

