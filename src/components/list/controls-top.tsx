'use client';

import { useEffect, useRef, useState } from 'react';

import { cnJoin } from '@/utils/classes';
import { useStore } from '@/store/useStore';
import ModalWindow from '@/components/common/modal-window';
import SortingMenu from '@/components/list/sorting-menu';

type ControlsTopProps = {
  totalCount: number;
};

type ButtonCoords = {
  top: number;
  left: number;
  right: number;
  bottom: number;
} | null

export default function ControlsTop({ totalCount }: ControlsTopProps) {
  const [ isDropdownOpen, setIsDropdownOpen ] = useState(false);
  const [ dropdownCoords, setDropdownCoords ] = useState<ButtonCoords>(null);

  const offsetTop = 9;
  const offsetRight = 9;

  const handleButtonClick = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();

    setDropdownCoords({
      top: rect.top,
      left: rect.left,
      right: window.innerWidth - rect.right,
      bottom: window.innerHeight - rect.top
    });

    console.log(dropdownCoords);
    setIsDropdownOpen((prev) => !prev);
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

      <ModalWindow
        content={<SortingMenu setIsShowing={setIsDropdownOpen} />}
        isOpen={isDropdownOpen}
        setIsOpen={setIsDropdownOpen}
        isOverlayClickDoClose={true}
        isOverlayDarkened={false}
        isCloseButtonVisible={false}
        top={dropdownCoords?.top ? dropdownCoords.top - offsetTop : null}
        right={dropdownCoords?.right ? dropdownCoords.right - offsetRight : null}
      />
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
