'use client';

import { useState } from 'react';

import { FaCheck } from 'react-icons/fa';
import { cnJoin, cn } from '@/utils/formatting';

type Props = {
  name: string;
  checkedByDefault: boolean;
} & React.ComponentPropsWithoutRef<'div'>

export default function Checkbox({
  id,
  name,
  checkedByDefault,
  className,
  children,
  ...rest
}: Props) {
  const [ isChecked, setIsChecked] = useState(checkedByDefault);

  return (
    <div className={cn(twContainer, className)} {...rest}>
      <input
        type="checkbox"
        className={twCheckbox}
        id={id}
        name={name}
        checked={isChecked}
        onChange={() => setIsChecked((prev) => !prev)}
      />

      <label className={twLabel} htmlFor={name}>
        {children}
      </label>

      <FaCheck className={twIcon} />
    </div>
  );
}

const twContainer = cnJoin(`
  h-8 flex flex-row items-center
`);

const twCheckbox = cnJoin(`
  relative w-5 h-5
  border-0 rounded
  peer shrink-0 appearance-none
  c-input-ring
`);

const twLabel = cnJoin(
  'px-2 text-sm font-semibold text-black/90',
);

const twIcon = cnJoin(`
  absolute w-3 h-3 ml-1 mt-[1px]
  text-black pointer-events-none hidden
  peer-checked:block
`);
