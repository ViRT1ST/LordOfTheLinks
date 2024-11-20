import { create } from 'zustand';

type storeState = {
  booleanStateReseter: number,
  runBooleanStateReseter: () => void
}

// sorting (must save in local storage)

export const useStore = create<storeState>((set, get) => ({
  booleanStateReseter: 0,

  runBooleanStateReseter: () => {
    set(() => ({
      booleanStateReseter: Math.random()
    }));
  }
}));