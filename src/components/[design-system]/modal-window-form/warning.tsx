import { cnJoin } from '@/utils/formatting';

type WarningContentProps = React.ComponentPropsWithoutRef<'div'>;

export default function WarningContent({ children }: WarningContentProps) {
  return (
    <div className={twWarning}>
      {children}
    </div>
  );
}

const twWarning = cnJoin(`
  px-4 py-2 rounded-md border border-dashed border-red-500
`);

