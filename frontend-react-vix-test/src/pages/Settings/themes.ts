import { themeColors } from "../../stores/useZTheme";

export type ThemeNames = "default" | "orange" | "lightBlue" | "green" | "red";

export type IAvailableTheme = {
  [key in ThemeNames]: {
    light: themeColors;
    dark: themeColors;
  };
};

export const availableThemes: IAvailableTheme = {
  default: {
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
      blue: "#4B5CB7", // blue //******** */

      blueLight: "#4B5CB7", // blueLight
      blueMedium: "#C1CAFB", // blueMedium
      blueDark: "#C1CAFB", // blueDark
      btnDarkBlue: "#C1CAFB", // btnDarkBlue
      btnLightBlue: "#FFF6B2", // btnLightBlue //******* */
      btnText: "#FFFFFF", // btn-text
      red: "#851111", // red*
      danger: "#E54E4E", // danger*
      lightRed: "#FACDCD", // lightRed*
      green: "#134925", // green*
      ok: "#4BBF72", // ok*
      greenLight: "#AAE4BE", // greenLight*
      btnBlue: "#AEC0FE", // btnBlue* //****** */
      btnLightText: "#F9F9F9", // btnLightText*
      btnDarkText: "#0F1216", // btnDarkText* //****** */
      warning: "#F2E077", // warning*
      yellowLight: "#FFDF22", // yellowLight,
      alternativeDarkText: "#0F1216", // alternativeDarkText
    },
  },
  orange: {
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
      blue: "#FCD96B", // blue * ----------------

      blueLight: "#FCD96B", // blueLight
      blueMedium: "#FCD96B", // blueMedium
      blueDark: "#CA6D02", // blueDark
      btnDarkBlue: "#CA6D02", // btnDarkBlue
      btnLightBlue: "#FCD96B", // btnLightBlue *----------
      btnText: "#252930", // btn-text
      red: "#851111", // red*
      danger: "#E54E4E", // danger*
      lightRed: "#FACDCD", // lightRed*
      green: "#134925", // green*
      ok: "#4BBF72", // ok*
      greenLight: "#AAE4BE", // greenLight*
      btnBlue: "#CA6D02", // btnBlue* ------------
      btnLightText: "#CA6D02", // btnLightText*
      btnDarkText: "#CA6D02", // btnDarkText* -----------
      warning: "#F2E077", // warning*
      yellowLight: "#FFF6B2", // yellowLight,
      alternativeDarkText: "#CA6D02", // alternativeDarkText*-------
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
      blue: "#CA6D02", // blue *---------------
      blueLight: "#CA6D02", // blueLight
      blueMedium: "#CA6D02", // blueMedium
      blueDark: "#FCD96B", // blueDark
      btnDarkBlue: "#FCD96B", // btnDarkBlue
      btnLightBlue: "#CA6D02", // btnLightBlue *--------------
      btnText: "#FFFFFF", // btn-text
      red: "#851111", // red*
      danger: "#E54E4E", // danger*
      lightRed: "#FACDCD", // lightRed*
      green: "#134925", // green*
      ok: "#4BBF72", // ok*
      greenLight: "#AAE4BE", // greenLight*
      btnBlue: "#FCD96B", // btnBlue* -------------
      btnLightText: "#FCD96B", // btnLightText*
      btnDarkText: "#FCD96B", // btnDarkText*-----------
      warning: "#F2E077", // warning*
      yellowLight: "#FFDF22", // yellowLight,
      alternativeDarkText: "#FCD96B", // alternativeDarkText *-------
    },
  },
  lightBlue: {
    light: {
      mainBackground: "#FFFFFF",
      btnWhite: "#FFFFFF",
      light: "#F9F9F9",
      lightV2: "#F9F9F9",
      grayLight: "#ECEEF2",
      grayLightV2: "#ECEEF2",
      tertiary: "#C4C9D2",
      gray: "#868B95",
      primary: "#474B54",
      black: "#252930",
      dark: "#0F1216",
      shadow: "#D9D9D9",
      blue: "#93C0FF",
      blueLight: "#93C0FF",
      blueMedium: "#93C0FF",
      blueDark: "#05067B",
      btnDarkBlue: "#05067B",
      btnLightBlue: "#93C0FF",
      btnText: "#252930",
      red: "#851111",
      danger: "#E54E4E",
      lightRed: "#FACDCD",
      green: "#134925",
      ok: "#4BBF72",
      greenLight: "#AAE4BE",
      btnBlue: "#05067B",
      btnLightText: "#05067B",
      btnDarkText: "#05067B",
      warning: "#F2E077",
      yellowLight: "#FFF6B2",
      alternativeDarkText: "#05067B",
    },
    dark: {
      mainBackground: "#252930",
      btnWhite: "#0F1216",
      light: "#474B54",
      lightV2: "#181B20",
      grayLight: "#474B54",
      grayLightV2: "#252930",
      tertiary: "#868B95",
      gray: "#C4C9D2",
      primary: "#ECEEF2",
      black: "#F9F9F9",
      dark: "#FFFFFF",
      shadow: "#0F1216",
      blue: "#05067B",
      blueLight: "#05067B",
      blueMedium: "#05067B",
      blueDark: "#93C0FF",
      btnDarkBlue: "#93C0FF",
      btnLightBlue: "#05067B",
      btnText: "#FFFFFF",
      red: "#851111",
      danger: "#E54E4E",
      lightRed: "#FACDCD",
      green: "#134925",
      ok: "#4BBF72",
      greenLight: "#AAE4BE",
      btnBlue: "#93C0FF",
      btnLightText: "#93C0FF",
      btnDarkText: "#93C0FF",
      warning: "#F2E077",
      yellowLight: "#FFF6B2",
      alternativeDarkText: "#93C0FF",
    },
  },
  green: {
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
      blue: "#99E2CD", // Blue //******* */

      blueLight: "#99E2CD", // BlueLight
      blueMedium: "#99E2CD", // BlueMedium
      blueDark: "#0C5A44", // BlueDark
      btnDarkBlue: "#0C5A44", // BtnDarkBlue
      btnLightBlue: "#99E2CD", // BtnLightBlue //******** */
      btnText: "#252930", // btn-text
      red: "#851111", // red*
      danger: "#E54E4E", // danger*
      lightRed: "#FACDCD", // lightRed*
      green: "#134925", // green*
      ok: "#4BBF72", // ok*
      greenLight: "#AAE4BE", // greenLight*
      btnBlue: "#0C5A44", // BtnBlue* //******* */
      btnLightText: "#0C5A44", // BtnLightText*
      btnDarkText: "#0C5A44", // BtnDarkText* //****** */
      warning: "#F2E077", // warning*
      yellowLight: "#FFF6B2", // yellowLight,
      alternativeDarkText: "#0C5A44", // alternativeDarkText
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
      blue: "#0C5A44", // Blue //******** */

      blueLight: "#0C5A44", // BlueLight
      blueMedium: "#0C5A44", // BlueMedium
      blueDark: "#99E2CD", // BlueDark
      btnDarkBlue: "#99E2CD", // BtnDarkBlue
      btnLightBlue: "#0C5A44", // BtnLightBlue //****** */
      btnText: "#FFFFFF", // btn-text
      red: "#851111", // red*
      danger: "#E54E4E", // danger*
      lightRed: "#FACDCD", // lightRed*
      green: "#134925", // green*
      ok: "#4BBF72", // ok*
      greenLight: "#AAE4BE", // greenLight*
      btnBlue: "#99E2CD", // BtnBlue* ///******* */
      btnLightText: "#99E2CD", // BtnLightText*
      btnDarkText: "#99E2CD", // BtnDarkText* //****** */
      warning: "#F2E077", // warning*
      yellowLight: "#FFDF22", // yellowLight,
      alternativeDarkText: "#99E2CD", // alternativeDarkText
    },
  },
  red: {
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
      blue: "#FFBFCC", // Blue //******** */

      blueLight: "#FFBFCC", // BlueLight
      blueMedium: "#FFBFCC", // BlueMedium
      blueDark: "#862424", // BlueDark
      btnDarkBlue: "#862424", // BtnDarkBlue
      btnLightBlue: "#FFBFCC", // BtnLightBlue //******** */
      btnText: "#252930", // btn-text
      red: "#851111", // red*
      danger: "#E54E4E", // danger*
      lightRed: "#FACDCD", // lightRed*
      green: "#134925", // green*
      ok: "#4BBF72", // ok*
      greenLight: "#AAE4BE", // greenLight*
      btnBlue: "#862424", // BtnBlue* //******* */
      btnLightText: "#862424", // BtnLightText*
      btnDarkText: "#862424", // BtnDarkText* //***** */
      warning: "#F2E077", // warning*
      yellowLight: "#FFF6B2", // yellowLight,
      alternativeDarkText: "#862424", // alternativeDarkText
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
      blue: "#862424", // Blue //******** */

      blueLight: "#862424", // BlueLight
      blueMedium: "#862424", // BlueMedium
      blueDark: "#FFBFCC", // BlueDark
      btnDarkBlue: "#FFBFCC", // BtnDarkBlue
      btnLightBlue: "#862424", // BtnLightBlue //******* */
      btnText: "#FFFFFF", // btn-text
      red: "#851111", // red*
      danger: "#E54E4E", // danger*
      lightRed: "#FACDCD", // lightRed*
      green: "#134925", // green*
      ok: "#4BBF72", // ok*
      greenLight: "#AAE4BE", // greenLight*
      btnBlue: "#FFBFCC", // BtnBlue* //******* */
      btnLightText: "#FFBFCC", // BtnLightText*
      btnDarkText: "#FFBFCC", // BtnDarkText* //**** */
      warning: "#F2E077", // warning*
      yellowLight: "#FFDF22", // yellowLight,
      alternativeDarkText: "#FFBFCC", // alternativeDarkText
    },
  },
};
