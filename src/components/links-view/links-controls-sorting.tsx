'use client';

import { useRouter } from 'next/navigation';

import { type SortingOrderVariants} from '@/types';
import { cnJoin, getSortingMenuDropdownLabel } from '@/utils/formatting';
import { getSettings, saveSettings } from '@/server-actions';
import { useStore } from '@/store/useStore';

export default function LinksControlsSorting() {
  const router = useRouter();

  const resetModalWindowStates = useStore((state) => state.resetModalWindowStates);
  const setCurrentSettings = useStore((state) => state.setCurrentSettings);
  const currentSettings = useStore((state) => state.currentSettings);

  const currentSorting = currentSettings?.sortLinksBy || null;
  const dropdownLabel = getSortingMenuDropdownLabel(currentSorting);

  const handleMenuDropdownClick = () => {
    resetModalWindowStates();
  };

  const handleMenuItemClick = async (sorting: SortingOrderVariants) => {
    await saveSettings({ sortLinksBy: sorting });
    const settings = await getSettings();
    setCurrentSettings(settings);

    resetModalWindowStates();
    router.refresh();
  };

  return (
    <div className={twMenu}>
      <button className={twCurrentSortingButton} onClick={handleMenuDropdownClick}>
        {dropdownLabel}
      </button>

      <div className={twMenuItemsContainer}>
        <button className={twMenuItem} onClick={() => handleMenuItemClick('date-asc')}>
          SORT BY DATE ASC
        </button>
        <button className={twMenuItem} onClick={() => handleMenuItemClick('title-asc')}>
          SORT BY TITLE ASC
        </button>
        <button className={twMenuItem} onClick={() => handleMenuItemClick('domain-asc')}>
          SORT BY DOMAIN ASC
        </button>
        
        <hr className={twMenuDivider} />
        
        <button className={twMenuItem} onClick={() => handleMenuItemClick('date-desc')}>
          SORT BY DATE DESC
        </button>
        <button className={twMenuItem} onClick={() => handleMenuItemClick('title-desc')}>
          SORT BY TITLE DESC
        </button>
        <button className={twMenuItem} onClick={() => handleMenuItemClick('domain-desc')}>
          SORT BY DOMAIN DESC
        </button>
      </div>
    </div>
  );
}

const twMenu = cnJoin(
  'font-geistsans',
  'z-20 w-[200px] p-2 rounded-md border-black/10',
  'flex flex-col items-end',
  'border border-black/40',
  // 'bg-white/30 backdrop-blur-md',
  'bg-[#f9f9f9]'
);

const twCurrentSortingButton = cnJoin(
  'h-6 py-2 px-2 inline-flex justify-center items-center gap-2 mb-2',
  'bg-transparent border rounded-md',
  'font-medium whitespace-nowrap text-xs',
  'border-black/15 text-black'
);

const twMenuItemsContainer = cnJoin(
  'w-full flex flex-col px-[9px] justify-end items-end',
);

// hover: show arrow icon near text
const twMenuItem = cnJoin(
  'h-7 items-center ', //h-7 is 28px
  'text-sm font-medium whitespace-nowrap text-xs',
);

const twMenuDivider = cnJoin(
  'border-black/10 self-center w-full my-[6px]'
);
