'use client';

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
    <Dropdown
      items={items}
      classNames="w-[200px] mt-[25px]"
      menuTrigger={(
        <button className={twButton}>
          {buttonLabel}
        </button>
      )}
    />
  );
}

const twButton = cnJoin(`
  h-6 py-2 px-2 inline-flex justify-center items-center gap-2
  border text-black/70 rounded-md
  whitespace-nowrap
  bg-transparent border-black/10
  hover:border-black/15 hover:text-black
  focus:border-black/15 focus:text-black
`);
