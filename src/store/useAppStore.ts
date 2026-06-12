import { create } from "zustand";

interface AppStore {
  selectedAppId: string;
  mobilePanelOpen: boolean;
  setSelectedAppId: (appId: string) => void;
  setMobilePanelOpen: (open: boolean) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  selectedAppId: "1",
  mobilePanelOpen: false,
  setSelectedAppId: (selectedAppId) => set({ selectedAppId }),
  setMobilePanelOpen: (mobilePanelOpen) => set({ mobilePanelOpen })
}));
