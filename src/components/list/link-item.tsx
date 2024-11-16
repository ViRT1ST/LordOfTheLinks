'use client';

import { Ellipsis } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { type DbLinkWithTags } from '@/types/index';
import { cnJoin } from '@/utils/classes';
import { getDomain } from '@/utils/parsing';
import { FAVICON_SIZE_TO_DISPLAY } from '@/config/public';
import ModalWindow from '@/components/common/modal-window';
import EditLinkForm from '@/components/forms/edit-link-form';
import DeleteLinkForm from '@/components/forms/delete-link-form';

type LinkItemProps = {
  link: DbLinkWithTags;
};

const faviconSize = FAVICON_SIZE_TO_DISPLAY / 2;

export default function LinkItem({ link }: LinkItemProps) {
  const [ isLinkMenuOpen, setIsLinkMenuOpen ] = useState(false);
  const [ isEditModalOpen, setIsEditModalOpen ] = useState(false);
  const [ isDeleteModalOpen, setIsDeleteModalOpen ] = useState(false);

  const linkMenuAreaRef = useRef<HTMLDivElement>(null);

  const linkHint = link.info || '';
  const linkDomain = getDomain(link.url);
  const linkImageSrc = `/images/site-icons/${linkDomain}.png`;

  useEffect(() => {
    const handleMouseLeave = () => {
      setIsLinkMenuOpen(false);
    };

    const element = linkMenuAreaRef.current;

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
    <div className={twLinkItemContainer}>
      <div className={twLinkItemLeftPart}>
        <Link className={twNextLinkContainer} href={link.url}  title={linkHint} target="_blank">
          <div className={twFaviconConatiner}>
            <Image
              src={linkImageSrc}
              alt="Favicon"
              width={faviconSize}
              height={faviconSize}
              priority={true}
            />
          </div>
          <div className={'pl-2.5'}>
            <h2 className={twLinkTitle}>{link.title}</h2>
            <p className={twLinkUrl}>{linkDomain}</p>
          </div>

        </Link>
      </div>

      <div ref={linkMenuAreaRef} className={twLinkItemRightPart}>
        <button className={twLinkMenuButton} onClick={toggleMenuButton}>
          <Ellipsis className={twLinkMenuButtonIcon} />
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
    </div>
  );
}

const twLinkItemContainer = cnJoin(
  'mb-[4px] flex flex-row',
  'bg-white/50 border rounded-sm border-black/20',
  'font-geistsans'
);

const twLinkItemLeftPart = cnJoin(
  'p-3 flex flex-col flex-grow'
);

const twNextLinkContainer = cnJoin(
  'flex flex-row items-center'
);

const twFaviconConatiner = cnJoin(
  `w-[${faviconSize}px] h-[${faviconSize}x]`,
  'flex rounded-sm overflow-hidden'
);

const twLinkTitle = cnJoin(
  'text-lg text-black'
);

const twLinkUrl = cnJoin(
  'text-sm text-black/50'
);

const twLinkItemRightPart = cnJoin(
  'relative w-40 px-1 flex flex-col items-end',
);

const twLinkMenuButton = cnJoin(
  'px-2 py-2',
);
const twLinkMenuButtonIcon = cnJoin(
  'opacity-30 h-6 w-6',
);

const twLinkMenu = cnJoin(
  'z-10 absolute top-[6px] right-12 px-2',
  'flex flex-col gap-1',
  'bg-transparent opacity-100 rounded-sm border-0 border-black/20'
);

const twButton = cnJoin(
  'w-20 h-7 py-2 px-4 inline-flex justify-center items-center gap-2',
  'bg-transparent border border-black/10 text-black/60 rounded-sm',
  'text-sm font-medium whitespace-nowrap'
);


