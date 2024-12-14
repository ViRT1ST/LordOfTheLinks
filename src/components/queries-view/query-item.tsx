'use client';

import Link from 'next/link';

import { type DbPinnedQuery } from '@/types';
import { cnJoin } from '@/utils/formatting';
import { useState } from 'react';
import QueryItemMenu from '@/components/queries-view/query-item-menu';

type QueryItemProps = {
  query: DbPinnedQuery;
};

export default function QueryItem({ query }: QueryItemProps) {
  const [ isContextMenuOpen, setIsContextMenuOpen ] = useState(false);

  const correctedQuery = query.query.replaceAll(' ', '+');

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsContextMenuOpen((prev) => !prev);
  };

  return (
    <>
      <Link
        className={twLink}
        href={`/?q=${correctedQuery}`}
        onContextMenu={handleRightClick}
      >
        {query.label}
      </Link>

      <QueryItemMenu
        query={query}
        isContextMenuOpen={isContextMenuOpen}
        setIsContextMenuOpen={setIsContextMenuOpen}
      />
    </>
  );
}

const twLink = cnJoin(
  'h-8 inline-flex rounded-md border border-black/20 px-4 pt-[1px] ',
  'justify-center items-center',
  ' text-sm font-medium text-black/70',
  'font-rubik transition-all',

  // bg-white/40
  // bg-based on flowers backround
  'bg-[#f4f4f4]',
  'hover:text-black/90'
);

