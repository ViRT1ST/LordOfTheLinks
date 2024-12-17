'use client';

import { FaCheck } from 'react-icons/fa';
import { cnJoin } from '@/utils/formatting';

type Props = {
  children: React.ReactNode;
  nameAndId: string;
  isChecked: boolean;
  onCheckboxClick?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Checkbox({
  children,
  nameAndId,
  isChecked,
  onCheckboxClick
}: Props) {
  return (
    <div className={twContainer}>
      <input
        className={twInput}
        onChange={onCheckboxClick}
        type="checkbox"
        id={nameAndId}
        name={nameAndId}
        defaultChecked={isChecked}
      />

      <label className={twLabel} htmlFor={nameAndId}>
        {children}
      </label>

      <FaCheck className={twIcon} />
    </div>
  );
}

const twContainer = cnJoin(`
  h-8 flex flex-row items-center
`);

const twInput = cnJoin(`
  relative w-5 h-5
  bg-transparent
  peer shrink-0 appearance-none border-0 rounded

  bg-white outline-none rounded ring-1 ring-neutral-200
  text-sm placeholder:text-neutral-500
  focus-visible:ring-2 focus-visible:ring-neutral-700

  hover:ring-black/20
`);

const twLabel = cnJoin(`
  px-2 pt-0
  text-sm font-medium text-black/90
`);

const twIcon = cnJoin(`
  absolute w-3 h-3 ml-1 mt-[1px]
  text-black pointer-events-none hidden
  peer-checked:block
`);
