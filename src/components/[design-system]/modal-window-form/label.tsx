import { cnJoin, cn } from '@/utils/formatting';

type LabelProps = React.ComponentPropsWithoutRef<'label'>;

export default function Label({ children, className, ...rest }: LabelProps) {
  return (
    <label className={cn(twLabel, className)} {...rest} >
      {children}
    </label>
  );
}

const twLabel = cnJoin(
  'h-10 pt-[10.5px] self-start',
  'text-sm font-semibold text-black/90'
);