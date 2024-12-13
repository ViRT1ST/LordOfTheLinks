'use client';

import { type DbPinnedQuery } from '@/types/index';
import { deletePinnedQuery } from '@/server-actions';
import { cnJoin } from '@/utils/formatting';

type QueryFormDeleteProps = {
  query: DbPinnedQuery;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function QueryFormDelete({ query, setIsOpen }: QueryFormDeleteProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await deletePinnedQuery(query.id);
    setIsOpen(false);
  };

  return (
    <form onSubmit={handleSubmit} className={twForm} autoComplete="off">
      <h1 className={twTitle}>Delete Pinned Query</h1>
      <p className={twDescription}>Are you sure you want to delete this query?</p>

      <div className={twLinkTitle}>
        {query.label}
      </div>

      <div className={twButtonsAndErrorsArea}>
        <div>
        </div>
        <button type="submit" className={twSubmitButton}>
          Delete
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
  'text-sm text-neutral-500 mb-4'
);

const twLinkTitle = cnJoin(
  'mb-4'
);

const twButtonsAndErrorsArea = cnJoin(
  'mt-4 flex flex-row justify-between',
);

const twSubmitButton = cnJoin(
  'h-10 px-4 py-2 inline-flex items-center justify-center gap-2',
  'bg-neutral-900 rounded-md',
  'text-neutral-50 font-medium text-base'
);