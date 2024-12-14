'use client';

import { Ellipsis } from 'lucide-react';

import { DropdownItem, type DbLinkWithTags } from '@/types/index';
import { cnJoin } from '@/utils/formatting';
import { useStore } from '@/store/useStore';
import Dropdown from '@/components/[design-system]/dropdown';

type LinkItemMenuProps = {
  link: DbLinkWithTags;
};

export default function LinkItemMenu({ link }: LinkItemMenuProps) {
  const setCurrentModalWindow = useStore((state) => state.setCurrentModalWindow);
  const setCurrentLinkData = useStore((state) => state.setCurrentLinkData);

  const handleEditButtonClick = () => {
    setCurrentLinkData(link);
    setCurrentModalWindow('link-update');
  };

  const handleDeleteButtonClick = () => {
    setCurrentLinkData(link);
    setCurrentModalWindow('link-delete');
  };

  const items: Array<DropdownItem> = [
    { label: 'EDIT', invokeOnClick: () => handleEditButtonClick() },
    { label: 'DELETE', invokeOnClick: () => handleDeleteButtonClick() }
  ];

  return (
    <Dropdown
      items={items}
      classNames="w-[110px] mt-[30px] ml-[-40px]"
      menuTrigger={(
        <button className={twMenuTrigger}>
          <Ellipsis className={twMenuTriggerIcon} />
        </button>
      )}
    />
  );
}

const twMenuTrigger = cnJoin(
  'px-3 py-2 opacity-30 transition-all',
  'hover:opacity-60',
);
const twMenuTriggerIcon = cnJoin(
  'h-6 w-6',
);
