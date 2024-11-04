'use client';

import { Ellipsis } from 'lucide-react';
import { useState } from 'react';

import { type DbLinkWithTags } from '@/types/index';
import { cn } from '@/utils/classes';
import ModalWindow from '@/components/common/modal-window';
import EditLinkForm from '@/components/forms/edit-link-form';
import DeleteLinkForm from '@/components/forms/delete-link-form';

type LinkItemProps = {
  link: DbLinkWithTags;
};

export default function LinkItem({ link }: LinkItemProps) {
  const [ isLinkMenuOpen, setIsLinkMenuOpen ] = useState(false);
  const [ isEditModalOpen, setIsEditModalOpen ] = useState(false);
  const [ isDeleteModalOpen, setIsDeleteModalOpen ] = useState(false);

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
    <div className={linkContainer}>
      <h2 className={linkTitle}>{link.title}</h2>
      <p className={linkUrl}>{link.url}</p>

      <button className={twLinkButton} onClick={toggleMenuButton}>
        <Ellipsis className={twLinkButtonIcon} />
      </button>

      {isLinkMenuOpen && (
        <div className={twLinkMenu} >
          <button className={twButton} onClick={handleEditButtonClick}>
            Edit
          </button>
          <button className={twButton} onClick={handleDeleteButtonClick}>
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

const linkContainer = cn(
  'relative p-3 mb-4 flex flex-col',
  'bg-white/50 border rounded-sm border-black/20',
);

const linkTitle = cn(
  'text-lg text-black'
);

const linkUrl = cn(
  'text-sm text-black/50'
);

const twLinkButton = cn(
  'absolute top-2 right-2',
);

const twLinkButtonIcon = cn(
  'opacity-30 mr-2 h-6 w-6',
);

const twLinkMenu = cn(
  'z-10 absolute -top-[2px] right-12 px-2 py-2',
  'flex flex-col gap-1',
  'bg-transparent opacity-100 rounded-sm border-0 border-black/20'
);

const twButton = cn(
  'w-20 h-7 py-2 px-4 inline-flex justify-center items-center gap-2',
  'bg-transparent border border-black/10 text-black/60 rounded-sm',
  'text-sm font-medium whitespace-nowrap'
);


