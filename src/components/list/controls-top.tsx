'use client';

import { useState } from 'react';

import { cnJoin } from '@/utils/classes';

type ControlsTopProps = {
  totalCount: number;
};

export default function ControlsTop({ totalCount }: ControlsTopProps) {
  const [ isDropdownOpen, setIsDropdownOpen ] = useState(false);

  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const sort = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className={twContainer}>

      <div className={twSection}>
        <span className={twInfo}>TOTAL LINKS FOUND: {totalCount}</span>
      </div>

      {/* {!isDropdownOpen && (<div className={twSection}>
        <button className={twButton} onClick={handleDropdownClick}>
          SORTED BY DOMAIN DESC
        </button>
      </div>)
      } */}

      <div className={twSection}>
        <button className={twButton} onClick={handleDropdownClick}>
          SORTED BY DOMAIN DESC
        </button>
      </div>

      {isDropdownOpen && (
        <div className={twDropdown}>
          <button className={twDropdownButton} onClick={sort}>
            SORT BY DATE ASC
          </button>
          <button className={twDropdownButton} onClick={sort}>
            SORT BY TITLE ASC
          </button>
          <button className={twDropdownButton} onClick={sort}>
            SORT BY DOMAIN ASC
          </button>
          <hr className={twDropdownDivider} />
          <button className={twDropdownButton} onClick={sort}>
            SORT BY DATE DESC
          </button>
          <button className={twDropdownButton} onClick={sort}>
            SORT BY TITLE DESC
          </button>
          <button className={twDropdownButton} onClick={sort}>
            SORT BY DOMAIN DESC
          </button>
        </div>
      )}
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
  'font-medium whitespace-nowrap text-xs transition-all',
  // 'hover:text-black focus:text-black',
  'hover:text-black hover:border-black/15',
  'focus:text-black focus:border-black/15'
);

const twDropdown = cnJoin(
  'z-20 w-[200px] absolute top-2 -right-2 p-2 pt-10 rounded-md border-black/10',
  'flex flex-col px-4',
  'bg-white border border-black/40',
);

// hover: show arrow icon near text
const twDropdownButton = cnJoin(
  'h-7 inline-flex justify-end items-center gap-x-2',
  'text-sm font-medium whitespace-nowrap text-xs',
);

const twDropdownDivider = cnJoin(
  'border-black/10  self-center w-full my-2'
);
