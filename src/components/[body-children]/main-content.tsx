import { cnJoin } from '@/utils/formatting';

type MainContainerProps = {
  children: React.ReactNode;
};

export default function MainContent({ children }: MainContainerProps) {
  return (
    <main className={twMain}>
      {children}
    </main>
  );
}

const twMain = cnJoin(`
  w-full max-w-[1400px] min-h-svh
  mx-auto px-16 pt-16 pb-5
  flex flex-col 
`);
