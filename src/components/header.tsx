'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/chadcn/utils';
import ModalServeContainer from '@/components/modal-server-container';

import { useState } from 'react';

export default function Header() {
  const [ isModalOpen, setIsModalOpen ] = useState(false);

  const btnStyles = cn(
    'h-7 border border-black/10 text-black/60 bg-transparent'
  );

  const handleShowModal = () => {    
    setIsModalOpen((prev) => !prev);
  };

  return (
  <>
    <div className="w-full bg-black/10 h-12 flex justify-between px-5" >

      <div className="h-full flex items-center gap-x-4" >
        <Button className={btnStyles}>
          Show All Links
        </Button>
        <Button className={btnStyles}>
          Show All Tags
        </Button>
      </div>

      <div className="h-full flex items-center" >
        <Button className={btnStyles} onClick={handleShowModal}>
          Add New Link
        </Button>
      </div>

    </div>

    <ModalServeContainer isModalOpen={isModalOpen} />
  </>
  );
}
