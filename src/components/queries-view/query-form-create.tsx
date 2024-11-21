'use client';

import { useState } from 'react';

import { PinnedFormSchema } from '@/types/index';
import { createPinnedQuery } from '@/server-actions';
import { convertErrorZodResultToMsgArray } from '@/utils/zod';
import { cnJoin } from '@/utils/classes';

export default function QueryFormCreate() {
  const [ errorMessages, setErrorMessages ] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const formDataObject = Object.fromEntries(formData.entries());
    const result = PinnedFormSchema.safeParse(formDataObject);

    if (!result.success) {
      e.stopPropagation();
      setErrorMessages(convertErrorZodResultToMsgArray(result));

    } else {
      e.currentTarget.reset();
      setErrorMessages([]);

      console.log('create pq');
      await createPinnedQuery({
        label: result.data.label,
        query: result.data.query
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className={twForm} autoComplete="off">
      <h1 className={twTitle}>Add Pinned Query</h1>
      <p className={twDescription}>Create new pinned search query</p>

      <div className={twInputSection}>
        <label htmlFor="label" className={twInputLabel}>Label</label>
        <input
          className={twInput}
          name="label"
          id="label"
          type="text"
          placeholder="Label text"
        />
      </div>

      <div className={twInputSection}>
        <label htmlFor="query" className={twInputLabel}>Query</label>
        <input
          className={twInput}
          name="query"
          id="query"
          type="text"
          placeholder="Search text"
        />
      </div>

      <div className={twButtonsAndMsgArea}>
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

const twForm = cnJoin(
  'z-50 w-[500px] p-6 flex flex-col gap-y-2',
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

const twInputLabel = cnJoin(
  'pt-[1px] w-16',
  'text-sm font-medium leading-none'
);

const twInput = cnJoin(
  'w-full h-10 px-3 py-2 flex',
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

const twSubmitButton = cnJoin(
  'h-10 px-4 py-2 inline-flex items-center justify-center gap-2',
  'bg-neutral-900 rounded-md',
  'text-neutral-50 font-medium text-base'
);