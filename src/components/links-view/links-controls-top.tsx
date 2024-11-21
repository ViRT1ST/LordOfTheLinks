'use client';

import { useStore } from '@/store/useStore';
import { cnJoin } from '@/utils/classes';

type LinksControlsTopProps = {
  totalCount: number;
};

export default function LinksControlsTop({ totalCount }: LinksControlsTopProps) {
  const setCurrentModalWindow = useStore((state) => state.setCurrentModalWindow);
  const setCurrentModalWindowPos = useStore((state) => state.setCurrentModalWindowPos);

  const menuOffsetTop = 9;
  const menuOffsetRight = 9;

  const handleButtonClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const reactCssPosStyles = {
      top: `${rect.top - menuOffsetTop}px`,
      right: `${window.innerWidth - rect.right - menuOffsetRight}px`,
    }
    
    setCurrentModalWindowPos(reactCssPosStyles);
    setCurrentModalWindow('links-sorting-menu');
  };

  return (
    <div className={twContainer}>
      <div className={twSection}>
        <span className={twInfo}>TOTAL LINKS FOUND: {totalCount}</span>
      </div>

      <div className={twSection}>
        <button className={twButton} onClick={handleButtonClick}>
          SORTED BY DOMAIN DESC
        </button>
      </div>
    </div>
  );
}

const twContainer = cnJoin(
  'flex flex-row justify-between items-center mt-4 mb-4',
  'font-medium font-geistsans'
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
