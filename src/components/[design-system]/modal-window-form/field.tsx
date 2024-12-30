import { cnJoin, cn } from '@/utils/formatting';

type FieldProps = React.ComponentPropsWithoutRef<'input'>;

export default function Field({ children, className, ...rest }: FieldProps) {
  return (
    <input className={cn(twField, className)} {...rest} />
  );
}

const twField = cnJoin(`
  w-full h-10 px-3 pt-[0.5px] flex
  bg-white text-sm text-black
  c-input-ring c-input-placeholder
`);


