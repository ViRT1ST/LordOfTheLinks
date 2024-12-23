import { cnJoin, cn } from '@/utils/formatting';

type TitlesAreaProps = {
  title: string;
  subTitle: string;
} & React.ComponentPropsWithoutRef<'div'>;

export default function TitlesArea({ title, subTitle, className, ...props }: TitlesAreaProps) {
  return (
    <div className={cn(twTitlesArea, className)} {...props}>
      <h1 className={twTitle}>
        {title}
      </h1>
      <p className={twSubTitle}>
        {subTitle}
      </p>
    </div>
  );
}

const twTitlesArea = cnJoin(
  'mb-8 flex flex-col gap-y-1'
);

const twTitle = cnJoin(
  'text-2xl font-semibold text-black/90 tracking-tight '
);

const twSubTitle = cnJoin(
  'text-sm font-semibold text-black/60 '
);