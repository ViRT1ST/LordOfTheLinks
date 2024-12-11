'use client';

import { type SortingOrderVariants } from '@/types';
import { cnJoin, getSortingMenuDropdownLabel } from '@/utils/formatting';
import { useStore } from '@/store/useStore';

type LinksControlsTopProps = {
  totalCount: number;
  sortedBy: SortingOrderVariants;
};

export default function LinksControlsTop({ totalCount, sortedBy }: LinksControlsTopProps) {
  const setCurrentModalWindow = useStore((state) => state.setCurrentModalWindow);
  const setCurrentModalWindowPos = useStore((state) => state.setCurrentModalWindowPos);

  const dropdownLabel = getSortingMenuDropdownLabel(sortedBy);

  const handleButtonClick = (e: React.MouseEvent) => {
    const menuOffsetTop = 9;
    const menuOffsetRight = 9;

    const rect = e.currentTarget.getBoundingClientRect();
    const cssPosProps: React.CSSProperties = {
      top: `${rect.top - menuOffsetTop}px`,
      right: `${window.innerWidth - rect.right - menuOffsetRight}px`,
    };
    
    setCurrentModalWindowPos(cssPosProps);
    setCurrentModalWindow('links-sorting-menu');
  };

  return (
    <div className={twContainer}>
      <div className={twSection}>
        <span className={twInfo}>
          TOTAL LINKS FOUND: {totalCount}
        </span>
      </div>

      <div className={twSection}>
        <button className={twButton} onClick={handleButtonClick}>
          {dropdownLabel}
        </button>
      </div>
    </div>
  );
}

const twContainer = cnJoin(
  'flex flex-row justify-between items-center mt-4 mb-4',
  'font-medium font-geistsans',
  'h-[24px]'
);

const twSection = cnJoin(
  'flex flex-row justify-between items-center gap-x-2 text-xs', 
);

const twInfo = cnJoin(
  'text-xs text-black/70',
);

const twButton = cnJoin(
  'z-30 h-6 py-2 px-2 inline-flex justify-center items-center gap-2',
  'bg-transparent border border-black/10 text-black/70 rounded-md',
  'font-medium whitespace-nowrap text-xs',
  // 'hover:text-black focus:text-black',
  'hover:text-black hover:border-black/15',
  'focus:text-black focus:border-black/15',
);
