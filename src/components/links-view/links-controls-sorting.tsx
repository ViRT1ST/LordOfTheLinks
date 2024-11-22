'use client';

import { useStore } from '@/store/useStore';
import { cnJoin } from '@/utils/classes';

export default function LinksControlsSorting() {
  const resetModalWindowStates = useStore((state) => state.resetModalWindowStates);

  const handleDropdownClick = () => {
    resetModalWindowStates();
  };

  const sort = () => {
    resetModalWindowStates();
  };

  return (
    <div className={twMenu}>
      {/* <div> */}
        <button className={twCurrentSortingButton} onClick={handleDropdownClick}>
          SORTED BY DOMAIN DESC
        </button>
      {/* </div> */}

      <div className={twMenuItemsContainer}>
        <button className={twMenuItem} onClick={sort}>
          SORT BY DATE ASC
        </button>
        <button className={twMenuItem} onClick={sort}>
          SORT BY TITLE ASC
        </button>
        <button className={twMenuItem} onClick={sort}>
          SORT BY DOMAIN ASC
        </button>
        
        <hr className={twMenuDivider} />
        <button className={twMenuItem} onClick={sort}>
          SORT BY DATE DESC
        </button>
        <button className={twMenuItem} onClick={sort}>
          SORT BY TITLE DESC
        </button>
        <button className={twMenuItem} onClick={sort}>
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
  'bg-white border border-black/40',
  'opacity-100',
);

const twCurrentSortingButton = cnJoin(
  'h-6 py-2 px-2 inline-flex justify-center items-center gap-2 mb-2',
  'bg-transparent border  rounded-md',
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
