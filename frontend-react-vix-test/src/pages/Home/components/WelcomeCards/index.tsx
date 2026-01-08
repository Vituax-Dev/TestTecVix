import { Stack } from "@mui/material";
import { HeaderVMList } from "../VmsCardsList/HeaderVMList";
import { useZTheme } from "../../../../stores/useZTheme";
import { CardOne } from "./components/CardOne";
import { CardTwo } from "./components/CardTwo";

export const WelcomeCards = () => {
  const { theme, mode } = useZTheme();
  return (
    <Stack
      sx={{
        boxSizing: "border-box",
        backgroundColor: theme[mode].light,
        padding: "8px 0",
        width: "100%",
        gap: "24px",
      }}
    >
      <HeaderVMList />
      <Stack
        sx={{
          backgroundColor: theme[mode].light,
          padding: "0 24px",
          width: "100%",
          gap: "24px",
        }}
      >
        <CardOne />
        <CardTwo />
      </Stack>
    </Stack>
  );
};
