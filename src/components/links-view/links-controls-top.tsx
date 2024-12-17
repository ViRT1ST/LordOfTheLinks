'use client';

import type { SortingOrderVariants } from '@/types';
import { cnJoin, getSortingMenuDropdownLabel } from '@/utils/formatting';
import LinksControlsSort from '@/components/links-view/links-controls-sort';

type LinksControlsTopProps = {
  totalCount: number;
  sortedBy: SortingOrderVariants;
};

export default function LinksControlsTop({ totalCount, sortedBy }: LinksControlsTopProps) {
  const dropdownLabel = getSortingMenuDropdownLabel(sortedBy) || '';

  return (
    <div className={twContainer}>
      <div className={twSection}>
        <span className={twInfo}>TOTAL LINKS FOUND: {totalCount}</span>
      </div>
      
      <div className={twSection}>
        <LinksControlsSort buttonLabel={dropdownLabel} />
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
  'text-xs text-black/70 font-inter',
);


