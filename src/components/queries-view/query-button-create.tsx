'use client';

import { Plus } from 'lucide-react';

import { cnJoin } from '@/utils/formatting';
import { useStore } from '@/store/useStore';

export default function QueryButtonCreate() {
  const setCurrentModalWindow = useStore((state) => state.setCurrentModalWindow);

  return (
    <button className={twButton} onClick={() => setCurrentModalWindow('query-create')}>
      <Plus />
    </button>
  );
}

const twButton = cnJoin(
  'absolute right-[42px] top-[100px]',

  'text-black rounded-full trasnsition-all duration-150 ',
  'h-12 w-12 flex items-center justify-center',

  'bg-[#e4e4e4] text-neutral-600 border border-black/10',
  'hover:bg-[#f4f4f4] hover:text-neutral-800 hover:border-black/20',
);

