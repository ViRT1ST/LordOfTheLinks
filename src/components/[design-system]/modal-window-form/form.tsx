import { cnJoin, cn } from '@/utils/formatting';

type FormProps = React.ComponentPropsWithoutRef<'form'>;

export default function Form({ children, className, ...rest }: FormProps) {
  return (
    <form className={cn(twForm, className)} autoComplete="off" {...rest} >
      {children}
    </form>
  );
}

const twForm = cnJoin(
  'p-6 flex flex-col gap-y-2',
  'bg-white rounded-lg font-inter',
  // 'min-w-full sm:min-w-[600px]'
);
