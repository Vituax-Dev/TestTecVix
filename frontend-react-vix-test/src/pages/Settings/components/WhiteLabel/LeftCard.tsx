import { Divider, Stack } from "@mui/material";
import { themeColors, useZTheme } from "../../../../stores/useZTheme";
import { LeftCardLogo } from "./LeftCardLogo";
import { LeftCardDomain } from "./LeftCardDomain";
import { usePermissions } from "../../../../hooks/usePermissions";

interface IWhiteLabelChildProps {
  theme: {
    dark: themeColors;
    light: themeColors;
  };
}
export const LeftCard = ({ theme }: IWhiteLabelChildProps) => {
  const { mode } = useZTheme();
  const { isVituaxUser, canEditWhiteLabel } = usePermissions();
  const isAdmin = canEditWhiteLabel();
  return (
    <Stack
      sx={{
        width: "calc(55% - 16px)",
        height: "100%",
        boxSizing: "border-box",
        padding: "24px",
        borderRadius: "16px",
        background: theme[mode].mainBackground,
        display: "flex",
        flexDirection: "column",
        "@media (max-width: 1000px)": { width: "100%" },
      }}
    >
      <LeftCardLogo theme={theme} isAdmin={isAdmin} isVituaxUser={isVituaxUser} />
      <Divider sx={{ margin: "40px 0", background: theme[mode].grayLight }} />
      <LeftCardDomain theme={theme} isAdmin={isAdmin} isVituaxUser={isVituaxUser} />
    </Stack>
  );
};
