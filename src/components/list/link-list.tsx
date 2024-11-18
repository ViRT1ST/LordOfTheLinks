import { Suspense } from 'react';

import { getLinksAll, getLinksBySearch } from '@/server-actions';
import { cnJoin } from '@/utils/classes';
import LinkItem from '@/components/list/link-item';
import ControlsBottom from '@/components/list/controls-bottom';
import ControlsTop from '@/components/list/controls-top';

type LinkListProps = {
  all: boolean;
  query: string;
  page: number;
};

const resultsPerPage = 9;

export default async function LinkList({ all, query, page }: LinkListProps) {   
  const { links, totalCount } = all
    ? await getLinksAll(page)
    : await getLinksBySearch(query, page);

  const totalPages = Math.ceil(totalCount / resultsPerPage);
  const prevPage = page === 1 ? null : page - 1;
  const nextPage = page === totalPages ? null : page + 1;

  return (
    <div className={twContainer}>
      <ControlsTop
        totalCount={totalCount}
      />

      {/* <Suspense fallback={<div />}> */}
        <div className={twLinksContainer}>
          {links.map((link) => (
            <LinkItem key={link.id} link={link} />
          ))}
        </div>
      {/* </Suspense> */}

      <ControlsBottom
        currentPage={page}
        lastPage={totalPages}
        prevPage={prevPage}
        nextPage={nextPage}
      />
    </div>
  );
}

const twContainer = cnJoin(
  'relative grow flex flex-col',
);

const twLinksContainer = cnJoin(
  'flex flex-col grow',
);
