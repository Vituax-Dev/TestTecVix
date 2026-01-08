import { create } from "zustand";
import { middlewareLocalStorage } from "./middlewareLocalStorage";

export interface themeColors {
  mainBackground: string;
  primary: string;
  tertiary: string;
  shadow: string;
  red: string;
  lightRed: string;
  blue: string;
  black: string;
  gray: string;
  light: string;
  lightV2: string;
  dark: string;
  blueLight: string;
  blueMedium: string;
  blueDark: string;
  grayLight: string;
  grayLightV2: string;
  green: string;
  greenLight: string;
  btnWhite: string;
  btnBlue: string;
  btnLightBlue: string;
  btnDarkBlue: string;
  btnText: string;
  btnLightText: string;
  btnDarkText: string;
  ok: string;
  warning: string;
  danger: string;
  yellowLight: string;
  alternativeDarkText: string;
}

interface IInitiState {
  mode: "light" | "dark";
  maxZindex: number;
  themeName: string;
  themeNameDefault?: string;
  version: number;
  theme: {
    light: themeColors;
    dark: themeColors;
  };
}

interface IZThemeState extends IInitiState {
  setMode: (mode: "light" | "dark") => void;
  toggleMode: () => void;
  setTheme: ({
    light,
    dark,
    themeName,
  }: {
    light?: themeColors;
    dark?: themeColors;
    themeName?: string;
    themeNameDefault?: string;
    version?: number;
  }) => void;
  resetAll: () => void;
}

const INIT_STATE: IInitiState = {
  maxZindex: 100000,
  mode: "light",
  themeName: "default",
  themeNameDefault: "default",
  version: 0,
  theme: {
    light: {
      mainBackground: "#FFFFFF", // B1
      btnWhite: "#FFFFFF", // B1-V2
      light: "#F9F9F9", // C1
      lightV2: "#F9F9F9", // C1 - V2
      grayLight: "#ECEEF2", // C2
      grayLightV2: "#ECEEF2", // C2-V2
      tertiary: "#C4C9D2", // C3
      gray: "#868B95", // C4
      primary: "#474B54", // C5
      black: "#252930", // C6
      dark: "#0F1216", // C7
      shadow: "#D9D9D9", // shadow
      blue: "#3D04AA", // blue //********* */
      blueLight: "#C1CAFB", // blueLight
      blueMedium: "#647AF4", // blueMedium
      blueDark: "#4B5CB7", // blueDark
      btnDarkBlue: "#4B5CB7", // btnDarkBlue
      btnLightBlue: "#C1CAFB", // btnLightBlue //******* */
      btnText: "#C1CAFB", // btn-text
      red: "#851111", // red*
      danger: "#E54E4E", // danger*
      lightRed: "#FACDCD", // lightRed*
      green: "#134925", // green*
      ok: "#4BBF72", // ok*
      greenLight: "#AAE4BE", // greenLight*
      btnBlue: "#304EAF", // btnBlue* //****** */
      btnLightText: "#3D04AA", // btnLightText*
      btnDarkText: "#3D04AA", // btnDarkText* //****** */
      warning: "#F2E077", // warning*
      yellowLight: "#FFF6B2", // yellowLight,
      alternativeDarkText: "#474B54", // alternativeDarkText
    },
    dark: {
      mainBackground: "#252930", // B1
      btnWhite: "#0F1216", // B1-V2
      light: "#474B54", // C1
      lightV2: "#181B20", // C1 - V2
      grayLight: "#474B54", // C2
      grayLightV2: "#252930", // C2-V2
      tertiary: "#868B95", // C3
      gray: "#C4C9D2", // C4
      primary: "#ECEEF2", // C5
      black: "#F9F9F9", // C6
      dark: "#FFFFFF", // C7
      shadow: "#0F1216", // shadow
      blue: "#4B5CB7", // blue
      blueLight: "#4B5CB7", // blueLight
      blueMedium: "#C1CAFB", // blueMedium
      blueDark: "#C1CAFB", // blueDark
      btnDarkBlue: "#C1CAFB", // btnDarkBlue
      btnLightBlue: "#FFF6B2", // btnLightBlue
      btnText: "#FFFFFF", // btn-text
      red: "#851111", // red*
      danger: "#E54E4E", // danger*
      lightRed: "#FACDCD", // lightRed*
      green: "#134925", // green*
      ok: "#4BBF72", // ok*
      greenLight: "#AAE4BE", // greenLight*
      btnBlue: "#AEC0FE", // btnBlue*
      btnLightText: "#F9F9F9", // btnLightText*
      btnDarkText: "#0F1216", // btnDarkText*
      warning: "#F2E077", // warning*
      yellowLight: "#FFDF22", // yellowLight
      alternativeDarkText: "#0F1216", // alternativeDarkText
    },
  },
};

const middle = middlewareLocalStorage<IZThemeState>("homeTheme");

export const useZTheme = create<IZThemeState>()(
  middle((set) => ({
    ...INIT_STATE,
    setMode: (mode) => set((state) => ({ ...state, mode })),
    toggleMode: () =>
      set((state) => ({
        ...state,
        mode: state.mode === "light" ? "dark" : "light",
      })),
    setTheme: ({ light, dark, themeName, version, themeNameDefault }) =>
      set((state) => ({
        ...state,
        themeName,
        themeNameDefault,
        version,
        theme: {
          ...state.theme,
          ...(light && { light }),
          ...(dark && { dark }),
        },
      })),
    resetAll: () => set((state) => ({ ...state, ...INIT_STATE })),
  })),
);
