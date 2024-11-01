import { Link, Tag } from '@prisma/client';

import { Button } from './ui/button';
import { cn } from '@/lib/chadcn/utils';

type LinkItemProps = {
  link: Link & { tags: Tag[] };
}

export default function LinkItem({ link }: LinkItemProps) {
  const btnStyles = cn(
    'h-7 border border-black/10 text-black/60 bg-transparent'
  );

  return (
    <div key={link.id} className={cn(
      'flex flex-col border-black/20 rounded-sm border p-3 mb-4',
      'relative',
      'bg-white/50'
    )} >
      <h2 className="text-lg" >{link.title}</h2>
      <p className="text-sm text-black/50" >{link.url}</p>

      <div className="absolute top-2 right-2 flex gap-2" >
        <Button className={btnStyles}>
          Edit
        </Button>
        <Button className={btnStyles}>
          Delete
        </Button>
      </div>
    </div>
  );
}
