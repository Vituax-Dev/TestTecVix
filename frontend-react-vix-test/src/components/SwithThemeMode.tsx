import { HalfMoon } from "../icons/HalfMoon";
import { LightModeIcon } from "../icons/LightModeIcon";
import { useZTheme } from "../stores/useZTheme";
import { IconButton, Stack } from "@mui/material";

export const SwithThemeMode = () => {
  const { mode, toggleMode, theme } = useZTheme();

  return (
    <Stack
      className="w-fit"
      sx={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <IconButton
        type="button"
        sx={{
          p: 0,
          marginRight: 0.5,
          marginLeft: 0.5,
          "&:hover": {
            backgroundColor: "transparent",
          },
        }}
        onClick={toggleMode}
      >
        {mode === "dark" ? (
          <LightModeIcon fill={theme[mode].blueMedium} />
        ) : (
          <HalfMoon fill={theme[mode].blueMedium} />
        )}
      </IconButton>
    </Stack>
  );
};
