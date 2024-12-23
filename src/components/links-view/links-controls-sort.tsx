'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import type {
  SortingOrderVariants,
  DropdownItem,
  DropdownItemsDivider
} from '@/types';

import { cnJoin } from '@/utils/formatting';
import { saveSettings } from '@/server-actions';
import Dropdown from '@/components/[design-system]/dropdown';

type LinksControlsSortProps = {
  buttonLabel: string;
};

export default function LinksControlsSort({ buttonLabel }: LinksControlsSortProps) {
  const [ isDropdownOpen, setIsDropdownOpen ] = useState(false);

  const router = useRouter();

  const sort = async (sorting: SortingOrderVariants) => {
    await saveSettings({ sortLinksBy: sorting });
    router.refresh();
  };

  const items: Array<DropdownItem | DropdownItemsDivider> = [
    { label: 'Sort by date ASC', invokeOnClick: () => sort('date-asc') },
    { label: 'Sort by title ASC', invokeOnClick: () => sort('title-asc') },
    { label: 'Sort by domain ASC', invokeOnClick: () => sort('domain-asc') },
    'divider',
    { label: 'Sort by date DESC', invokeOnClick: () => sort('date-desc') },
    { label: 'Sort by title DESC', invokeOnClick: () => sort('title-desc') },
    { label: 'Sort by domain DESC', invokeOnClick: () => sort('domain-desc') }
  ];

  return (
    <div className={twContainer}>
      <button type="button" className={twButton} onClick={() => setIsDropdownOpen((prev) => !prev)}>
        {buttonLabel}
      </button>

      {isDropdownOpen && (
        <Dropdown
          setIsOpen={setIsDropdownOpen}
          items={items}
          classNames="w-[200px] mt-[1px]"
        />
      )}
    </div>
  );
}

const twContainer = cnJoin(`
  flex flex-col
`);

const twButton = cnJoin(`
  h-6 py-2 px-2 inline-flex justify-center items-center gap-2
  text-xs font-medium whitespace-nowrap
  bg-transparent border-black/10 text-black/70 rounded-md border
  hover:border-black/15 hover:text-black
  focus:border-black/15 focus:text-black
`);
