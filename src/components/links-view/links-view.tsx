import { getLinks } from '@/server-actions';
import { cnJoin } from '@/utils/formatting';
import LinksControlsBottom from '@/components/links-view/links-controls-bottom';
import LinksControlsTop from '@/components/links-view/links-controls-top';
import LinksList from './links-list';
import { LINKS_PER_PAGE } from '@/config/public';
import { SortingOrderVariants } from '@/types';

type LinksViewProps = {
  query: string | null;
  sort: SortingOrderVariants | null;
  page: number;
};

const resultsPerPage = 9;

export default async function LinksView({ query, sort, page }: LinksViewProps) { 
  const { links, totalCount } = await getLinks(query, sort, page, LINKS_PER_PAGE);

  const totalPages = Math.ceil(totalCount / resultsPerPage);
  const prevPage = page === 1 ? null : page - 1;
  const nextPage = page === totalPages ? null : page + 1;

  
  return (
    <div className={twContainer}>
      <LinksControlsTop
        totalCount={totalCount}
        sortParam={sort}
      />

      <LinksList links={links} />

      <LinksControlsBottom
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

