'use client';

import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

import { type SortingOrderVariants} from '@/types';
import { useStore } from '@/store/useStore';
import { cnJoin, getSortingMenuDropdownLabel, getUpdatedSearchParams } from '@/utils/formatting';
import { getSettings, setSortingInSettings } from '@/server-actions';


export default function LinksControlsSorting() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const resetModalWindowStates = useStore((state) => state.resetModalWindowStates);
  const setSettingsFromDb = useStore((state) => state.setSettingsFromDb);
  const settingsFromDb = useStore((state) => state.settingsFromDb);

  const sortingFromDb = settingsFromDb?.sortLinksBy || null;
  const sortingMenuDropdownLabel = getSortingMenuDropdownLabel(sortingFromDb);

  const handleMenuDropdownClick = () => {
    resetModalWindowStates();
  };

  const handleMenuItemClick = async (sorting: SortingOrderVariants) => {
    const newParams = getUpdatedSearchParams(searchParams, 'sort', sorting);

    await setSortingInSettings(sorting);
    const settings = await getSettings();
    setSettingsFromDb(settings);

    resetModalWindowStates();
    router.push(`/?${newParams}`);
  };

  return (
    <div className={twMenu}>
      <button className={twCurrentSortingButton} onClick={handleMenuDropdownClick}>
        {sortingMenuDropdownLabel}
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
