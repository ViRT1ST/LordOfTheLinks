import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { type DbSettings } from '@/types';

type StoreState = {
  clientSettings: DbSettings | null;
  setClientSettings: (value: DbSettings | null) => void;
};

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      clientSettings: null,
      setClientSettings: (value) => {
        set(() => ({ clientSettings: value }));
      }
    }),
    {
      name: 'zustand-store',
      partialize: (state) => ({ clientSettings: state.clientSettings })
    }
  )
);