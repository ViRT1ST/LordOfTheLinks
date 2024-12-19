'use client';

import { useState } from 'react';

import { PinnedQueryFormSchema } from '@/types/index';
import { createPinnedQuery } from '@/server-actions';
import { convertErrorZodResultToMsgArray } from '@/utils/formatting';

import Form from '@/components/[design-system]/forms/form';
import TitlesArea from '@/components/[design-system]/forms/area-titles';
import Section from '@/components/[design-system]/forms/section';
import Checkbox from '@/components/[design-system]/forms/checkbox';
import Label from '@/components/[design-system]/forms/label';
import Field from '@/components/[design-system]/forms/field';
import Textarea from '@/components/[design-system]/forms/textarea';
import ActionsArea from '@/components/[design-system]/forms/area-actions';

type QueryFormCreateProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function QueryFormCreate({ setIsOpen }: QueryFormCreateProps) {
  const [ errorMessages, setErrorMessages ] = useState<string[] | null>(null);
  const [ processingMessage, setProcessingMessage ] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setErrorMessages(null);
    setProcessingMessage(null);

    const formData = new FormData(e.currentTarget);
    const formDataObject = Object.fromEntries(formData.entries());
    const result = PinnedQueryFormSchema.safeParse(formDataObject);

    if (!result.success) {
      const errorsList = convertErrorZodResultToMsgArray(result);
      setErrorMessages(errorsList);

    } else {
      setProcessingMessage('Creating pinned query...');
      await createPinnedQuery({
        label: result.data.label,
        query: result.data.query,
        info: result.data.info,
        isTagOnlySearch: result.data.isTagOnlySearch,
        priority: result.data.priority
      });
      setIsOpen(false);
    }
  };

  return (
    <Form className="w-[900px]" onSubmit={handleSubmit}>
      <TitlesArea title="Add Pinned Query" subTitle="Fill fields to create new pinned query" />

      <Section>
        <Label className="w-24" htmlFor="label">Label</Label>
        <Field
          name="label"
          type="text"
          placeholder="Label text"
        />
      </Section>

      <Section>
        <Label className="w-24" htmlFor="query">Query</Label>
        <div className="w-full">
          <Field
            name="query"
            type="text"
            placeholder="Search text"
          />
          <Checkbox className="mt-1" name="isTagOnlySearch" checkedByDefault={false} >
            Search in tags only
          </Checkbox>
        </div>
      </Section>

      <Section>
        <Label className="w-24" htmlFor="info">Info</Label>
        <Textarea
          name="info"
          placeholder="Notes or description"
        />
      </Section>

      <Section>
        <Label className="w-24" htmlFor="priority">Priority</Label>
        <Field
          name="priority"
          type="text"
          placeholder="Set priority in display order from 0 to 100, default (empty) is 10"
        />
      </Section>

      <ActionsArea
        errorMessages={errorMessages}
        processingMessage={processingMessage}
        submitButtonLabel="Create"
      />
    </Form>
  );
}

