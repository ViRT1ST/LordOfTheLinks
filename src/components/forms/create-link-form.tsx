'use client';

import { useState } from 'react';

import { LinkFormSchema } from '@/types/index';
import { createLink } from '@/server-actions';
import { convertErrorZodResultToMsgArray } from '@/utils/zod';
import { cn } from '@/utils/classes';

export default function CreateLinkForm() {
  const [ errorMessages, setErrorMessages ] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const formDataObject = Object.fromEntries(formData.entries());
    const result = LinkFormSchema.safeParse(formDataObject);

    if (!result.success) {
      e.stopPropagation();
      setErrorMessages(convertErrorZodResultToMsgArray(result));

    } else {
      e.currentTarget.reset();
      setErrorMessages([]);
      await createLink({
        url: result.data.url,
        title: result.data.title,
        tags: result.data?.tags
          ? result.data?.tags.split(' ')
          : [],
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className={twForm} autoComplete="off">
      <h1 className={twTitle}>Add New Link</h1>
      <p className={twDescription}>Create new link with url, title and tags</p>

      <div className={twInputSection}>
        <label htmlFor="url" className={twLabel}>URL</label>
        <input
          className={twInput}
          name="url"
          type="text"
          placeholder="https://example.com"
        />
      </div>

      <div className={twInputSection}>
        <label htmlFor="title" className={twLabel}>Title</label>
        <input
          className={twInput}
          name="title"
          type="text"
          placeholder="Page title"
        />
      </div>

      <div className={twInputSection}>
        <label htmlFor="tags" className={twLabel}>Tags</label>
        <input
          className={twInput}
          name="tags"
          type="text"
          placeholder="Space separated tags"
        />
      </div>

      <div className={twButtonsAndErrorsArea}>
        <div>
          {errorMessages && errorMessages.map((message) => (
            <span key={message} className={twInputErrorMessage}>
              {message}
            </span>
          ))}
        </div>
        <button type="submit" className={twSubmitButton}>
          Create
        </button>
      </div>
    </form>
  );
}

const twForm = cn(
  'z-50 w-[800px] p-6 flex flex-col gap-y-2',
  'bg-white rounded-lg'
);

const twTitle = cn(
  'text-lg font-semibold leading-none tracking-tight'
);

const twDescription = cn(
  'text-sm text-neutral-500 mb-6'
);

const twInputSection = cn(
  'w-full mb-3 flex flex-row items-center'
);

const twLabel = cn(
  'pt-[1px] w-12',
  'text-sm font-medium leading-none'
);

const twInput = cn(
  'w-full h-10 px-3 py-2 flex',
  'bg-white outline-none rounded ring-1 ring-neutral-200 ',
  'text-sm placeholder:text-neutral-500',
  'focus-visible:ring-2 focus-visible:ring-neutral-700'
);

const twInputErrorMessage = cn(
  'block text-red-500 text-sm font-semibold'
);

const twButtonsAndErrorsArea = cn(
  'mt-4 flex flex-row justify-between',
);

const twSubmitButton = cn(
  'h-10 px-4 py-2 inline-flex items-center justify-center gap-2',
  'bg-neutral-900 rounded-md',
  'text-neutral-50 font-medium text-md'
);