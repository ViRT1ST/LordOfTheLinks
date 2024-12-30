import { getLinks } from '@/server-actions';
import { cnJoin } from '@/utils/formatting';

import LinksControlsBottom from '@/components/links-view/links-controls-bottom';
import LinksControlsTop from '@/components/links-view/links-controls-top';
import LinksList from '@/components/links-view/links-list';

type LinksViewProps = {
  query: string | null;
  page: number;
};

export default async function LinksView({ query, page }: LinksViewProps) { 
  const { links, totalCount, linksPerPage, sortLinksBy } = await getLinks(query, page) || {};

  if (!links || !totalCount || !linksPerPage || !sortLinksBy) {
    return null;
  }

  const totalPages = Math.ceil(totalCount / linksPerPage);
  const prevPage = page === 1 ? null : page - 1;
  const nextPage = page === totalPages ? null : page + 1;

  return (
    <div className={twContainer}>
      <LinksControlsTop totalCount={totalCount} sortedBy={sortLinksBy} />

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

const twContainer = cnJoin(`
  relative grow flex flex-col
`);
