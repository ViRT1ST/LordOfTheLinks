import { create } from 'zustand';

import {
  type DbLinkWithTags,
  type DbPinnedQuery,
  type DbSettings,
  type ModalWindowVariants,
} from '@/types';

type StoreState = {
  currentModalWindow: ModalWindowVariants | null;
  currentModalWindowPos: React.CSSProperties | null;
  currentLinkData: DbLinkWithTags | null;
  currentQueryData: DbPinnedQuery | null;
  currentSettings: DbSettings | null;
  setCurrentModalWindow: (value: ModalWindowVariants | null) => void;
  setCurrentModalWindowPos: (value: React.CSSProperties | null) => void;
  setCurrentLinkData: (value: DbLinkWithTags | null) => void;
  setCurrentQueryData: (value: DbPinnedQuery | null) => void;
  resetModalWindowStates: () => void;
  setCurrentSettings: (value: DbSettings | null) => void;
};

export const useStore = create<StoreState>((set) => ({
  currentModalWindow: null,
  currentModalWindowPos: null,
  currentLinkData: null,
  currentQueryData: null,
  currentSettings: null,

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

  setCurrentSettings: (value) => {
    set(() => ({ currentSettings: value }));
  }
}));
