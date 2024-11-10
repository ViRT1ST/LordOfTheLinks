import { cnJoin } from '@/utils/classes';

type PageWrapperProps = {
  children: React.ReactNode;
};

export default function PageWrapper({ children }: PageWrapperProps) {
  return (
    <div className={twPageWrapper}>
      {children}
    </div>
  );
}

const twPageWrapper = cnJoin(
  'flex flex-col w-full h-full min-h-screen',
  'font-geistsans bg-stone-200'
);
