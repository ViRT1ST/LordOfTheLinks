'use client';

import { type DbPinnedQuery } from '@/types';
import { useStore } from '@/store/useStore';
import { cnJoin } from '@/utils/classes';


export default function QueryItemMenu() {
  const setCurrentModalWindow = useStore((state) => state.setCurrentModalWindow);
  const resetModalWindowStates = useStore((state) => state.resetModalWindowStates);

  const handleEditButtonClick = () => {
    setCurrentModalWindow('query-update');
  };

  const handleDeleteButtonClick = () => {
    setCurrentModalWindow('query-delete');
  };

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    resetModalWindowStates();
  };

  return (
    <div className={twMenu} onContextMenu={handleRightClick}>

      <button className={twMenuItem} onClick={handleEditButtonClick}>
        EDIT QUERY
      </button>

      <button className={twMenuItem} onClick={handleDeleteButtonClick}>
        DELETE QUERY
      </button>
    </div>
  );
}

const twMenu = cnJoin(
  'font-geistsans',
  'z-20 w-[120px] py-2 px-3 rounded-md border-black/10',
  'flex flex-col items-end',
  'bg-white border border-black/40',
  'opacity-100',
);

// hover: show arrow icon near text
const twMenuItem = cnJoin(
  'h-7 items-center ', //h-7 is 28px
  'text-sm font-medium whitespace-nowrap text-xs',
);

const twMenuDivider = cnJoin(
  'border-black/10 self-center w-full my-[6px]'
);
