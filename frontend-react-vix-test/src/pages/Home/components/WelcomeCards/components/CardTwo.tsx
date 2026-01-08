import { Box, Stack } from "@mui/material";
import { useZTheme } from "../../../../../stores/useZTheme";
import { ChartCard } from "./ChartCard";
import { ScaleCard } from "./ScaleCard";
import { DashboardCard } from "./DashboardCard";

export const CardTwo = () => {
  const { theme, mode } = useZTheme();
  return (
    <Box
      sx={{
        width: "100%",
        boxSizing: "border-box",
        padding: "24px",
        backgroundColor: theme[mode].mainBackground,
        borderRadius: "24px",
        gap: "24px",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
      }}
    >
      <ChartCard />
      <Stack sx={{ gap: "24px", flexGrow: 1 }}>
        <ScaleCard />
        <DashboardCard />
      </Stack>
    </Box>
  );
};
