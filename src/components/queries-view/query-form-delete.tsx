'use client';

import { type DbPinnedQuery } from '@/types/index';
import { deletePinnedQuery } from '@/server-actions';

import Form from '@/components/[design-system]/forms/form';
import TitlesArea from '@/components/[design-system]/forms/area-titles';
import Section from '@/components/[design-system]/forms/section';
import ActionsArea from '@/components/[design-system]/forms/area-actions';
import WarningContent from '@/components/[design-system]/forms/warning';

type QueryFormDeleteProps = {
  query: DbPinnedQuery;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function QueryFormDelete({ query, setIsOpen }: QueryFormDeleteProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    await deletePinnedQuery(query.id);
    setIsOpen(false);
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
        errorMessages={null}
        processingMessage={null}
        submitButtonLabel="Delete"
      />
    </Form>
  );
}
