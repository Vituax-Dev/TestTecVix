import { Box } from "@mui/material";
import { useZTheme } from "../../../../../stores/useZTheme";
import { TextRob28Font2L } from "../../../../../components/Text2L";
import { ChartScaleIcon } from "../../../../../icons/ChartScaleIcon";
import { useTranslation } from "react-i18next";

export const ScaleCard = () => {
  const { theme, mode } = useZTheme();
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        width: "100%",
        boxSizing: "border-box",
        padding: "24px",
        backgroundColor: theme[mode].lightV2,
        borderRadius: "16px",
        gap: "24px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <TextRob28Font2L
        sx={{
          fontSize: "24px",
          fontWeight: 400,
          color: theme[mode].gray,
          maxWidth: "117px",
        }}
      >
        {t("home.cardTwo.scaleCard.title")}
        <span style={{ fontWeight: 500 }}>
          {t("home.cardTwo.scaleCard.boldTitle")}
        </span>
      </TextRob28Font2L>
      <Box sx={{ display: "flex" }}>
        <ChartScaleIcon mode={mode} />
      </Box>
    </Box>
  );
};
