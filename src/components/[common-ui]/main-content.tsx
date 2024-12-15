import { cnJoin } from '@/utils/formatting';

type MainContentProps = {
  children: React.ReactNode;
};

export default function MainContent({ children }: MainContentProps) {
  return (
    <main className={twMain}>
      {children}
    </main>
  );
}

const twMain = cnJoin(`
  w-[1400px] mx-auto px-16 pt-16 pb-5
  flex flex-col min-h-svh
`);
