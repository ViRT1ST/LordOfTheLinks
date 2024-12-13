'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoaderCircle } from 'lucide-react';

import { LinkFormSchema } from '@/types/index';
import { createLink, fetchLinkDataByUrl } from '@/server-actions';
import { convertErrorZodResultToMsgArray, cnJoin } from '@/utils/formatting';

type LinkFormCreateProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function LinkFormCreate({ setIsOpen }: LinkFormCreateProps) {
  const router = useRouter();

  const [ errorMessages, setErrorMessages ] = useState<string[]>([]);
  const [ titleInputText, setTitleInputText ] = useState('');
  const [ infoInputText, setInfoInputText ] = useState<string | null>(null);
  const [ faviconUrls, setFaviconUrls ] = useState<string[]>([]);
  const [ processingMessage, setProcessingMessage ] = useState<string | null>(null);

  const handleUrlInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;

    if (!url.startsWith('http')) {
      return '';
    }

    setProcessingMessage('Parsing URL...');
    const { title, description, faviconUrls } = await fetchLinkDataByUrl(url);

    title && setTitleInputText(title);
    description && setInfoInputText(description);
    faviconUrls && setFaviconUrls(faviconUrls);

    setProcessingMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const formData = new FormData(e.currentTarget);
    const formDataObject = Object.fromEntries(formData.entries());
    const result = LinkFormSchema.safeParse(formDataObject);

    if (!result.success) {
      setErrorMessages(convertErrorZodResultToMsgArray(result));

    } else {
      setErrorMessages([]);

      setProcessingMessage('Looking for icon...');
      const link = await createLink({
        url: result.data.url,
        title: result.data.title,
        info: result.data.info,
        tags: result.data.tags,
        priority: result.data.priority,
        faviconUrls,
      });
      setProcessingMessage(null);

      setIsOpen(false);
      router.push(`/?q=id:${link.id}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={twForm} autoComplete="off">
      <h1 className={twTitle}>Add New Link</h1>
      <p className={twDescription}>Create new link with url, title and tags</p>

      <div className={twInputSection}>
        <label htmlFor="url" className={twInputLabel}>URL</label>
        <input
          className={twInput}
          name="url"
          id="url"
          type="text"
          placeholder="https://example.com"
          onChange={handleUrlInputChange}
          // autoFocus={true}
        />
      </div>

      <div className={twInputSection}>
        <label htmlFor="title" className={twInputLabel}>Title</label>
        <input
          className={twInput}
          name="title"
          id="title"
          type="text"
          placeholder="Page title"
          value={titleInputText}
          onChange={(e) => setTitleInputText(e.target.value)}
        />
      </div>

      <div className={twInputSection}>
        <label htmlFor="info" className={twTextAreaLabel}>Info</label>
        <textarea
          className={twTextArea}
          name="info"
          id="info"
          placeholder="Notes or description"
          value={infoInputText || ''}
          onChange={(e) => setInfoInputText(e.target.value)}
        />
      </div>

      <div className={twInputSection}>
        <label htmlFor="tags" className={twInputLabel}>Tags</label>
        <input
          className={twInput}
          name="tags"
          id="tags"
          type="text"
          placeholder="Comma separated tags"
        />
      </div>

      <div className={twInputSection}>
        <label htmlFor="priority" className={twInputLabel}>Priority</label>
        <input
          className={twInput}
          name="priority"
          id="priority"
          type="text"
          placeholder="Set priority in display order (0-100, default 10)"
        />
      </div>

      <div className={twButtonsAndMsgArea}>
        <div>
          {errorMessages && errorMessages.map((message) => (
            <span key={message} className={twInputErrorMessage}>
              {message}
            </span>
          ))}
          {processingMessage && (
            <div className={twFetchingContainer}>
              <LoaderCircle className="animate-spin" />
              <span>{processingMessage}</span>
            </div>
          )}
        </div>
        <button type="submit" className={twSubmitButton}>
          Create
        </button>
      </div>
    </form>
  );
}

const twForm = cnJoin(
  'z-50 w-[800px] p-6 flex flex-col gap-y-2',
  'bg-white rounded-lg font-inter'
);

const twTitle = cnJoin(
  'text-lg font-semibold leading-none tracking-tight'
);

const twDescription = cnJoin(
  'text-sm text-neutral-500 mb-6'
);

const twInputSection = cnJoin(
  'w-full mb-3 flex flex-row items-center'
);

const twInputLabel = cnJoin(
  'pt-[1px] w-20 ',
  'text-sm font-medium leading-none'
);

const twInput = cnJoin(
  'w-full h-10 px-3 py-2 flex',
  'bg-white outline-none rounded ring-1 ring-neutral-200',
  'text-sm placeholder:text-neutral-500',
  'focus-visible:ring-2 focus-visible:ring-neutral-700'
);

const twTextAreaLabel = cnJoin(
  'pt-[11px] w-20 self-start',
  'text-sm font-medium leading-none',
);

const twTextArea = cnJoin(
  'w-full min-h-32 max-h-64 px-3 py-2 flex',
  'bg-white outline-none rounded ring-1 ring-neutral-200',
  'text-sm placeholder:text-neutral-500',
  'focus-visible:ring-2 focus-visible:ring-neutral-700'
);

const twButtonsAndMsgArea = cnJoin(
  'mt-4 flex flex-row justify-between',
);

const twInputErrorMessage = cnJoin(
  'block text-red-500 text-sm font-semibold'
);

const twFetchingContainer = cnJoin(
  'flex flex-row items-center gap-x-2',
  'text-teal-500 text-sm font-semibold'
);

const twSubmitButton = cnJoin(
  'h-10 px-4 py-2 inline-flex items-center justify-center gap-2',
  'bg-neutral-900 rounded-md',
  'text-neutral-50 font-medium text-base'
);