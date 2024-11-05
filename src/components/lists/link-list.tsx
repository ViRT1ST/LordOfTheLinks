import { type DbLinkWithTags } from '@/types/index';
import { getLinksAll, getLinksBySearch } from '@/server-actions';
import LinkItem from '@/components/lists/link-item';

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
  
  return (
    <div className="flex flex-col mt-20">
      {links.map((link) => (
        <LinkItem key={link.id} link={link} />
      ))}
    </div>
  );
}
