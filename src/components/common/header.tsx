'use client';

import { useState } from 'react';

import LinkCreateForm from '../forms/link-create-form';
import ModalWindow from '@/components/common/modal-window';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/chadcn/utils';

export default function Header() {
  const [ isModalOpen, setIsModalOpen ] = useState(false);

  return (
    <div className={headerContainer} >

      <div className={twContainerLeft}>
        <Button className={twButton}>
          Show All Links
        </Button>
        <Button className={twButton}>
          Show All Tags
        </Button>
      </div>

      <div className={twContainerRight}>
        <Button className={twButton} onClick={() => setIsModalOpen(true)}>
          Add New Link
        </Button>
      </div>

      <ModalWindow show={isModalOpen}>
        <LinkCreateForm />
      </ModalWindow>
      
    </div>
  );
}

const headerContainer = cn(
  'h-12 w-full px-5 flex justify-between',
  'bg-black/10'
);

const twContainerLeft = cn(
  'h-full flex items-center gap-x-4'
);

const twContainerRight = cn(
  'h-full flex items-center'
);

const twButton = cn(
  'h-7 bg-transparent border border-black/10 text-black/60'
);
