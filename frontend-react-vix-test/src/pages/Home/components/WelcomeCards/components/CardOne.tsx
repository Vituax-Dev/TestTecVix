import { Box, Button, Link, Stack } from "@mui/material";
import { useZTheme } from "../../../../../stores/useZTheme";
import { TextRob28Font2L } from "../../../../../components/Text2L";
import { CircleExclamationIcon } from "../../../../../icons/CircleExclamationIcon";
import { TextRob16Font1S } from "../../../../../components/Text1S";
import { OpenNewTab } from "../../../../../icons/OpenNewTab";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useZBrandInfo } from "../../../../../stores/useZBrandStore";

export const CardOne = () => {
  const { theme, mode } = useZTheme();
  const manualUrl =
    mode === "dark"
      ? "https://vituax.cloud/api/v1/uploads/dark-user-manual-vituax-eng.pdf"
      : "https://vituax.cloud/api/v1/uploads/user-manual--vituax-eng.pdf";
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { brandName, manual } = useZBrandInfo();

  return (
    <Stack
      sx={{
        width: "100%",
        boxSizing: "border-box",
        padding: "24px",
        backgroundColor: theme[mode].mainBackground,
        borderRadius: "24px",
        gap: "24px",
      }}
    >
      <TextRob28Font2L
        sx={{
          color: theme[mode].primary,
          fontSize: "24px",
          fontWeight: 500,
        }}
      >
        {`${t("home.cardOne.title")} ${brandName || "Vituax"}`}
      </TextRob28Font2L>
      <Box
        sx={{
          boxSizing: "border-box",
          width: "100%",
          padding: "16px",
          border: `1px solid ${theme[mode].grayLight}`,
          borderRadius: "12px",
          backgroundColor: theme[mode].lightV2,
          display: "flex",
          gap: "8px",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <Box sx={{ display: "flex" }}>
          <CircleExclamationIcon color={theme[mode].blueDark} />
        </Box>
        <TextRob16Font1S sx={{ fontWeight: 400, color: theme[mode].blueDark }}>
          {t("home.cardOne.info")}
        </TextRob16Font1S>
      </Box>
      <Stack sx={{ gap: "12px" }}>
        <Button
          sx={{
            display: "flex",
            gap: "8px",
            textDecoration: "none",
            alignItems: "center",
            width: "fit-content",
            padding: "0",
            background: "transparent",
            border: "none",
            textTransform: "none",
            textAlign: "left",
            "&:hover": {
              cursor: "pointer",
            },
          }}
          onClick={() => navigate("/virtual-machine")}
          disableRipple
        >
          <TextRob16Font1S sx={{ fontWeight: 400, color: theme[mode].dark }}>
            {t("home.cardOne.linkOne")}
          </TextRob16Font1S>
          <OpenNewTab color={theme[mode].dark} />
        </Button>
        <Link
          sx={{
            display: "flex",
            gap: "8px",
            textDecoration: "none",
            alignItems: "center",
            width: "fit-content",
          }}
          href={manual || manualUrl}
          target="_blank"
        >
          <TextRob16Font1S sx={{ fontWeight: 400, color: theme[mode].dark }}>
            <span style={{ fontWeight: "500" }}>
              {t("home.cardOne.linkTwoBold")}
            </span>
            {`${t("home.cardOne.linkTwo")}`.replace(
              "Vituax",
              brandName || "Vituax",
            )}
          </TextRob16Font1S>
          <OpenNewTab color={theme[mode].dark} />
        </Link>
      </Stack>
    </Stack>
  );
};
