import { type DbLinkWithTags } from '@/types/index';
import { getLinksAll, getLinksBySearch } from '@/server-actions';
import { cnJoin } from '@/utils/classes';
import LinkItem from '@/components/list/link-item';
import ControlsBottom from '@/components/list/controls-bottom';
import ControlsTop from '@/components/list/controls-top';

type LinkListProps = {
  searchQuery: string;
  show: string;
};

export default async function LinkList({ searchQuery, show }: LinkListProps) {   
  let links: DbLinkWithTags[] = [];

  if (show === 'all' || searchQuery === '') {
    links = await getLinksAll();
  } else {
    links = await getLinksBySearch(searchQuery);
  }

  const tempList = links.slice(0, 9);
  
  return (
    <div className={twContainer}>
      <ControlsTop />

      <div className={twLinksContainer}>
        {tempList.map((link) => (
          <LinkItem key={link.id} link={link} />
        ))}
      </div>

      <ControlsBottom />
    </div>
  );
}

const twContainer = cnJoin(
  'relative'
);

const twLinksContainer = cnJoin(
  'flex flex-col',
);
