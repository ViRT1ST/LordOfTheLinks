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
  'w-full mb-3',
  'flex flex-row'
);
