'use client';

import { useState } from 'react';

import { PinnedQueryFormSchema } from '@/types/index';
import { createPinnedQuery } from '@/server-actions';
import { convertErrorZodResultToMsgArray } from '@/utils/formatting';
import { useStore } from '@/store/useStore';

import Form from '@/components/[design-system]/modal-window-form/form';
import TitlesArea from '@/components/[design-system]/modal-window-form/area-titles';
import Section from '@/components/[design-system]/modal-window-form/section';
import Checkbox from '@/components/[design-system]/modal-window-form/checkbox';
import Label from '@/components/[design-system]/modal-window-form/label';
import Field from '@/components/[design-system]/modal-window-form/field';
import Textarea from '@/components/[design-system]/modal-window-form/textarea';
import ActionsArea from '@/components/[design-system]/modal-window-form/area-actions';

type QueryFormCreateProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function QueryFormCreate({ setIsOpen }: QueryFormCreateProps) {
  const clientSettings = useStore((state) => state.clientSettings);

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

  if (!clientSettings) {
    return null;
  };

  return (
    <Form className="w-[900px]" onSubmit={handleSubmit}>
      <TitlesArea title="Add Pinned Query" subTitle="Fill fields to create new pinned query" />

      <Section>
        <Label className="w-24" htmlFor="label">Label</Label>
        <Field
          id="label"
          name="label"
          type="text"
          placeholder="Label text"
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
          />
          <Checkbox
            className="mt-1"
            id="isTagOnlySearch"
            name="isTagOnlySearch"
            checkedByDefault={false}
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
        />
      </Section>

      <Section>
        <Label className="w-24" htmlFor="priority">Priority</Label>
        <Field
          id="prority"
          name="priority"
          type="text"
          placeholder={
            'Set priority in display order from 0 to 100, default (empty) is '
              + clientSettings.defaultPriorityForPinned
          }
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

