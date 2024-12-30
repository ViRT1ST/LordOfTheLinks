import { useState } from 'react';

import type { SelectItem } from '@/types';
import { cnJoin, cn } from '@/utils/formatting';
import Dropdown from '@/components/[design-system]/dropdown';

type SelectProps = {
  id?: string;
  name?: string;
  className?: string;
  items: Array<SelectItem>;
  defaultValue: string;
};

export default function Select({ id, name, className, items, defaultValue }: SelectProps) {
  const [ isDropdownOpen, setIsDropdownOpen ] = useState(false);
  
  const [ currentLabel, setCurrentLabel ] = useState(() => {
    const item = items.find((item) => item.value === defaultValue);
    return item?.label || 'error';
  });

  const [ currentValue, setCurrentValue ] = useState(() => {
    const item = items.find((item) => item.value === defaultValue);
    return item?.value || 'error';
  });

  const dropdownItems = items.map((item) => ({
    label: item.label,
    invokeOnClick: () => {
      setCurrentLabel(item.label);  
      setCurrentValue(item.value);
      setIsDropdownOpen(false);
    },
  }));

  return (
    <div className={cn(twContainer, className)}>
      <button
        type="button"
        className={twButton}
        onClick={() => setIsDropdownOpen((prev) => !prev)}
      >
        {currentLabel}
      </button>

      {isDropdownOpen && (
        <Dropdown
          classNames="w-full mt-[3px] rounded ring-1 ring-[#d9d9d9] border-0"
          setIsOpen={setIsDropdownOpen}
          items={dropdownItems}
          isNormalFont={true}
        />
      )}

      <input type="hidden" id={id} name={name} value={currentValue} />
    </div>
  );
}

const twContainer = cnJoin(`
  flex flex-col
`);

const twButton = cnJoin(`
  h-10 px-3 py-2
  flex items-center flex-grow
  text-black text-sm font-normal whitespace-nowrap
  ring-black/10 ring-1 rounded bg-transparent
  hover:ring-black/15
  focus:ring-black/15
`);
