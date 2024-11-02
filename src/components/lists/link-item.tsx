import { type dbLinkWithTags } from '@/types/index';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/chadcn/utils';

type LinkItemProps = {
  link: dbLinkWithTags;
};

export default function LinkItem({ link }: LinkItemProps) {
  // const domain = link.url
  //   .replace('https:', '')
  //   .replace('www.', '')
  //   .replace('//', '')
  //   .split('/')[0];

  return (
    <div className={linkContainer}>
      <h2 className={linkTitle}>{link.title}</h2>
      <p className={linkUrl}>{link.url}</p>

      <div className={twButtonsArea}>
        <Button className={twButton}>
          Edit
        </Button>
        <Button className={twButton}>
          Delete
        </Button>
      </div>
    </div>
  );
}

const linkContainer = cn(
  'relative p-3 mb-4 flex flex-col',
  'bg-white/50 border rounded-sm border-black/20',
);

const linkTitle = cn(
  'text-lg text-black'
);

const linkUrl = cn(
  'text-sm text-black/50'
);

const twButtonsArea = cn(
  'absolute top-2 right-2 flex gap-2'
);

const twButton = cn(
  'h-7 bg-transparent border border-black/10 text-black/60'
);
