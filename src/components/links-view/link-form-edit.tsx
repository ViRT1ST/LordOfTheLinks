'use client';

import { useState } from 'react';

import { type DbLinkWithTags, LinkFormSchema } from '@/types/index';
import { updateLink } from '@/server-actions';
import { convertErrorZodResultToMsgArray } from '@/utils/zod';
import { cnJoin } from '@/utils/classes';
import { dispathSubmitEventToBody } from '@/utils/forms';

type LinkFormEditProps = {
  link: DbLinkWithTags;
};

export default function LinkFormEdit({ link }: LinkFormEditProps) {
  const [ errorMessages, setErrorMessages ] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const formData = new FormData(e.currentTarget);
    const formDataObject = Object.fromEntries(formData.entries());
    const result = LinkFormSchema.safeParse(formDataObject);

    if (!result.success) {
      setErrorMessages(convertErrorZodResultToMsgArray(result));

    } else {
      e.currentTarget.reset();
      
      setErrorMessages([]);
      await updateLink({
        id: link.id,
        url: result.data.url,
        title: result.data.title,
        info: result.data.info,
        tags: result.data.tags
      });

      dispathSubmitEventToBody();
    }
  };

  return (
    <form onSubmit={handleSubmit} className={twForm} autoComplete="off">
      <h1 className={twTitle}>Edit Current Link</h1>
      <p className={twDescription}>Update link data</p>

      <div className={twInputSection}>
        <label htmlFor="url" className={twLabel}>URL</label>
        <input
          className={twInput}
          name="url"
          id="url"
          type="text"
          placeholder="https://example.com"
          defaultValue={link.url}
        />
      </div>

      <div className={twInputSection}>
        <label htmlFor="title" className={twLabel}>Title</label>
        <input
          className={twInput}
          name="title"
          id="title"
          type="text"
          placeholder="Page title"
          defaultValue={link.title}
        />
      </div>

      <div className={twInputSection}>
        <label htmlFor="info" className={twTextAreaLabel}>Info</label>
        <textarea
          className={twTextArea}
          name="info"
          id="info"
          placeholder="Notes or description"
          defaultValue={link.info || ''}
        />
      </div>

      <div className={twInputSection}>
        <label htmlFor="tags" className={twLabel}>Tags</label>
        <input
          className={twInput}
          name="tags"
          id="tags"
          type="text"
          placeholder="Comma separated tags"
          defaultValue={link.tags?.map((tag) => tag.value).join(', ') || ''}
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
          Update
        </button>
      </div>
    </form>
  );
}

const twForm = cnJoin(
  'z-50 w-[800px] p-6 flex flex-col gap-y-2',
  'bg-white rounded-lg'
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

const twLabel = cnJoin(
  'pt-[1px] w-12',
  'text-sm font-medium leading-none'
);

const twInput = cnJoin(
  'w-full h-10 px-3 py-2 flex',
  'bg-white outline-none rounded ring-1 ring-neutral-200 ',
  'text-sm placeholder:text-neutral-500',
  'focus-visible:ring-2 focus-visible:ring-neutral-700'
);

const twTextAreaLabel = cnJoin(
  'pt-[11px] w-12 self-start',
  'text-sm font-medium leading-none',
);

const twTextArea = cnJoin(
  'w-full min-h-32 max-h-64 px-3 py-2 flex',
  'bg-white outline-none rounded ring-1 ring-neutral-200 ',
  'text-sm placeholder:text-neutral-500',
  'focus-visible:ring-2 focus-visible:ring-neutral-700'
);

const twInputErrorMessage = cnJoin(
  'block text-red-500 text-sm font-semibold'
);

const twButtonsAndErrorsArea = cnJoin(
  'mt-4 flex flex-row justify-between',
);

const twSubmitButton = cnJoin(
  'h-10 px-4 py-2 inline-flex items-center justify-center gap-2',
  'bg-neutral-900 rounded-md',
  'text-neutral-50 font-medium text-base'
);