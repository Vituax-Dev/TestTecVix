import { create } from "zustand";
import { ThemeNames } from "../pages/Settings/themes";

export interface IWhiteLabel {
  colorSelected: ThemeNames;
}

const INIT_STATE: IWhiteLabel = {
  colorSelected: "default",
};

interface IWhiteLabelState extends IWhiteLabel {
  setColorSelected: (color: ThemeNames) => void;
}

export const useZWhiteLabel = create<IWhiteLabelState>((set) => ({
  ...INIT_STATE,
  setColorSelected: (color) => set((state) => ({ ...state, color })),
}));
