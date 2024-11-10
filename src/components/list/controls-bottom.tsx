import { ArrowLeft, ArrowRight, ChevronRight, ChevronLeft, StepBack } from 'lucide-react';

import { cnJoin } from '@/utils/classes';

export default function ControlsBottom() {
  return (
    <div className={twContainer}>

      <div className={twButtonGroup}>
        {/* <button className={twButton}>
          To First
        </button> */}
        <button className={twButton}>
          <ChevronLeft className={twIcon} />
        </button>
      </div>

      <div className={twPagesInfo}>Page 1 of 6</div>


      <div className={twButtonGroup}>
        <button className={twButton}>
          <ChevronRight className={twIcon} />
        </button>
        {/* <button className={twButton}>
          To Last
        </button> */}
      </div>

    </div>
  );
}


const twContainer = cnJoin(
  'h-14 w-full mt-2 flex flex-row items-center justify-center gap-x-6',
);

const twPagesInfo = cnJoin(
  'text-base font-medium whitespace-nowrap text-black/70 text-center',
  // 'min-w-32'
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
  'bg-transparent'
  //bg-white/30 
);