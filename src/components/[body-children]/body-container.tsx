import { CSSProperties } from 'react';
import { cnJoin } from '@/utils/formatting';

type BodyContainerProps = {
  children: React.ReactNode;
};

export default function BodyContainer({ children }: BodyContainerProps) {
  const style: CSSProperties = {
    backgroundImage: `url('/background/vecteezy-floral-pattern-01.png')`,
    backgroundRepeat: 'repeat',
  };

  return (
    <div className={twContainer} style={style}>
      {children}
    </div>
  );
}

const twContainer = cnJoin(
  'flex flex-col w-full h-full min-h-screen',
  'font-inter bg-[#e4e4e4]',
);
