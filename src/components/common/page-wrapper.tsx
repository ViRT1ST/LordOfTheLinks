import Header from '@/components/common/header';
import { cnJoin } from '@/utils/classes';

type PageWrapperProps = {
  children: React.ReactNode;
};

export default function PageWrapper({ children }: PageWrapperProps) {
  return (
    <div className={twPageWrapper}>
      <Header />
      {children}
    </div>
  );
}

const twPageWrapper = cnJoin(
  'z-50 flex flex-col w-full h-full min-h-screen',
  'font-geistsans bg-stone-200'
);
