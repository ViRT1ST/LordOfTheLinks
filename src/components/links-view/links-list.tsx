import type { DbLinkWithTags } from '@/types';
import { cnJoin } from '@/utils/formatting';
import LinkItem from '@/components/links-view/link-item';

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
