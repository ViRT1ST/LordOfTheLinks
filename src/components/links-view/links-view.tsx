import { getLinksAll, getLinksBySearch } from '@/server-actions';
import { cnJoin } from '@/utils/classes';
import LinkItem from '@/components/links-view/link-item';
import LinksControlsBottom from '@/components/links-view/links-controls-bottom';
import LinksControlsTop from '@/components/links-view/links-controls-top';

type LinksViewProps = {
  query: string;
  page: number;
};

const resultsPerPage = 9;

export default async function LinksView({ query, page }: LinksViewProps) {   
  const { links, totalCount } = query
    ? await getLinksBySearch(query, page)
    : await getLinksAll(page);

  const totalPages = Math.ceil(totalCount / resultsPerPage);
  const prevPage = page === 1 ? null : page - 1;
  const nextPage = page === totalPages ? null : page + 1;

  return (
    <div className={twContainer}>
      <LinksControlsTop
        totalCount={totalCount}
      />

      <div className={twLinksContainer}>
        {links.map((link) => (
          <LinkItem key={link.id} link={link} />
        ))}
      </div>

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

const twLinksContainer = cnJoin(
  'flex flex-col grow',
);
