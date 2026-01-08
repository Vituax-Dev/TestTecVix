import { Box, Button, Divider } from "@mui/material";
import { LightModePlaceholder } from "./LightModePlaceholder";
import { DarkModePlaceholder } from "./DarkModePlaceholder";
import { useTranslation } from "react-i18next";
import { themeColors, useZTheme } from "../../../../stores/useZTheme";
import { TextRob16Font1S } from "../../../../components/Text1S";
import { LightModeIcon } from "../../../../icons/LightModeIcon";
import { HalfMoon } from "../../../../icons/HalfMoon";

interface IWhiteLabelChildProps {
  theme: {
    dark: themeColors;
    light: themeColors;
  };
}

export const RightCardThemeMode = ({ theme }: IWhiteLabelChildProps) => {
  const { mode, setMode } = useZTheme();
  const { t } = useTranslation();
  return (
    <>
      <TextRob16Font1S
        sx={{
          color: theme[mode].primary,
          fontWeight: "500",
          fontSize: "16px",
          marginBottom: "16px",
        }}
      >
        {t("whiteLabel.systemThemes")}
      </TextRob16Font1S>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          gap: "24px",
          flexWrap: "wrap",
          justifyContent: "center",
          marginBottom: "16px",
        }}
      >
        {/* light theme card */}
        <Box
          sx={{
            boxSizing: "border-box",
            background: theme[mode].lightV2,
            border: `1px solid ${theme[mode].grayLight}`,
            padding: "16px 0",
            borderRadius: "16px",
          }}
        >
          <Box
            sx={{
              width: "100%",
              boxSizing: "border-box",
              padding: " 0 16px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: "8px",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <LightModeIcon fill={theme[mode].blueDark} />
              {/*  ^ criar cor nova ^ */}
              <TextRob16Font1S
                sx={{
                  color: theme[mode].primary,
                  fontWeight: "500",
                  fontSize: "16px",
                  height: "fit-content",
                  display: "flex",
                  lineHeight: "0",
                }}
              >
                {t("whiteLabel.light")}
              </TextRob16Font1S>
            </Box>
            {mode === "light" && (
              <Box
                sx={{
                  backgroundColor: "#AAE4BE",
                  boxSizing: "border-box",
                  padding: "4px 10px",
                  borderRadius: "12px",
                }}
              >
                <TextRob16Font1S
                  sx={{
                    fontWeight: "500",
                    fontSize: "16px",
                    height: "fit-content",
                    display: "flex",
                    lineHeight: "1",
                    color: "#134925",
                  }}
                >
                  {t("whiteLabel.active")}
                </TextRob16Font1S>
              </Box>
            )}
          </Box>
          <Divider
            sx={{ margin: "16px 0 24px", background: theme[mode].grayLight }}
          />
          <Box
            sx={{
              boxSizing: "content-box",
              padding: "0 16px",
              marginBottom: "24px",
            }}
          >
            <LightModePlaceholder />
          </Box>
          <Box sx={{ boxSizing: "border-box", padding: "0 16px" }}>
            <Button
              sx={{
                background: "transparent",
                color: theme[mode].blueDark,
                border: `1px solid ${theme[mode].blueDark}`,
                textTransform: "none",
                borderRadius: "12px",
                width: "100%",
                height: "48px",
                fontWeight: "500",
                fontSize: "16px",
              }}
              onClick={() => setMode("light")}
            >
              {t("whiteLabel.chooseTheme")}
            </Button>
          </Box>
        </Box>
        {/* dark theme card */}
        <Box
          sx={{
            boxSizing: "border-box",
            background: theme[mode].lightV2,
            border: `1px solid ${theme[mode].grayLight}`,
            padding: "16px 0",
            borderRadius: "16px",
          }}
        >
          <Box
            sx={{
              width: "100%",
              boxSizing: "border-box",
              padding: " 0 16px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: "8px",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <HalfMoon fill={theme[mode].blueDark} />
              {/*  ^ criar cor nova ^ */}
              <TextRob16Font1S
                sx={{
                  color: theme[mode].primary,
                  fontWeight: "500",
                  fontSize: "16px",
                  height: "fit-content",
                  display: "flex",
                  lineHeight: "0",
                }}
              >
                {t("whiteLabel.dark")}
              </TextRob16Font1S>
            </Box>
            {mode === "dark" && (
              <Box
                sx={{
                  backgroundColor: "#134925",
                  boxSizing: "border-box",
                  padding: "4px 10px",
                  borderRadius: "12px",
                }}
              >
                <TextRob16Font1S
                  sx={{
                    fontWeight: "500",
                    fontSize: "16px",
                    height: "fit-content",
                    display: "flex",
                    lineHeight: "1",
                    color: "#AAE4BE",
                  }}
                >
                  {t("whiteLabel.active")}
                </TextRob16Font1S>
              </Box>
            )}
          </Box>
          <Divider
            sx={{ margin: "16px 0 24px", background: theme[mode].grayLight }}
          />
          <Box
            sx={{
              boxSizing: "content-box",
              padding: "0 16px",
              marginBottom: "24px",
            }}
          >
            <DarkModePlaceholder />
          </Box>
          <Box sx={{ boxSizing: "border-box", padding: "0 16px" }}>
            <Button
              sx={{
                background: "transparent",
                color: theme[mode].blueDark,
                border: `1px solid ${theme[mode].blueDark}`,
                textTransform: "none",
                borderRadius: "12px",
                width: "100%",
                height: "48px",
                fontWeight: "500",
                fontSize: "16px",
              }}
              onClick={() => setMode("dark")}
            >
              {t("whiteLabel.chooseTheme")}
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};
