import { Plus } from 'lucide-react';

import { getPinnedQueriesAll } from '@/server-actions';
import { cnJoin } from '@/utils/formatting';
import QueryButtonCreate from '@/components/queries-view/query-button-create';
import QueryItem from '@/components/queries-view/query-item';
import ModalWindow from '../[common-ui]/modal-window';

export default async function QueriesView() {
  const { pinnedQueries } = await getPinnedQueriesAll();

  return (
    <div className={twContainer}>
      <h1 className={twTitle}>Pinned Queries</h1>

      <div className={twQueriesContainer}>
        <div className={'text-center'}>
          {pinnedQueries.map((query) => (
            <div key={query.id} className={twQueryContainer}>
              <QueryItem query={query} />
            </div>
          ))}
        </div>
      </div>

      <QueryButtonCreate />
    </div>
  );
}

const twContainer = cnJoin(
  'w-full mt-10 mb-10 flex flex-col items-center gap-y-8 flex-grow',
);

const twTitle = cnJoin(
  'text-3xl font-light text-black/70',
);

const twQueriesContainer = cnJoin(
  'w-[700px] flex flex-row flex-wrap justify-center flex-grow', // items-center
);

const twQueryContainer = cnJoin(
  'inline-block px-1 py-1'
);

