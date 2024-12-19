'use client';

import { useState } from 'react';

import { type DbSettings, DropdownItem, LinkFormSchema, SelectItem } from '@/types/index';
import { updateLink } from '@/server-actions';
import { convertErrorZodResultToMsgArray, cnJoin } from '@/utils/formatting';
import Select from '@/components/[design-system]/forms/select';

type SettingsFormProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  settings: DbSettings | null;
};

const sortByPriorityFirstItems: Array<SelectItem> = [
  { label: 'true', value: 'true' },
  { label: 'false', value: 'false' },
];

export default function SettingsForm({ setIsOpen, settings }: SettingsFormProps) {
  const [ errorMessages, setErrorMessages ] = useState<string[]>([]);




  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const formData = new FormData(e.currentTarget);
    const formDataObject = Object.fromEntries(formData.entries());
    const result = LinkFormSchema.safeParse(formDataObject);
    console.log(formDataObject);

    if (!result.success) {
      // setErrorMessages(convertErrorZodResultToMsgArray(result));

    } else {
      setErrorMessages([]);

      //setIsFetchingLinkData(true);
      // await updateLink({
      //   id: link.id,
      //   url: result.data.url,
      //   title: result.data.title,
      //   info: result.data.info,
      //   tags: result.data.tags,
      //   priority: result.data.priority
      // });
      //setIsFetchingLinkData(false);

      setIsOpen(false);
    }
  };

  if (settings === null) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit} className={twForm} autoComplete="off">
      <h1 className={twTitle}>Edit Settings</h1>
      <p className={twDescription}>Update settings data</p>

      <div className={twInputSection}>
        <label htmlFor="linksPerPage" className={twLabel}>
          Links per page
        </label>
        <input
          className={twInput}
          name="linksPerPage"
          id="linksPerPage"
          type="text"
          placeholder="Any number larger than 0"
          defaultValue={settings.linksPerPage}
        />
      </div>

      <div className={twInputSection}>
        <label htmlFor="sortLinksByPriorityFirst" className={twLabel}>
          Sort links by priority first
        </label>

        <Select
          items={sortByPriorityFirstItems}
          defaultValue={String(settings.sortLinksByPriorityFirst)}
          idAndName="sortLinksByPriorityFirst"
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
  'z-50 w-[600px] p-6 flex flex-col gap-y-2',
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
  'pt-[1px] w-[280px]',
  'text-sm leading-none font-inter font-medium leading-tight'
);

const twInput = cnJoin(
  'h-10 px-3 py-2 flex flex-grow',
  'bg-white outline-none rounded ring-1 ring-neutral-200 ',
  'text-sm placeholder:text-neutral-500',
  'focus-visible:ring-2 focus-visible:ring-neutral-700 font-inter'
);

const twTextAreaLabel = cnJoin(
  'pt-[11px] w-20 self-start ',
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
  'text-neutral-50 font-medium text-sm font-inter'
);


const twButton = cnJoin(`
  w-full h-10 px-4 py-2 flex-grow flex text-sm  font-inter font-normal
  justify-center items-center gap-2
  border text-black/90 rounded-md 
  whitespace-nowrap
  bg-transparent border-black/10
  hover:border-black/15 hover:text-black
  focus:border-black/15 focus:text-black
`);
