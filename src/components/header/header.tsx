'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';

import { type DbSettings } from '@/types';
import { getModalContainerElement } from '@/utils/others';
import { cnJoin } from '@/utils/formatting';
import { getSettings } from '@/server-actions';

import ModalWindow from '@/components/[design-system]/modal-window';
import SearchForm from '@/components/header/search-form';
import SettingForm from '@/components/settings/settings-form';
import LinkFormCreate from '@/components/links-view/link-form-create';
import Button from '@/components/[design-system]/button';

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
      <div className={twContainerCorner}>
        <Button element="a" href="/?v=links">
          All Links
        </Button>
        <Button element="a" href="/?v=queries">
          Pinned Queries
        </Button>
      </div>

      <div className={twContainerMiddle}>
        <SearchForm />
      </div>

      <div className={twContainerCorner}>
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
    </header>
  );
}

const twHeader = cnJoin(
  'fixed top-0 left-0',
  'w-full h-14 px-5',
  'flex flex-row justify-center',
  'bg-white/50',
);

const twContainerCorner = cnJoin(
  'flex items-center gap-x-4'
);

const twContainerMiddle = cnJoin(
  'w-full flex items-center justify-center flex-grow',
);