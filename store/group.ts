import { create } from "zustand";

interface GroupStoreProps {
  isOpen: boolean;
  toggleOpen: () => void;
}

export const useGroupStore = create<GroupStoreProps>((set) => ({
  isOpen: false,
  toggleOpen: () =>
    set((state) => ({
      isOpen: !state.isOpen,
    })),
}));