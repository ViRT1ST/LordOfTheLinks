import { cnJoin } from '@/utils/classes';

type MainContentProps = {
  children: React.ReactNode;
};

export default function MainContent({ children }: MainContentProps) {
  return (
    <main className={cnJoin(
      'w-[1400px] mx-auto px-16 pt-16 pb-5',
      'flex flex-col min-h-svh',
      // 'bg-stone-200'
    )}>
      {children}
    </main>
  );
}