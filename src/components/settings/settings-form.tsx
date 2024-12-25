'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import {
  type DbSettings,
  type SelectItem,
  type UpdateSettingsData,
  SettingsFormSchema
} from '@/types/index';
import { setScrollbarVisibility } from '@/utils/dom';
import { updateSettings } from '@/server-actions';
import { convertErrorZodResultToMsgArray } from '@/utils/formatting';
import { useStore } from '@/store/useStore';

import Form from '@/components/[design-system]/modal-window-form/form';
import TitlesArea from '@/components/[design-system]/modal-window-form/area-titles';
import Section from '@/components/[design-system]/modal-window-form/section';
import Label from '@/components/[design-system]/modal-window-form/label';
import Field from '@/components/[design-system]/modal-window-form/field';
import ActionsArea from '@/components/[design-system]/modal-window-form/area-actions';
import Select from '@/components/[design-system]/modal-window-form/select';
import Checkbox from '@/components/[design-system]/modal-window-form/checkbox';

type SettingsFormProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const priorityFirstSelectItems: Array<SelectItem> = [
  { label: 'light', value: 'light' },
  { label: 'dark', value: 'dark' },
];

const backgroundSelectItems: Array<SelectItem> = [
  { label: 'flowers', value: 'flowers' },
  { label: 'none', value: 'none' },
];

export default function SettingsForm({ setIsOpen }: SettingsFormProps) {
  const router = useRouter();

  const clientSettings = useStore((state) => state.clientSettings);
  const setClientSettings = useStore((state) => state.setClientSettings);

  const [ errorMessages, setErrorMessages ] = useState<string[] | null>(null);
  const [ processingMessage, setProcessingMessage ] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setErrorMessages(null);
    setProcessingMessage(null);

    const formData = new FormData(e.currentTarget);
    const formDataObject = Object.fromEntries(formData.entries());
    const result = SettingsFormSchema.safeParse(formDataObject);
    console.log(formDataObject);

    if (!result.success) {
      const errorsList = convertErrorZodResultToMsgArray(result);
      setErrorMessages(errorsList);

    } else {
      setProcessingMessage('Updating settings...');
      const serverSettings = await updateSettings({ ...result.data });
      setClientSettings(serverSettings);
      setScrollbarVisibility(serverSettings.hideVerticalScrollbar);
      router.refresh();
      setIsOpen(false);
    }
  };

  if (clientSettings === null) {
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
          defaultValue={clientSettings.theme}
        />
      </Section>

      <Section>
        <Label htmlFor="background">Background</Label>
        <Select
          className="w-[220px]"
          id="background"
          name="background"
          items={backgroundSelectItems}
          defaultValue={clientSettings.background}
        />
      </Section>

      <Section>
        <Label htmlFor="linksPerPage">Links per page</Label>
        <Field
          className="w-[220px]"
          id="linksPerPage"
          name="linksPerPage"
          type="text"
          placeholder="Number between 1 and 1000"
          defaultValue={clientSettings.linksPerPage}
        />
      </Section>

      <Section>
        <Checkbox
          id="sortLinksByPriorityFirst"
          name="sortLinksByPriorityFirst"
          checkedByDefault={clientSettings.sortLinksByPriorityFirst}
        >
          Sort links by priority first
        </Checkbox>
      </Section>

      <Section>
        <Checkbox
          id="hideVerticalScrollbar"
          name="hideVerticalScrollbar"
          checkedByDefault={clientSettings.hideVerticalScrollbar}
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
