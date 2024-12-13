import { useState, useRef } from 'react';
import { ChevronRight } from 'lucide-react';

import type { DropdownItem, DropdownItemsDivider } from '@/types';
import { cnJoin, cn } from '@/utils/formatting';
import useOutsideClick from '@/hooks/useOutsideClick';



type DropdownProps = {
  items: Array<DropdownItem | DropdownItemsDivider>;
  defaultTriggerLabel: string;
};

export default function Dropdown({ items, defaultTriggerLabel }: DropdownProps) {
  const [ isOpen, setIsOpen ] = useState(false);
  const [ triggerLabel, setTriggerLabel ] = useState(defaultTriggerLabel);

  const dropdownRef = useRef<HTMLDivElement>(null);
  useOutsideClick(dropdownRef, isOpen, setIsOpen);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleItemClick = (item: DropdownItem) => {
    setTriggerLabel(item.labelSelected);
    toggleDropdown();
    item.invokeOnClick();
  };

  return (
    <div className={cn(twDropdown)} ref={dropdownRef} >
      <button className={twTrigger} onClick={toggleDropdown}>
        {triggerLabel}
      </button>

      {isOpen && (
        <div className={twItems}>
          {items.map((item: DropdownItem | DropdownItemsDivider, index) => {
            return typeof item === 'string' ? (
              <div key={index + item} className={twDividerContainer}>
                <hr className={twDivider} />
              </div>
            ) : (
              <div key={index + item.labelUnselected} className={twItemContainer}>
                <span className={twItemIcon}>
                  <ChevronRight size={16} strokeWidth={2} /> 
                </span>
                <button className={twItemButton} onClick={() => handleItemClick(item)}>
                  {item.labelUnselected}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

const twDropdown = cnJoin(`
  z-10 relative
  font-medium font-geistsans text-xs
`);

const twTrigger = cnJoin(`
  h-6 py-2 px-2 inline-flex justify-center items-center gap-2
  border text-black/70 rounded-md
  whitespace-nowrap
  bg-transparent border-black/10
  hover:border-black/15 hover:text-black
  focus:border-black/15 focus:text-black
`);

const twItems = cnJoin(`
  absolute top-0 left-0 w-[212px] mt-[25px] px-3 py-3 
  bg-[#fbfbfb] border-black/35 rounded-md border 
`);

const twItemContainer = cnJoin(`
  group flex flex-row w-full
`);

const twItemIcon = cnJoin(`
  pr-1.5 pt-[5.5px] invisible group-hover:visible text-black transition-opacity
`);

const twItemButton = cnJoin(`
  w-full h-7 py-2 inline-flex items-center
  text-black uppercase 
`);

const twDividerContainer = cnJoin(`
  w-full py-[8px] px-[4px]
`);

const twDivider = cnJoin(`
  w-full border-black/10 
`);


