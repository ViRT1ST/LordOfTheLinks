'use client';

import { useState } from 'react';

import { type DbPinnedQuery, PinnedQueryFormSchema } from '@/types/index';
import { convertErrorZodResultToMsgArray } from '@/utils/formatting';
import { updatePinnedQuery } from '@/server-actions';

import Form from '@/components/[design-system]/modal-window-form/form';
import TitlesArea from '@/components/[design-system]/modal-window-form/area-titles';
import Section from '@/components/[design-system]/modal-window-form/section';
import Checkbox from '@/components/[design-system]/modal-window-form/checkbox';
import Label from '@/components/[design-system]/modal-window-form/label';
import Field from '@/components/[design-system]/modal-window-form/field';
import Textarea from '@/components/[design-system]/modal-window-form/textarea';
import ActionsArea from '@/components/[design-system]/modal-window-form/area-actions';

type QueryFormEditProps = {
  query: DbPinnedQuery;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function QueryFormEdit({ query, setIsOpen }: QueryFormEditProps) {
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
      setProcessingMessage('Updating pinned query...');
      await updatePinnedQuery({
        id: query.id,
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
      <TitlesArea title="Edit Pinned Query" subTitle="Update fields with new information" />

      <Section>
        <Label className="w-24" htmlFor="label">Label</Label>
        <Field
          id="label"
          name="label"
          type="text"
          placeholder="Label text"
          defaultValue={query.label}
        />
      </Section>

      <Section>
        <Label className="w-24" htmlFor="query">Query</Label>
        <div className="w-full">
          <Field
            id="query"  
            name="query"
            type="text"
            placeholder="Search text"
            defaultValue={query.query}
          />
          <Checkbox
            className="mt-1"
            id="isTagOnlySearch"
            name="isTagOnlySearch"
            checkedByDefault={query.isTagOnlySearch}
          >
            Search in tags only
          </Checkbox>
        </div>
      </Section>

      <Section>
        <Label className="w-24" htmlFor="info">Info</Label>
        <Textarea
          id="info"
          name="info"
          placeholder="Notes or description"
          defaultValue={query.info || ''}
        />
      </Section>

      <Section>
        <Label className="w-24" htmlFor="priority">Priority</Label>
        <Field
          id="priority"
          name="priority"
          type="text"
          placeholder="Set priority in display order from 0 to 100, default (empty) is 10"
          defaultValue={query.priority}
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
