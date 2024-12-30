'use client';

import { useState } from 'react';

import { type DbPinnedQuery } from '@/types';
import { cnJoin, correctSearchQuery, createTooltipTextForPinnedQuery} from '@/utils/formatting';
import QueryItemMenu from '@/components/queries-view/query-item-menu';
import Button from '@/components/[design-system]/button';

type QueryItemProps = {
  query: DbPinnedQuery;
};

export default function QueryItem({ query }: QueryItemProps) {
  const [ isContextMenuOpen, setIsContextMenuOpen ] = useState(false);

  const queryHint = createTooltipTextForPinnedQuery(query);

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsContextMenuOpen((prev) => !prev);
  };

  return (
    <>
      <Button
        element="a"
        className={twQuery}
        href={`/?q=${correctSearchQuery(query.query)}`}
        title={queryHint}
        onContextMenu={handleRightClick}
      >
        {query.label}
      </Button>

      <QueryItemMenu
        query={query}
        isContextMenuOpen={isContextMenuOpen}
        setIsContextMenuOpen={setIsContextMenuOpen}
      />
    </>
  );
}

// bg-[#f4f4f4] is based on flowers pattern
const twQuery = cnJoin(`
  pt-[1px]
  bg-[#f4f4f4]
  text-black/70 font-rubik
  border-black/20
  hover:text-black/90
`);
