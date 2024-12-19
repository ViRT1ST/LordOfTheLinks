import { cnJoin, cn } from '@/utils/formatting';

type FieldProps = React.ComponentPropsWithoutRef<'input'>;

export default function Field({ children, className, ...rest }: FieldProps) {
  return (
    <input className={cn(twField, twPlaceholder, twRing, className)} {...rest} />
  );
}

const twField = cnJoin(
  'w-full h-10 px-3 pt-[0.5px] flex',
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
