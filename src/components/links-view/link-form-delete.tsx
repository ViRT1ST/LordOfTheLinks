'use client';

import { useState } from 'react';

import { type DbLinkWithTags } from '@/types/index';
import { deleteLink, revalidateRootPath } from '@/server-actions';

import Form from '@/components/[design-system]/modal-window-form/form';
import TitlesArea from '@/components/[design-system]/modal-window-form/area-titles';
import Section from '@/components/[design-system]/modal-window-form/section';
import ActionsArea from '@/components/[design-system]/modal-window-form/area-actions';
import WarningContent from '@/components/[design-system]/modal-window-form/warning';

type LinkFormDeleteProps = {
  link: DbLinkWithTags;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function LinkFormDelete({ link, setIsOpen }: LinkFormDeleteProps) {
  const [ errorMessages, setErrorMessages ] = useState<string[] | null>(null);
  const [ processingMessage, setProcessingMessage ] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setErrorMessages(null);
    setProcessingMessage(null);

    const deletedLink = await deleteLink(link.id);

    if (!deletedLink) {
      setErrorMessages(['Failed to delete link']);
    } else {
      setIsOpen(false);
      revalidateRootPath();
    }
  };

  return (
    <Form className="w-[900px]" onSubmit={handleSubmit}>
      <TitlesArea title="Delete Link" subTitle="Are you sure you want to delete this link?" />

      <Section>
        <WarningContent>
          {link.title}
        </WarningContent>
      </Section>

      <ActionsArea
        errorMessages={errorMessages}
        processingMessage={processingMessage}
        submitButtonLabel="Delete"
      />
    </Form>
  );
}

