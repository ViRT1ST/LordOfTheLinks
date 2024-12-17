import { cnJoin } from '@/utils/formatting';
import { CSSProperties } from 'react';

type BodyContainerProps = {
  children: React.ReactNode;
};

export default function BodyContainer({ children }: BodyContainerProps) {
  const style: CSSProperties = {
    backgroundImage: `url('/background/vecteezy-floral-pattern-01.png')`
  };

  return (
    <div className={twContainer} style={style}>
      {children}
    </div>
  );
}

const twContainer = cnJoin(
  'flex flex-col w-full h-full min-h-screen',
  'font-geistsans', 
  // 'bg-stone-200',
  // 'bg-[#afb4b6]',
  // 'bg-[#b6afaf]',
  // 'bg-[#5daedd]'
  // 'bg-[#E7E5E4]',
  'bg-[#E4E4E4]',
);
