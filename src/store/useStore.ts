import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import {
  type DbLinkWithTags,
  type DbPinnedQuery,
  type ModalWindowVariants,
  type DbSettings
} from '@/types';

type StoreState = {
  currentModalWindow: ModalWindowVariants | null;
  currentModalWindowPos: React.CSSProperties | null;
  currentLinkData: DbLinkWithTags | null;
  currentQueryData: DbPinnedQuery | null;
  settingsFromDb: DbSettings | null;

  setCurrentModalWindow: (value: ModalWindowVariants | null) => void;
  setCurrentModalWindowPos: (value: React.CSSProperties | null) => void;
  setCurrentLinkData: (value: DbLinkWithTags | null) => void;
  setCurrentQueryData: (value: DbPinnedQuery | null) => void;
  resetModalWindowStates: () => void;
  setSettingsFromDb: (value: DbSettings | null) => void;
};

export const useStore = create<StoreState>((set) => ({
  currentModalWindow: null,
  currentLinkData: null,
  currentQueryData: null,
  currentModalWindowPos: null,
  currentSortingOrder: null,
  settingsFromDb: null,

  setCurrentModalWindow: (value) => {
    set(() => ({ currentModalWindow: value }));
  },

  setCurrentModalWindowPos: (value) => {
    set(() => ({ currentModalWindowPos: value }));
  },

  setCurrentLinkData: (value) => {
    set(() => ({ currentLinkData: value }));
  },

  setCurrentQueryData: (value) => {
    set(() => ({ currentQueryData: value }));
  },

  resetModalWindowStates: () => {
    set(() => ({
      currentModalWindow: null,
      currentModalWindowPos: null,
      currentLinkData: null,
      currentQueryData: null,
    }));
  },

  setSettingsFromDb: (value) => {
    set(() => ({ settingsFromDb: value }));
  }
}));
