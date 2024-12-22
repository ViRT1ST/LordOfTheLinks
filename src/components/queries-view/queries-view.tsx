import { getPinnedQueries } from '@/server-actions';
import { cnJoin } from '@/utils/formatting';
import QueryButtonCreate from '@/components/queries-view/query-button-create';
import QueryItem from '@/components/queries-view/query-item';

export default async function QueriesView() {
  const { pinnedQueries } = await getPinnedQueries();

  return (
    <div className={twContainer}>
      <h1 className={twTitle}>Pinned Queries</h1>

      <div className={twQueriesContainer}>
        {pinnedQueries.map((query) => (
          <div key={query.id} className={twQueryContainer}>
            <QueryItem query={query} />
          </div>
        ))}
      </div>

      <div className={twGrowingContainer} />
      <QueryButtonCreate />
    </div>
  );
}

const twContainer = cnJoin(
  'w-full mt-10 mb-10',
  'flex flex-col items-center gap-y-8 flex-grow'
);

const twTitle = cnJoin(
  'font-geistsans text-3xl font-light text-black/70',
);

const twGrowingContainer = cnJoin(
  'w-full flex-grow'
);

const twQueriesContainer = cnJoin(
  'w-full lg:w-[700px] flex flex-row flex-wrap justify-center', // items-center
);

const twQueryContainer = cnJoin(
  'inline-block px-1 py-1'
);

