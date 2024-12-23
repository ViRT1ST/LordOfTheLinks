import { cnJoin, cn } from '@/utils/formatting';

type SectionProps = React.ComponentPropsWithoutRef<'section'>;

export default function Section({ children, className, ...rest }: SectionProps) {
  return (
    <section className={cn(twSection, className)} {...rest} >
      {children}
    </section>
  );
}

const twSection = cnJoin(
  'w-full py-2',
  'flex flex-row justify-between items-center'
);
