'use client';

import { type DbLinkWithTags } from '@/types/index';
import { deleteLink } from '@/server-actions';

import Form from '@/components/[design-system]/forms/form';
import TitlesArea from '@/components/[design-system]/forms/area-titles';
import Section from '@/components/[design-system]/forms/section';
import ActionsArea from '@/components/[design-system]/forms/area-actions';
import WarningContent from '@/components/[design-system]/forms/warning';

type LinkFormDeleteProps = {
  link: DbLinkWithTags;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function LinkFormDelete({ link, setIsOpen }: LinkFormDeleteProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    await deleteLink(link.id);
    setIsOpen(false);
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
        errorMessages={null}
        processingMessage={null}
        submitButtonLabel="Delete"
      />
    </Form>
  );
}

