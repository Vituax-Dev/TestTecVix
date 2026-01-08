import { Box, Stack } from "@mui/material";
import { TextRob28Font2L } from "../../../../../components/Text2L";
import { TextRob12Font2Xs } from "../../../../../components/Text2Xs";
import { useZTheme } from "../../../../../stores/useZTheme";
import { useTranslation } from "react-i18next";

export const ChartCard = () => {
  const { theme, mode } = useZTheme();
  const { t } = useTranslation();
  const year = new Date(Date.now()).getFullYear();
  return (
    <Stack
      sx={{
        boxSizing: "border-box",
        flexGrow: 1,
        padding: "24px",
        borderRadius: "16px",
        backgroundColor: theme[mode].lightV2,
        display: "flex",
        gap: "0",
        alignItems: "flex-start",
        justifyContent: "center",
        minWidth: "300px",
        "@media (max-width: 680px)": { width: "100%", minWidth: "unset" },
      }}
    >
      <TextRob28Font2L
        sx={{
          fontSize: "24px",
          fontWeight: 400,
          width: "100%",
          maxWidth: "212px",
          color: theme[mode].gray,
        }}
      >
        <span style={{ fontWeight: 500 }}>
          {t("home.cardTwo.chartCard.boldTitle")}
        </span>
        {t("home.cardTwo.chartCard.title")}
      </TextRob28Font2L>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <Stack sx={{ gap: "4px", alignItems: "center" }}>
          <TextRob12Font2Xs
            sx={{
              fontWeight: 500,
              fontSize: "10px",
              color: theme[mode].gray,
            }}
          >
            {t("home.cardTwo.chartCard.valueOne")}
          </TextRob12Font2Xs>
          <Box
            sx={{
              display: "flex",
              gap: "8px",
              boxSizing: "border-box",
              alignItems: "flex-end",
              justifyContent: "center",
              borderRadius: "8px",
              width: "66px",
              height: "74px",
              background:
                mode === "dark"
                  ? "var(--Teste-gradiente, linear-gradient(0deg, #181B20 9.79%, var(--blueDark, #4B5CB7) 100%))"
                  : "linear-gradient(0deg, var(--c1, #F9F9F9) 9.79%, var(--blueLight, #C1CAFB) 100%)",
              "@media (max-width: 680px)": { width: "50px" },
            }}
          >
            <TextRob12Font2Xs
              sx={{
                fontWeight: 500,
                fontSize: "8px",
                color: theme[mode].gray,
              }}
            >
              {year - 3}
            </TextRob12Font2Xs>
          </Box>
        </Stack>

        <Stack sx={{ gap: "4px", alignItems: "center" }}>
          <TextRob12Font2Xs
            sx={{
              fontWeight: 500,
              fontSize: "10px",
              color: theme[mode].gray,
            }}
          >
            {t("home.cardTwo.chartCard.valueTwo")}
          </TextRob12Font2Xs>
          <Box
            sx={{
              display: "flex",
              gap: "8px",
              boxSizing: "border-box",
              alignItems: "flex-end",
              justifyContent: "center",
              borderRadius: "8px",
              width: "66px",
              height: "112px",
              background:
                mode === "dark"
                  ? "var(--Teste-gradiente, linear-gradient(0deg, #181B20 9.79%, var(--blueDark, #4B5CB7) 100%))"
                  : "linear-gradient(0deg, var(--c1, #F9F9F9) 9.79%, var(--blueLight, #C1CAFB) 100%)",
              "@media (max-width: 680px)": { width: "50px" },
            }}
          >
            <TextRob12Font2Xs
              sx={{
                fontWeight: 500,
                fontSize: "8px",
                color: theme[mode].gray,
              }}
            >
              {year - 2}
            </TextRob12Font2Xs>
          </Box>
        </Stack>

        <Stack sx={{ gap: "4px", alignItems: "center" }}>
          <TextRob12Font2Xs
            sx={{
              fontWeight: 500,
              fontSize: "10px",
              color: theme[mode].gray,
            }}
          >
            {t("home.cardTwo.chartCard.valueThree")}
          </TextRob12Font2Xs>
          <Box
            sx={{
              display: "flex",
              gap: "8px",
              boxSizing: "border-box",
              alignItems: "flex-end",
              justifyContent: "center",
              borderRadius: "8px",
              width: "66px",
              height: "174px",
              background:
                mode === "dark"
                  ? "var(--Teste-gradiente, linear-gradient(0deg, #181B20 9.79%, var(--blueDark, #4B5CB7) 100%))"
                  : "linear-gradient(0deg, var(--c1, #F9F9F9) 9.79%, var(--blueLight, #C1CAFB) 100%)",
              "@media (max-width: 680px)": { width: "50px" },
            }}
          >
            <TextRob12Font2Xs
              sx={{
                fontWeight: 500,
                fontSize: "8px",
                color: theme[mode].gray,
              }}
            >
              {year - 1}
            </TextRob12Font2Xs>
          </Box>
        </Stack>

        <Stack sx={{ gap: "4px", alignItems: "center" }}>
          <TextRob12Font2Xs
            sx={{
              fontWeight: 500,
              fontSize: "10px",
              color: theme[mode].gray,
            }}
          >
            {t("home.cardTwo.chartCard.valueFour")}
          </TextRob12Font2Xs>
          <Box
            sx={{
              display: "flex",
              gap: "8px",
              boxSizing: "border-box",
              alignItems: "flex-end",
              justifyContent: "center",
              borderRadius: "8px",
              width: "66px",
              height: "272px",
              background:
                mode === "dark"
                  ? "var(--Teste-gradiente, linear-gradient(0deg, #181B20 9.79%, var(--blueDark, #4B5CB7) 100%))"
                  : "linear-gradient(0deg, var(--c1, #F9F9F9) 9.79%, var(--blueLight, #C1CAFB) 100%)",
              "@media (max-width: 680px)": { width: "50px" },
            }}
          >
            <TextRob12Font2Xs
              sx={{
                fontWeight: 500,
                fontSize: "8px",
                color: theme[mode].gray,
              }}
            >
              {year}
            </TextRob12Font2Xs>
          </Box>
        </Stack>
      </Box>
    </Stack>
  );
};
