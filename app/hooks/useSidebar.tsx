import { create } from "zustand";

type SidebarStore = {
  isOpen: boolean;
  toggle: () => void;
  setOpen: (val: boolean) => void;
  close: () => void;
};

export const useSidebar = create<SidebarStore>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  setOpen: (val: boolean) => set({ isOpen: val }),
  close: () => set({ isOpen: false }),
}));
