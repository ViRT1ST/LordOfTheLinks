'use client';

import { Ellipsis } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { type DbLinkWithTags } from '@/types/index';
import { cnJoin } from '@/utils/classes';
import ModalWindow from '@/components/common/modal-window';
import EditLinkForm from '@/components/forms/edit-link-form';
import DeleteLinkForm from '@/components/forms/delete-link-form';

type LinkItemMenuProps = {
  link: DbLinkWithTags;
};

export default function LinkItemMenu({ link }: LinkItemMenuProps) {
  const [ isLinkMenuOpen, setIsLinkMenuOpen ] = useState(false);
  const [ isEditModalOpen, setIsEditModalOpen ] = useState(false);
  const [ isDeleteModalOpen, setIsDeleteModalOpen ] = useState(false);
 
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseLeave = () => {
      setIsLinkMenuOpen(false);
    };

    const element = containerRef.current;

    if (element) {
      element.addEventListener('mouseleave', handleMouseLeave);
    }
    
    return () => {
      if (element) {
        element.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  const toggleMenuButton = () => {
    setIsLinkMenuOpen((prev) => !prev);
  };

  const handleEditButtonClick = () => {
    setIsEditModalOpen(true);
    toggleMenuButton();
  };

  const handleDeleteButtonClick = () => {
    setIsDeleteModalOpen(true);
    toggleMenuButton();
  };

  return (
    <div ref={containerRef} className={twContainer}>
      <button className={twMenuTrigger} onClick={toggleMenuButton}>
        <Ellipsis className={twMenuTriggerIcon} />
      </button>

      {isLinkMenuOpen && (
        <div className={twMenuContainer} >
          <button className={twMenuButton} onClick={handleEditButtonClick}>
            Edit
          </button>
          <button className={twMenuButton} onClick={handleDeleteButtonClick}>
            Delete
          </button>
        </div>
      )}

      <ModalWindow
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
        content={<EditLinkForm link={link} />}
      />

      <ModalWindow
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        content={<DeleteLinkForm link={link} />}
      />
    </div>
  );
}

const twContainer = cnJoin(
  'relative w-40 h-full flex flex-row justify-end items-start',
);

const twMenuTrigger = cnJoin(
  'px-3 py-2 opacity-30 transition-all',
  'hover:opacity-60',
);
const twMenuTriggerIcon = cnJoin(
  'h-6 w-6',
);

const twMenuContainer = cnJoin(
  'absolute top-1.5 right-12 flex flex-col gap-1',
  'rounded-sm border-0'
);

const twMenuButton = cnJoin(
  'w-20 h-7 py-2 px-4 inline-flex justify-center items-center gap-2',
  'bg-transparent border border-black/10 text-black/60 rounded-sm',
  'text-sm font-medium whitespace-nowrap transition-all',
  'hover:text-black hover:border-black/15',
);

