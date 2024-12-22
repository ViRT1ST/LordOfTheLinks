import { cnJoin, cn } from '@/utils/formatting';

type TextareaProps = React.ComponentPropsWithoutRef<'textarea'>;

export default function Textarea({ children, className, ...rest }: TextareaProps) {
  return (
    <textarea className={cn(twTextarea, className)} {...rest} />
  );
}

const twTextarea = cnJoin(
  'w-full min-h-32 max-h-64 px-3 py-[10.5px] flex',
  'bg-white text-sm text-black',
  'c-input-ring c-input-placeholder'
);

