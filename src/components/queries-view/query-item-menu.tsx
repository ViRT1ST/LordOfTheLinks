'use client';

import { cnJoin } from '@/utils/classes';
import { type DbPinnedQuery } from '@/types';

export default function QueryItemMenu() {

  const sort = () => {

  };

  return (
    <div className={twMenu}>

      <button className={twMenuItem} onClick={sort}>
        EDIT QUERY
      </button>

      <button className={twMenuItem} onClick={sort}>
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
