'use client';

import { useState } from 'react';

import { type DbPinnedQuery, PinnedQueryFormSchema } from '@/types/index';
import { convertErrorZodResultToMsgArray, cnJoin, cn } from '@/utils/formatting';
import { updatePinnedQuery } from '@/server-actions';
import Checkbox from '@/components/[design-system]/checkbox';

type QueryFormEditProps = {
  query: DbPinnedQuery;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function QueryFormEdit({ query, setIsOpen }: QueryFormEditProps) {
  const [ errorMessages, setErrorMessages ] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const formData = new FormData(e.currentTarget);
    const formDataObject = Object.fromEntries(formData.entries());
    const result = PinnedQueryFormSchema.safeParse(formDataObject);

    if (!result.success) {
      setErrorMessages(convertErrorZodResultToMsgArray(result));

    } else {
      setErrorMessages([]);

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
    <form onSubmit={handleSubmit} className={twForm} autoComplete="off">
      <h1 className={twTitle}>Edit Current Pinned Query</h1>
      <p className={twDescription}>Update pinned query data</p>

      <div className={twInputSection}>
        <label htmlFor="label" className={twLabel}>Label</label>
        <input
          className={twInput}
          name="label"
          id="label"
          type="text"
          placeholder="Label text"
          defaultValue={query.label}
        />
      </div>

      <div className={twInputSection}>
        <label htmlFor="query" className={twLabel}>Query</label>
        <input
          className={twInput}
          name="query"
          id="query"
          type="text"
          placeholder="Search text"
          defaultValue={query.query}
        />
      </div>

      <div className={cn(twInputSection, 'pl-[71px] mt-[-10px]')}>
        <Checkbox nameAndId="isTagOnlySearch" isChecked={query.isTagOnlySearch}>
          Search in tags only
        </Checkbox>
      </div>

      <div className={twInputSection}>
        <label htmlFor="info" className={twTextAreaLabel}>Info</label>
        <textarea
          className={twTextArea}
          name="info"
          id="info"
          placeholder="Notes or description"
          defaultValue={query.info || ''}
        />
      </div>

      <div className={twInputSection}>
        <label htmlFor="priority" className={twLabel}>Priority</label>
        <input
          className={twInput}
          name="priority"
          id="priority"
          type="text"
          placeholder="Set priority in display order from 0 to 100, default (empty) is 10"
          defaultValue={query.priority}
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
  'pt-[1px] w-20',
  'text-sm font-medium leading-none'
);

const twInput = cnJoin(
  'w-full h-10 px-3 py-2 flex',
  'bg-white outline-none rounded ring-1 ring-neutral-200 ',
  'text-sm placeholder:text-neutral-500',
  'focus-visible:ring-2 focus-visible:ring-neutral-700'
);

const twTextAreaLabel = cnJoin(
  'pt-[11px] w-20 self-start',
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