import { create } from 'zustand';

import {
  type DbLinkWithTags,
  type DbPinnedQuery,
  type DbSettings,
  type ModalWindowVariants,
} from '@/types';

type StoreState = {
  currentModalWindow: ModalWindowVariants | null;
  currentLinkData: DbLinkWithTags | null;
  currentQueryData: DbPinnedQuery | null;
  currentSettings: DbSettings | null;
  setCurrentModalWindow: (value: ModalWindowVariants | null) => void;
  setCurrentLinkData: (value: DbLinkWithTags | null) => void;
  setCurrentQueryData: (value: DbPinnedQuery | null) => void;
  resetModalWindowStates: () => void;
  setCurrentSettings: (value: DbSettings | null) => void;
};

export const useStore = create<StoreState>((set) => ({
  currentModalWindow: null,
  currentLinkData: null,
  currentQueryData: null,
  currentSettings: null,

  setCurrentModalWindow: (value) => {
    set(() => ({ currentModalWindow: value }));
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
      currentLinkData: null,
      currentQueryData: null,
    }));
  },

  setCurrentSettings: (value) => {
    set(() => ({ currentSettings: value }));
  }
}));
