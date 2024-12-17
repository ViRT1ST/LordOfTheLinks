import { useState, useRef, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

import type { DropdownItem, DropdownItemsDivider } from '@/types';
import { cnJoin, cn } from '@/utils/formatting';
import useOutsideClick from '@/hooks/useOutsideClick';
import useKeyDown from '@/hooks/useKeyDown';

type DropdownProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  items: Array<DropdownItem | DropdownItemsDivider>;
  trigger?: JSX.Element;
  classNames?: string;
};

export default function Dropdown({
  items, trigger, classNames, isOpen, setIsOpen
}: DropdownProps) {

  const dropdownRef = useRef<HTMLDivElement>(null);
  useOutsideClick(dropdownRef, isOpen, setIsOpen);
  const isEscPressed = useKeyDown('Escape');

  useEffect(() => {
    if (isEscPressed) {
      setIsOpen(false);
    }
  }, [isEscPressed]);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleItemClick = (item: DropdownItem) => {
    toggleDropdown();
    item.invokeOnClick();
  };

  return (
    <div className={cn(twDropdown)} ref={dropdownRef}>
      {trigger && (
        <div onClick={toggleDropdown}>
          {trigger}
        </div>
      )}

      <div className={cn(twItemsDefault, classNames, isOpen && twItemsVisible)}>
        {items.map((item: DropdownItem | DropdownItemsDivider, index) => (
          typeof item === 'string' ? (
            <div key={index + item} className={twDividerContainer}>
              <hr className={twDivider} />
            </div>
          ) : (
            <div key={index + item.label} className={twItemContainer}>
              <button className={twItemButton} onClick={() => handleItemClick(item)}>
                <span className={twItemIcon}>
                  <ChevronRight size={16} strokeWidth={2} /> 
                </span>
                {item.label}
              </button>
            </div>
          )
        ))}
      </div>
    </div>
  );
}

const twDropdown = cnJoin(`
  relative
  font-medium font-geistsans text-xs
`);

const twItemsDefault = cnJoin(`
  z-10 absolute top-0 left-0 px-3 py-3 
  bg-[#fbfbfb] border-black/35 rounded-md border
  transition transform opacity-0 scale-95 duration-75
  pointer-events-none
  invisible 
`);

const twItemsVisible = cnJoin(`
  scale-100 opacity-100
  visible pointer-events-auto
`);

const twItemContainer = cnJoin(`
  group flex flex-row w-full
`);

const twItemIcon = cnJoin(`
  pr-1.5 -mt-[0.5px]
  text-black/70 transition-opacity
  invisible group-hover:visible 
`);

const twItemButton = cnJoin(`
  w-full h-7 py-2 flex items-center
  text-black uppercase font-inter
`);

const twDividerContainer = cnJoin(`
  w-full py-[8px] px-[4px]
`);

const twDivider = cnJoin(`
  w-full border-black/10 
`);


