import { cnJoin, cn } from '@/utils/formatting';

type TextareaProps = React.ComponentPropsWithoutRef<'textarea'>;

export default function Textarea({ children, className, ...rest }: TextareaProps) {
  return (
    <textarea className={cn(twTextarea, twPlaceholder, twRing, className)} {...rest} />
  );
}

const twTextarea = cnJoin(
  'w-full min-h-32 max-h-64 px-3 py-[10.5px] flex',
  'bg-white text-sm text-black',
);

export const twPlaceholder = cnJoin(
  'placeholder:text-black/50',
);

export const twRing = cnJoin(
  'outline-none rounded ring-1 ring-black/10',
  'focus-visible:ring-2',
  'focus-visible:ring-black/80'
);

