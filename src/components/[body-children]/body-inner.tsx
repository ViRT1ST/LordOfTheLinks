'use client';

import { useEffect, CSSProperties } from 'react';

import { setScrollbarVisibility } from '@/utils/dom';
import { cnJoin } from '@/utils/formatting';
import { useStore } from '@/store/useStore';
import { getSettings } from '@/server-actions';

type BodyInnerProps = {
  children: React.ReactNode;
};

export default function BodyInner({ children }: BodyInnerProps) {
  const setClientSettings = useStore((state) => state.setClientSettings);

  useEffect(() => {
    const onLoad = async () => {
      const serverSettings = await getSettings();
      
      if (serverSettings) {
        setScrollbarVisibility(serverSettings.hideVerticalScrollbar);
        setClientSettings(serverSettings);
      }
    };

    onLoad();
  }, []);

  const style: CSSProperties = {
    backgroundImage: `url('/background/vecteezy-floral-pattern-01.png')`,
    backgroundRepeat: 'repeat',
  };

  if (!setClientSettings) {
    return null;
  }

  return (
    <div className={twContainer} style={style}>
      {children}
    </div>
  );
}

const twContainer = cnJoin(`
  w-full h-full min-h-screen flex flex-col 
  font-inter bg-[#e4e4e4]
`);
