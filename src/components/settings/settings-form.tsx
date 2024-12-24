'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

import { type UpdateSettingsData, type SelectItem, SettingsFormSchema } from '@/types/index';
import { updateSettings } from '@/server-actions';
import { convertErrorZodResultToMsgArray, cnJoin } from '@/utils/formatting';
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
  // settings: DbSettings | null;
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
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentSettings = useStore((state) => state.currentSettings);
  const setCurrentSettings = useStore((state) => state.setCurrentSettings);

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
      const settings = await updateSettings({ ...result.data });
      setCurrentSettings(settings);
      // router.push(`/?${searchParams.toString()}`, { scroll: false });
      
      setIsOpen(false);
      router.refresh();
    }
  };

  if (currentSettings === null) {
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
          defaultValue={currentSettings.theme}
        />
      </Section>

      <Section>
        <Label htmlFor="background">Background pattern</Label>
        <Select
          className="w-[220px]"
          id="background"
          name="background"
          items={backgroundSelectItems}
          defaultValue={currentSettings.background}
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
          defaultValue={currentSettings.linksPerPage}
        />
      </Section>

      <Section>
        <Checkbox
          id="sortLinksByPriorityFirst"
          name="sortLinksByPriorityFirst"
          checkedByDefault={currentSettings.sortLinksByPriorityFirst}
        >
          Sort links by priority first
        </Checkbox>
      </Section>

      <Section>
        <Checkbox
          id="hideVerticalScrollbar"
          name="hideVerticalScrollbar"
          checkedByDefault={currentSettings.hideVerticalScrollbar}
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
