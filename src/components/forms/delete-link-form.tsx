'use client';

import { type DbLinkWithTags } from '@/types/index';
import { deleteLink } from '@/server-actions';
import { cn } from '@/utils/classes';

type EditLinkFormProps = {
  link: DbLinkWithTags;
};

export default function DeleteLinkForm({ link }: EditLinkFormProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await deleteLink(link.id);
  };

  return (
    <form onSubmit={handleSubmit} className={twForm} autoComplete="off">
      <h1 className={twTitle}>Delete Link</h1>
      <p className={twDescription}>Are you sure you want to delete this link?</p>

      <div className={twInputSection}>
        <label htmlFor="url" className={twLabel}>URL</label>
        <input
          className={twInput}
          name="url"
          type="text"
          placeholder="https://example.com"
          defaultValue={link.url}
          disabled
        />
      </div>

      <div className={twInputSection}>
        <label htmlFor="title" className={twLabel}>Title</label>
        <input
          className={twInput}
          name="title"
          type="text"
          placeholder="Page title"
          defaultValue={link.title}
          disabled
        />
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
  'focus-visible:ring-2 focus-visible:ring-neutral-700',
  'disabled:bg-neutral-100'
);

const twButtonsAndErrorsArea = cn(
  'mt-4 flex flex-row justify-between',
);

const twSubmitButton = cn(
  'h-10 px-4 py-2 inline-flex items-center justify-center gap-2',
  'bg-neutral-900 rounded-md',
  'text-neutral-50 font-medium text-md'
);