import type { DbLinkWithTags, SortingOrderVariants } from '@/types';
import LinkItem from '@/components/links-view/link-item';
import { cnJoin } from '@/utils/formatting';

type LinksListProps = {
  links: DbLinkWithTags[];
};

export default function LinksList({ links }: LinksListProps) {
  return (
    <div className={twLinksContainer}>
      {links.map((link) => (
        <LinkItem key={link.id} link={link} />
      ))}
    </div>
  );
}

const twLinksContainer = cnJoin(
  'flex flex-col grow',
);
