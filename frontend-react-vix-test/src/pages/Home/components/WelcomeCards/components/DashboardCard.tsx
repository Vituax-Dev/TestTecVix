import { Box, Stack } from "@mui/material";
import { useZTheme } from "../../../../../stores/useZTheme";
import { TextRob28Font2L } from "../../../../../components/Text2L";
import { TextRob12Font2Xs } from "../../../../../components/Text2Xs";
import { useTranslation } from "react-i18next";

export const DashboardCard = () => {
  const { theme, mode } = useZTheme();
  const { t } = useTranslation();
  return (
    <Stack
      sx={{
        width: "100]%",
        boxSizing: "border-box",
        padding: "24px",
        borderRadius: "16px",
        backgroundColor: theme[mode].lightV2,
        display: "flex",
        gap: "24px",
        alignItems: "flex-start",
        justifyContent: "center",
      }}
    >
      <TextRob28Font2L
        sx={{
          fontSize: "24px",
          fontWeight: 400,
          color: theme[mode].gray,
          maxWidth: "265px",
          width: "100%",
        }}
      >
        {t("home.cardTwo.dashboardCard.titleStart")}
        <span style={{ fontWeight: 500 }}>
          {t("home.cardTwo.dashboardCard.boldTitle")}
        </span>
        {t("home.cardTwo.dashboardCard.titleEnd")}
      </TextRob28Font2L>
      <Stack sx={{ gap: "24px", width: "100%" }}>
        <Stack sx={{ gap: "4px", width: "100%" }}>
          <TextRob12Font2Xs sx={{ color: theme[mode].gray, fontWeight: 400 }}>
            {t("home.cardTwo.dashboardCard.vcpu")}
          </TextRob12Font2Xs>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              position: "relative",
              background: theme[mode].grayLight,
              borderRadius: "16px",
              height: "16px",
            }}
          >
            <Box
              sx={{
                borderRadius: "16px",
                height: "100%",
                width: "40%",
                background: `linear-gradient(270deg, #647AF4 0%,  #C1CAFB 100%)`,
              }}
            />
          </Box>
        </Stack>

        <Stack sx={{ gap: "4px", width: "100%" }}>
          <TextRob12Font2Xs sx={{ color: theme[mode].gray, fontWeight: 400 }}>
            {t("home.cardTwo.dashboardCard.memory")}
          </TextRob12Font2Xs>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              position: "relative",
              background: theme[mode].grayLight,
              borderRadius: "16px",
              height: "16px",
            }}
          >
            <Box
              sx={{
                borderRadius: "16px",
                height: "100%",
                width: "68%",
                background: `linear-gradient(270deg, #647AF4 0%,  #C1CAFB 100%)`,
              }}
            />
          </Box>
        </Stack>

        <Stack sx={{ gap: "4px", width: "100%" }}>
          <TextRob12Font2Xs sx={{ color: theme[mode].gray, fontWeight: 400 }}>
            {t("home.cardTwo.dashboardCard.disk")}
          </TextRob12Font2Xs>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              position: "relative",
              background: theme[mode].grayLight,
              borderRadius: "16px",
              height: "16px",
            }}
          >
            <Box
              sx={{
                borderRadius: "16px",
                height: "100%",
                width: "88%",
                background: `linear-gradient(270deg, #647AF4 0%,  #C1CAFB 100%)`,
              }}
            />
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
};
