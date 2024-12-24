import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { type DbSettings } from '@/types';

type StoreState = {
  currentSettings: DbSettings | null;
  setCurrentSettings: (value: DbSettings | null) => void;
};

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      currentSettings: null,
      setCurrentSettings: (value) => {
        set(() => ({ currentSettings: value }));
      }
    }),
    {
      name: 'zustand-store',
      partialize: (state) => ({ currentSettings: state.currentSettings })
    }
  )
);