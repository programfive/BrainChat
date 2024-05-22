import { create } from 'zustand';

interface BearState {
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
}

export const useBearStore = create<BearState>((set) => ({
  openModal: false,
  setOpenModal: (openModal) => set({ openModal }),
}));