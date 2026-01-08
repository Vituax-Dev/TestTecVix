import { Stack } from "@mui/material";
import { useZTheme } from "../../../../stores/useZTheme";
import { useTranslation } from "react-i18next";
import { TextRob12Font2Xs } from "../../../../components/Text2Xs";
import { Link } from "react-router-dom";
import { BigMailNot } from "../../../../icons/BigMailNot";

export const EmptyFeedBack = () => {
  const { theme, mode } = useZTheme();
  const { t } = useTranslation();
  return (
    <Stack
      sx={{
        width: "100%",
        height: "100%",
        alignItems: "center",
        padding: "16px",
        overflow: "auto",
      }}
    >
      <Stack
        sx={{
          flexDirection: "row",
          gap: "16px",
        }}
      >
        <Stack
          sx={{
            minWidth: "60px",
            minHeight: "60px",
          }}
        >
          <BigMailNot fill={theme[mode].tertiary} />
        </Stack>
        <Stack
          sx={{
            maxWidth: "50%",
          }}
        >
          <TextRob12Font2Xs
            sx={{
              color: theme[mode].tertiary,
              fontSize: "14px",
              fontWeight: "400",
              lineHeight: "20px",
              lineBreak: "normal",
            }}
          >
            {t("graphics.errorGraph")}
            <Link
              to="/support"
              style={{
                color: theme[mode].primary,
                fontSize: "14px",
                fontFamily: "Roboto",
                fontWeight: "700",
                textDecoration: "underline",
                lineHeight: "20px",
                wordWrap: "break-word",
              }}
            >
              {t("graphics.suport")}
            </Link>
            .
          </TextRob12Font2Xs>
        </Stack>
      </Stack>
    </Stack>
  );
};
