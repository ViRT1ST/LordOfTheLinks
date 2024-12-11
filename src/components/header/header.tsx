'use client';

import { useEffect } from 'react';
import Link from 'next/link';

import { cnJoin } from '@/utils/formatting';
import { useStore } from '@/store/useStore';
import { getSettings } from '@/server-actions';
import FormSearch from '@/components/header/form-search';

export default function Header() {
  const setCurrentModalWindow = useStore((state) => state.setCurrentModalWindow);
  const setCurrentSettings = useStore((state) => state.setCurrentSettings);
  const currentSettings = useStore((state) => state.currentSettings);

  useEffect(() => { 
    const runOnce = async () => {
      const settings = await getSettings();
      setCurrentSettings(settings);
    };

    if (!currentSettings) {
      runOnce();
    }
  }, []);

  return (
    <header className={twHeader}>
      {/* <div className={twHeaderLimiter}> */}

        <div className={twContainerLeft}>
          <Link className={twButton} href="/?v=links">
            All Links
          </Link>
          <Link className={twButton} href="/?v=queries">
            Pinned Queries
          </Link>
        </div>

        <div className={twContainerMiddle}>
          <FormSearch />
        </div>

        <div className={twContainerRight}>
          <button className={twButton} onClick={() => setCurrentModalWindow('link-create')}>
            Add New Link
          </button>
          <button className={twButton} onClick={() => {}}>
            Settings
          </button>
        </div>

      {/* </div> */}
    </header>
  );
}

const twHeader = cnJoin(
  'z-10 fixed top-0 left-0 px-5 h-14 w-full flex justify-center',
  // 'bg-[#cfcecd]',
  // 'bg-[#dad7d7]',
  'bg-white/50',
);

// const twHeaderLimiter = cnJoin(
//   'w-[1320px] px-5 flex flex-row', // w-[1200px] w-full
  
// );

const twContainerLeft = cnJoin(
  'flex items-center gap-x-4' //px-5 
);

const twContainerMiddle = cnJoin(
  'flex items-center justify-center flex-grow',
  // '2xl:pr-12'
);

const twContainerRight = cnJoin(
  'flex items-center gap-x-4' //px-5 
);

const twButton = cnJoin(
  'h-8 py-2 px-4 inline-flex justify-center items-center gap-2',
  'bg-transparent border border-black/10 text-black/60 rounded-md',
  'text-sm font-medium whitespace-nowrap transition-all',
  'hover:text-black hover:border-black/15', 

  // bg-based on flowers backround
  'bg-[#f4f4f4]'
);
