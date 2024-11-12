'use client';

import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

import { cnJoin } from '@/utils/classes';

type ControlsBottomProps = {
  prevPage: number | null;
  nextPage: number | null;
  currentPage: number;
  lastPage: number;
};

export default function ControlsBottom({
  prevPage,
  nextPage,
  currentPage,
  lastPage,
}: ControlsBottomProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const allParamsString = searchParams.toString();
  
  const handleChangePage = (page: number | null) => {
    if (page === null) {
      return;
    };

    const newParams = searchParams.has('page')
      ? allParamsString.replace(/page=[0-9]+/, `page=${page}`)
      : `${allParamsString}&page=${page}`;

    router.push(`/?${newParams}`);
  };

  return (
    <div className={twContainer}>

      <div className={twButtonGroup}>
        <button
          className={twButton}
          onClick={() => handleChangePage(prevPage)}
          disabled={prevPage === null}
        >
          <ChevronLeft className={twIcon} />
        </button>
      </div>

      <div className={twPagesInfo}>
        Page&nbsp;
          <span className={twPagesInfoMonoNumber}>{currentPage}</span>
        &nbsp;of&nbsp;
          <span className={twPagesInfoMonoNumber}>{lastPage}</span>
      </div>

      <div className={twButtonGroup}>
        <button
          className={twButton}
          onClick={() => handleChangePage(nextPage)}
          disabled={nextPage === null}
        >
          <ChevronRight className={twIcon} />
        </button>
      </div>

    </div>
  );
}

const twContainer = cnJoin(
  'h-14 w-full mt-2 flex flex-row items-center justify-center gap-x-6',
);

const twPagesInfo = cnJoin(
  'text-base font-medium whitespace-nowrap text-black/70 text-center',
  'min-w-24',
);

const twPagesInfoMonoNumber = cnJoin(
  'font-geistmono'
);

const twIcon = cnJoin(
  'w-8 h-8'
);

const twButtonGroup = cnJoin(
  'flex items-center justify-center gap-x-4'
);

const twButton = cnJoin(
  'h-10 py-2 px-4 inline-flex justify-center items-center gap-2',
  'border border-black/10 text-black/50 rounded-md',
  'text-sm font-medium whitespace-nowrap',
  'bg-transparent',
  'disabled:text-black/10'
  //bg-white/30 
);