'use client';

import { useState } from 'react';

import { type DbSettings, DropdownItem, LinkFormSchema, SelectItem } from '@/types/index';
import { updateLink } from '@/server-actions';
import { convertErrorZodResultToMsgArray, cnJoin } from '@/utils/formatting';

import Form from '@/components/[design-system]/modal-window-form/form';
import TitlesArea from '@/components/[design-system]/modal-window-form/area-titles';
import Section from '@/components/[design-system]/modal-window-form/section';
import Label from '@/components/[design-system]/modal-window-form/label';
import Field from '@/components/[design-system]/modal-window-form/field';
import Textarea from '@/components/[design-system]/modal-window-form/textarea';
import ActionsArea from '@/components/[design-system]/modal-window-form/area-actions';
import Select from '@/components/[design-system]/modal-window-form/select';
import Checkbox from '@/components/[design-system]/modal-window-form/checkbox';

type SettingsFormProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  settings: DbSettings | null;
};

const priorityFirstSelectItems: Array<SelectItem> = [
  { label: 'light', value: 'light' },
  { label: 'dark', value: 'dark' },
];

const backgroundSelectItems: Array<SelectItem> = [
  { label: 'flowers', value: 'flowers' },
  { label: 'tropics', value: 'tropics' },
];

export default function SettingsForm({ setIsOpen, settings }: SettingsFormProps) {
  const [ errorMessages, setErrorMessages ] = useState<string[] | null>(null);
  const [ processingMessage, setProcessingMessage ] = useState<string | null>(null);




  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const formData = new FormData(e.currentTarget);
    const formDataObject = Object.fromEntries(formData.entries());
    const result = LinkFormSchema.safeParse(formDataObject);
    console.log(formDataObject);

    if (!result.success) {
      // setErrorMessages(convertErrorZodResultToMsgArray(result));

    } else {
      setErrorMessages([]);

      //setIsFetchingLinkData(true);
      // await updateLink({
      //   id: link.id,
      //   url: result.data.url,
      //   title: result.data.title,
      //   info: result.data.info,
      //   tags: result.data.tags,
      //   priority: result.data.priority
      // });
      //setIsFetchingLinkData(false);

      setIsOpen(false);
    }
  };

  if (settings === null) {
    return null;
  }

  return (
    <Form className="w-[600px]" onSubmit={handleSubmit}>
      <TitlesArea title="Edit Settings" subTitle="Update settings with new information" />

      <Section>
        <Label htmlFor="theme">Theme</Label>
        <Select
          className="w-[220px]"
          id="theme"
          name="theme"
          items={priorityFirstSelectItems}
          defaultValue={settings.theme}
        />
      </Section>

      <Section>
        <Label htmlFor="bgPattern">Background pattern</Label>
        <Select
          className="w-[220px]"
          id="bgPattern"
          name="bgPattern"
          items={backgroundSelectItems}
          defaultValue={'flowers'}
        />
      </Section>

      <Section>
        <Label htmlFor="linksPerPage">Links per page</Label>
        <Field
          className="w-[220px]"
          id="linksPerPage"
          name="linksPerPage"
          type="text"
          placeholder="Any number larger than 0"
          defaultValue={settings.linksPerPage}
        />
      </Section>

      <Section>
        <Checkbox
          id="sortLinksByPriorityFirst"
          name="sortLinksByPriorityFirst"
          checkedByDefault={settings.sortLinksByPriorityFirst}
        >
          Sort links by priority first
        </Checkbox>
      </Section>

      <Section>
        <Checkbox
          id="hideVerticalScrollBar"
          name="hideVerticalScrollBar"
          checkedByDefault={settings.sortLinksByPriorityFirst}
        >
          Hide vertical scrollbar
        </Checkbox>
      </Section>

      <ActionsArea
        errorMessages={errorMessages}
        processingMessage={processingMessage}
        submitButtonLabel="Update"
      />
    </Form>
  );
}
