import { getLinksBySearch } from '@/server-actions';
import LinkItem from '@/components/lists/link-item';

type LinkListProps = {
  searchQuery: string;
};

export default async function LinkList({ searchQuery }: LinkListProps) {   
  const links = await getLinksBySearch(searchQuery);

  return (
    <div className="flex flex-col mt-20">
      {links.map((link) => (
        <LinkItem key={link.id} link={link} />
      ))}
    </div>
  );
}
