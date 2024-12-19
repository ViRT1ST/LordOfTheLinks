'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';


import { type DbSettings } from '@/types';
import { cnJoin } from '@/utils/formatting';
import { getModalContainerElement } from '@/utils/others';
import { getSettings } from '@/server-actions';
import FormSearch from '@/components/header/form-search';
import ModalWindow from '@/components/[design-system]/modal-window';
import LinkFormCreate from '@/components/links-view/link-form-create';
import SettingForm from '@/components/settings/settings-form';
import Button from '../[design-system]/button';

export default function Header() {
  const [ isCreateLinkModalOpen, setIsCreateLinkModalOpen ] = useState(false);
  const [ isSettingsModalOpen, setIsSettingsModalOpen ] = useState(false);
  const [ settings, setSettings ] = useState<DbSettings | null>(null);

  const handleSettingsButtonClick = async () => {
    const settings = await getSettings();
    setSettings(settings);
    setIsSettingsModalOpen(true);
  };

  return (
    <header className={twHeader}>
      {/* <div className={twHeaderLimiter}> */}

      <div className={twContainerLeft}>
        <Button element="a" href="/?v=links">
          All Links
        </Button>

        <Button element="a" href="/?v=queries">
          Pinned Queries
        </Button>
      </div>

      <div className={twContainerMiddle}>
        <FormSearch />
      </div>

      <div className={twContainerRight}>
        <Button element="button" onClick={() => setIsCreateLinkModalOpen(true)}>
          Add New Link
        </Button>
        <Button element="button" onClick={handleSettingsButtonClick}>
          Settings
        </Button>
      </div>

      {isCreateLinkModalOpen && (
        createPortal(
          <ModalWindow
            isOpen={isCreateLinkModalOpen}
            setIsOpen={setIsCreateLinkModalOpen}
            content={
              <LinkFormCreate
                setIsOpen={setIsCreateLinkModalOpen}
              />
            }
            isOverlayClickDoClose={false}
            focusOnFirstElement={true}
          />,
          getModalContainerElement()
        )
      )}

      {isSettingsModalOpen && (
        createPortal(
          <ModalWindow
            isOpen={isSettingsModalOpen}
            setIsOpen={setIsSettingsModalOpen}
            content={
              <SettingForm
                setIsOpen={setIsSettingsModalOpen}
                settings={settings}
              />
            }
            isOverlayClickDoClose={true}
            focusOnFirstElement={true}
          />,
          getModalContainerElement()
        )
      )}

      {/* </div> */}
    </header>
  );
}

const twHeader = cnJoin(
  'z-10 fixed top-0 left-0 px-5 h-14 w-full flex justify-center',
  // 'bg-[#cfcecd]',
  // 'bg-[#dad7d7]',
  'bg-white/50',
);

// const twHeaderLimiter = cnJoin(
//   'w-[1320px] px-5 flex flex-row', // w-[1200px] w-full
  
// );

const twContainerLeft = cnJoin(
  'flex items-center gap-x-4' //px-5 
);

const twContainerMiddle = cnJoin(
  'flex items-center justify-center flex-grow',
  // '2xl:pr-12'
);

const twContainerRight = cnJoin(
  'flex items-center gap-x-4' //px-5 
);

const twButton = cnJoin(
  'h-8 py-2 px-4 inline-flex justify-center items-center gap-2',
  'bg-transparent border border-black/10 text-black/60 rounded-md',
  'text-sm font-medium whitespace-nowrap transition-all',
  'hover:text-black hover:border-black/15', 
  'font-inter',

  // bg-based on flowers backround
  'bg-[#f4f4f4]'
);
