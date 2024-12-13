'use client';

import { useRouter } from 'next/navigation';

import type { SortingOrderVariants, DropdownItem, DropdownItemsDivider } from '@/types';
import { cnJoin, getSortingMenuDropdownLabel } from '@/utils/formatting';
import { saveSettings } from '@/server-actions';

import Dropdown from '@/components/[design-system]/dropdown';

type LinksControlsTopProps = {
  totalCount: number;
  sortedBy: SortingOrderVariants;
};

export default function LinksControlsTop({ totalCount, sortedBy }: LinksControlsTopProps) {
  const router = useRouter();

  const dropdownLabel = getSortingMenuDropdownLabel(sortedBy) || '';

  const doSorting = async (sorting: SortingOrderVariants) => {
    await saveSettings({ sortLinksBy: sorting });
    router.refresh();
  };

  const items: Array<DropdownItem | DropdownItemsDivider> = [
    {
      labelUnselected: 'Sort by date ASC',
      labelSelected: 'SORTED BY DATE ASC',
      invokeOnClick: async () => doSorting('date-asc')
    },
    {
      labelUnselected: 'Sort by title ASC',
      labelSelected: 'SORTED BY TITLE ASC',
      invokeOnClick: async () => doSorting('title-asc')
    },
    {
      labelUnselected: 'Sort by domain ASC',
      labelSelected: 'SORTED BY DOMAIN ASC',
      invokeOnClick: async () => doSorting('domain-asc')
    },
    'divider',
    {
      labelUnselected: 'Sort by date DESC',
      labelSelected: 'SORTED BY DATE DESC',
      invokeOnClick: async () => doSorting('date-desc')
    },
    {
      labelUnselected: 'Sort by title DESC',
      labelSelected: 'SORTED BY TITLE DESC',
      invokeOnClick: async () => doSorting('title-desc')
    },
    {
      labelUnselected: 'Sort by domain DESC',
      labelSelected: 'SORTED BY DOMAIN DESC',
      invokeOnClick: async () => doSorting('domain-desc')
    },
  ];

  return (
    <div className={twContainer}>
      <div className={twSection}>
        <span className={twInfo}>TOTAL LINKS FOUND: {totalCount}</span>
      </div>
      
      <div className={twSection}>
        <Dropdown items={items} defaultTriggerLabel={dropdownLabel} />
      </div>
    </div>
  );
}

const twContainer = cnJoin(
  'h-[24px] my-4 flex flex-row justify-between items-center',
  'font-medium font-geistsans',
);

const twSection = cnJoin(
  'relative flex flex-row justify-between items-center',
);

const twInfo = cnJoin(
  'text-xs text-black/70',
);


