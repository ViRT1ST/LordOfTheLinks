import { useState, useRef, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

import type { DropdownItem, DropdownItemsDivider } from '@/types';
import { cnJoin, cn } from '@/utils/formatting';
import useOutsideClick from '@/hooks/useOutsideClick';
import useKeyDown from '@/hooks/useKeyDown';

type DropdownProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  items: Array<DropdownItem | DropdownItemsDivider>;
  classNames?: string;
};

export default function Dropdown({ items, classNames, setIsOpen }: DropdownProps) {
  const [ isRendered, setIsRendered ] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const isOutsideClicked = useOutsideClick(dropdownRef);
  const isEscPressed = useKeyDown('Escape');

  useEffect(() => {
    if (!isRendered) {
      setTimeout(() => setIsRendered(true));
    }
  }, [dropdownRef.current]);

  useEffect(() => {
    if (isEscPressed || isOutsideClicked) {
      setIsOpen(false);
    }
  }, [isEscPressed, isOutsideClicked]);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleItemClick = (item: DropdownItem) => {
    toggleDropdown();
    item.invokeOnClick();
  };

  return (
    <div className={cn(twDropdown)} ref={dropdownRef}>
      <div className={cn(twItemsHidden, isRendered && twItemsVisible, classNames)}>
        {items.map((item: DropdownItem | DropdownItemsDivider, index) => (
          typeof item === 'string' ? (
            <div key={index + item} className={twDividerContainer}>
              <hr className={twDivider} />
            </div>
          ) : (
            <div key={index + item.label} className={twItemContainer}>
              <button
                type="button"
                className={twItemButton}
                onClick={() => handleItemClick(item)}
              >
                <span className={twItemIcon}>
                  <ChevronRight size={16} strokeWidth={2} /> 
                </span>
                <span>
                  {item.label}
                </span>
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

// bg-[#fbfbfb]
const twItemsHidden = cnJoin(`
  z-10 absolute top-0 left-0 px-3 py-3 
  border-black/35 bg-white rounded-md border
  transition transform opacity-0 scale-95 duration-75
  pointer-events-none
  invisible
`);

const twItemsVisible = cnJoin(`
  scale-100 opacity-100
  pointer-events-auto
  visible
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
  text-black font-inter uppercase
`);

const twDividerContainer = cnJoin(`
  w-full py-[8px] px-[4px]
`);

const twDivider = cnJoin(`
  w-full border-black/10 
`);


