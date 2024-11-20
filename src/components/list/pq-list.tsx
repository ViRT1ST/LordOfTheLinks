import Link from 'next/link';

import { getPinnedQueriesAll } from '@/server-actions';
import { cnJoin } from '@/utils/classes';
import PinnedQueriesCreateButton from '@/components/list/pq-create-button';
import { cn } from '@/utils/classes';



export default async function PinnedQueriesList() {
  const { pinnedQueries, totalCount } = await getPinnedQueriesAll();



  return (
    <div className={twContainer}>
      <h1 className={twTitle}>Pinned Queries</h1>

      <div className={twLinksContainer}>
        <div className={'text-center'}>
          {pinnedQueries.map((pq) => (
            <div key={pq.id} className={twLinkContainer}>
              <Link className={twLink} href={`/?q=${pq.query}`}>
                {pq.label}
              </Link>
            </div>
          ))}
        </div>
      </div>

      <PinnedQueriesCreateButton />
    </div>
  );
}

const twContainer = cnJoin(
  'w-full mt-10 mb-10 flex flex-col items-center gap-y-8 flex-grow',
);

const twTitle = cnJoin(
  'text-3xl font-light text-black/70',
);

const twLinksContainer = cnJoin(
  'w-[700px] flex flex-row flex-wrap justify-center flex-grow', // items-center
);

const twLinkContainer = cnJoin(
  'inline-block px-1 py-1'
);

const twLink = cnJoin(
  'h-8 inline-flex rounded-md border border-black/20  px-5 py-4',
  'justify-center items-center',
  ' text-base font-medium text-black/70',
  'font-rubik transition-all',

  //bg-white/40
  // bg-based on flowers backround
  'bg-[#f4f4f4]',
  'hover:text-black/90'
);
