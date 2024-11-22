import { create } from 'zustand';

import { DbLinkWithTags, DbPinnedQuery } from '@/types';

type ModalWindowVariants = 
  'link-create' | 'link-update' | 'link-delete' | 'links-sorting-menu' |
  'query-context-menu' | 'query-create' | 'query-update' | 'query-delete' |
  'settings';

type StoreState = {
  currentModalWindow: null | ModalWindowVariants;
  currentModalWindowPos: null | React.CSSProperties;
  currentLinkData : null | DbLinkWithTags;
  currentQueryData : null | DbPinnedQuery;
  setCurrentModalWindow: (value: null | ModalWindowVariants) => void;
  setCurrentModalWindowPos: (value: null | React.CSSProperties) => void;
  setCurrentLinkData: (value: null | DbLinkWithTags) => void;
  setCurrentQueryData: (value: null | DbPinnedQuery) => void;
  resetModalWindowStates: () => void;
};

export const useStore = create<StoreState>((set, get) => ({
  currentModalWindow: null,
  currentLinkData: null,
  currentQueryData: null,
  currentModalWindowPos: null,

  setCurrentModalWindow: (value: null | ModalWindowVariants) => {
    set(() => ({
      currentModalWindow: value
    }));
  },

  setCurrentModalWindowPos: (value: null | React.CSSProperties) => {
    set(() => ({
      currentModalWindowPos: value
    }));
  },

  setCurrentLinkData: (value: null | DbLinkWithTags) => {
    set(() => ({
      currentLinkData: value
    }));
  },

  setCurrentQueryData: (value: null | DbPinnedQuery) => {
    set(() => ({
      currentQueryData: value
    }));
  },

  resetModalWindowStates: () => {
    set(() => ({
      currentModalWindow: null,
      currentModalWindowPos: null,
      currentLinkData: null,
      currentQueryData: null,
    }));
  },
}));

// TODO:
// sorting (must save in local storage)