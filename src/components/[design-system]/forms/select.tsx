import { useState } from 'react';

import type { SelectItem } from '@/types';
import Dropdown from '@/components/[design-system]/dropdown';
import { cnJoin } from '@/utils/formatting';

type SelectProps = {
  items: Array<SelectItem>;
  defaultValue: string;
  idAndName?: string;
};

export default function Select({ items, defaultValue, idAndName }: SelectProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [currentLabel, setCurrentLabel] = useState(() => {
    const item = items.find((item) => item.value === defaultValue);
    return item?.label || 'error';
  });

  const [currentValue, setCurrentValue] = useState(() => {
    const item = items.find((item) => item.value === defaultValue);
    return item?.value || 'error';
  });

  const itemsForDropdown = items.map((item) => ({
    label: item.label,
    invokeOnClick: () => {
      setCurrentLabel(item.label);
      setCurrentValue(item.value);
      setIsDropdownOpen(false);
    },
  }));

  return (
    <>
      <input type="hidden" id={idAndName} name={idAndName} value={currentValue} />
      <Dropdown
        isOpen={isDropdownOpen}
        setIsOpen={setIsDropdownOpen}
        items={itemsForDropdown}
        classNames="w-[200px] mt-[41px]"
        trigger={(
          <button type="button" className={twButton}>
            {currentLabel.toUpperCase()}
          </button>
        )}
      />
    </>
  );
}


const twButton = cnJoin(`
  w-[200px] h-10 px-4 py-2 flex-grow flex text-sm  font-inter font-normal
  items-center gap-2
  border text-black/90 rounded-md 
  whitespace-nowrap
  bg-transparent border-black/10
  hover:border-black/15 hover:text-black
  focus:border-black/15 focus:text-black
`);
