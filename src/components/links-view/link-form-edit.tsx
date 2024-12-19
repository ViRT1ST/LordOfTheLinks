'use client';

import { useState } from 'react';

import { type DbLinkWithTags, LinkFormSchema } from '@/types/index';
import { convertErrorZodResultToMsgArray } from '@/utils/formatting';
import { updateLink } from '@/server-actions';

import Form from '@/components/[design-system]/forms/form';
import TitlesArea from '@/components/[design-system]/forms/area-titles';
import Section from '@/components/[design-system]/forms/section';
import Label from '@/components/[design-system]/forms/label';
import Field from '@/components/[design-system]/forms/field';
import Textarea from '@/components/[design-system]/forms/textarea';
import ActionsArea from '@/components/[design-system]/forms/area-actions';

type LinkFormEditProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  link: DbLinkWithTags;
};

export default function LinkFormEdit({ setIsOpen, link }: LinkFormEditProps) {
  const [ errorMessages, setErrorMessages ] = useState<string[] | null>(null);
  const [ processingMessage, setProcessingMessage ] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setErrorMessages(null);
    setProcessingMessage(null);

    const formData = new FormData(e.currentTarget);
    const formDataObject = Object.fromEntries(formData.entries());
    const result = LinkFormSchema.safeParse(formDataObject);

    if (!result.success) {
      const errorsList = convertErrorZodResultToMsgArray(result);
      setErrorMessages(errorsList);

    } else {
      setProcessingMessage('Updating link...');
      await updateLink({
        id: link.id,
        url: result.data.url,
        title: result.data.title,
        info: result.data.info,
        tags: result.data.tags,
        priority: result.data.priority
      });
      setIsOpen(false);
    }
  };

  return (
    <Form className="w-[900px]" onSubmit={handleSubmit}>
      <TitlesArea title="Edit Link" subTitle="Update fields with new information" />

      <Section>
        <Label className="w-24" htmlFor="url">URL</Label>
        <Field
          name="url"
          type="text"
          placeholder="https://example.com"
          defaultValue={link.url}
        />
      </Section>

      <Section>
        <Label className="w-24" htmlFor="title">Title</Label>
        <Field
          name="title"
          type="text"
          placeholder="Page title"
          defaultValue={link.title}
        />
      </Section>

      <Section>
        <Label className="w-24" htmlFor="info">Info</Label>
        <Textarea
          name="info"
          placeholder="Notes or description"
          defaultValue={link.info || ''}
        />
      </Section>

      <Section>
        <Label className="w-24" htmlFor="tags">Tags</Label>
        <Field
          name="tags"
          type="text"
          placeholder="Comma separated tags"
          defaultValue={link.tags?.map((tag) => tag.value).join(', ') || ''}
        />
      </Section>

      <Section>
        <Label className="w-24" htmlFor="priority">Priority</Label>
        <Field
          name="priority"
          type="text"
          placeholder="Set priority in display order from 0 to 100, default (empty) is 10"
          defaultValue={link.priority}
        />
      </Section>

      <ActionsArea
        errorMessages={errorMessages}
        processingMessage={processingMessage}
        submitButtonLabel="Update"
      />
    </Form>
  );
}
