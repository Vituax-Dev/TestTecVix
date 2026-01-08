import { create } from "zustand";

export interface ISettingsVar {
  currentTabIndex: number;
  currentLabelTab: string;
  labels: string[];
}

const INIT_STATE: ISettingsVar = {
  currentTabIndex: 0,
  currentLabelTab: "",
  labels: [],
};

interface IGlobalSettignsState extends ISettingsVar {
  setSettings: (settings: Partial<ISettingsVar>) => void;
  resetAll: () => void;
}

export const useZSettingsVar = create<IGlobalSettignsState>((set) => ({
  ...INIT_STATE,
  setSettings: (settings) => set((state) => ({ ...state, ...settings })),
  resetAll: () => set((state) => ({ ...state, ...INIT_STATE })),
}));
