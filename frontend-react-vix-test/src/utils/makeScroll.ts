import { themeColors } from "../stores/useZTheme";

export const makeScroll = (
  theme: {
    light: themeColors;
    dark: themeColors;
  },
  mode: "light" | "dark",
) => {
  return {
    /* Scrollbar horizontal */
    "::-webkit-scrollbar:horizontal": {
      height: "8px",
    },

    "::-webkit-scrollbar-track:horizontal": {
      background: theme[mode].grayLight,
    },

    "::-webkit-scrollbar-thumb:horizontal": {
      background: theme[mode].blueDark,
      borderRadius: "4px",
    },

    "::-webkit-scrollbar-thumb:horizontal:hover": {
      background: theme[mode].blueLight,
    },

    /* Firefox */
    scrollbarWidth: "thin", // define espessura
    scrollbarColor: `${theme[mode].blueDark} ${theme[mode].grayLight}`,
  }; // thumb e track}
};
