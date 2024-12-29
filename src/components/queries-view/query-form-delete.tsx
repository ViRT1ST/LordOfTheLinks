'use client';

import { useState } from 'react';

import { type DbPinnedQuery } from '@/types/index';
import { deletePinnedQuery, revalidateRootPath } from '@/server-actions';

import Form from '@/components/[design-system]/modal-window-form/form';
import TitlesArea from '@/components/[design-system]/modal-window-form/area-titles';
import Section from '@/components/[design-system]/modal-window-form/section';
import ActionsArea from '@/components/[design-system]/modal-window-form/area-actions';
import WarningContent from '@/components/[design-system]/modal-window-form/warning';

type QueryFormDeleteProps = {
  query: DbPinnedQuery;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function QueryFormDelete({ query, setIsOpen }: QueryFormDeleteProps) {
  const [ errorMessages, setErrorMessages ] = useState<string[] | null>(null);
  const [ processingMessage, setProcessingMessage ] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setErrorMessages(null);
    setProcessingMessage(null);

    const deletedPinnedQuery = await deletePinnedQuery(query.id);

    if (!deletedPinnedQuery) {
      setErrorMessages(['Failed to delete pinned query']);
    } else {
      setIsOpen(false);
      revalidateRootPath();
    }
  };

  return (
    <Form className="w-[900px]" onSubmit={handleSubmit}>
      <TitlesArea
        title="Delete Pinned Query"
        subTitle="Are you sure you want to delete this pinned query?"
      />

      <Section>
        <WarningContent>
          {query.label}
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
