'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { LinkFormSchema } from '@/types/index';
import { convertErrorZodResultToMsgArray } from '@/utils/formatting';
import { createLink, fetchLinkDataByUrl } from '@/server-actions';

import Form from '@/components/[design-system]/modal-window-form/form';
import TitlesArea from '@/components/[design-system]/modal-window-form/area-titles';
import Section from '@/components/[design-system]/modal-window-form/section';
import Label from '@/components/[design-system]/modal-window-form/label';
import Field from '@/components/[design-system]/modal-window-form/field';
import Textarea from '@/components/[design-system]/modal-window-form/textarea';
import ActionsArea from '@/components/[design-system]/modal-window-form/area-actions';

type LinkFormCreateProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function LinkFormCreate({ setIsOpen }: LinkFormCreateProps) {
  const [ errorMessages, setErrorMessages ] = useState<string[] | null>(null);
  const [ processingMessage, setProcessingMessage ] = useState<string | null>(null);

  const [ titleText, setTitleText ] = useState('');
  const [ infoText, setInfoText ] = useState('');
  const [ faviconUrls, setFaviconUrls ] = useState<string[]>([]);

  const router = useRouter();

  const handleUrlInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;

    if (!url.startsWith('http')) {
      return '';

    } else {
      setProcessingMessage('Parsing URL...');
      const { title, description, faviconUrls } = await fetchLinkDataByUrl(url);
  
      title && setTitleText(title);
      description && setInfoText(description);
      faviconUrls && setFaviconUrls(faviconUrls);
  
      setProcessingMessage(null);
    }
  };

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
      setProcessingMessage('Looking for icon...');
      const link = await createLink({
        url: result.data.url,
        title: result.data.title,
        info: result.data.info,
        tags: result.data.tags,
        priority: result.data.priority,
        faviconUrls,
      });
      setIsOpen(false);
      router.push(`/?q=id:${link.id}`);
    }
  };

  return (
    <Form className="w-[900px]" onSubmit={handleSubmit}>
      <TitlesArea title="Add New Link" subTitle="Fill fields to create new link" />

      <Section>
        <Label className="w-24" htmlFor="url">URL</Label>
        <Field
          id="url"
          name="url"
          type="text"
          placeholder="https://example.com"
          onChange={handleUrlInputChange}
        />
      </Section>

      <Section>
        <Label className="w-24" htmlFor="title">Title</Label>
        <Field
          id="title"
          name="title"
          type="text"
          placeholder="Page title"
          value={titleText}
          onChange={(e) => setTitleText(e.target.value)}
        />
      </Section>

      <Section>
        <Label className="w-24" htmlFor="info">Info</Label>
        <Textarea
          id="info"
          name="info"
          placeholder="Notes or description"
          value={infoText || ''}
          onChange={(e) => setInfoText(e.target.value)}
        />
      </Section>

      <Section>
        <Label className="w-24" htmlFor="tags">Tags</Label>
        <Field
          id="tags"
          name="tags"
          type="text"
          placeholder="Comma separated tags"
        />
      </Section>
      
      <Section>
        <Label className="w-24" htmlFor="priority">Priority</Label>
        <Field
          id="priority"
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
