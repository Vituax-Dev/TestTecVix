import { Stack, SxProps } from "@mui/material";
import { useZTheme } from "../stores/useZTheme";
import { TextRob16Font1S } from "./Text1S";
import { useTranslation } from "react-i18next";
import {
  UnderConstructionDark,
  UnderConstructionLight,
} from "../icons/UnderConstructionIcon";

interface IProps {
  sx?: SxProps;
}

export const UnderConstruction = ({ sx }: IProps) => {
  const { theme, mode } = useZTheme();
  const { t } = useTranslation();

  return (
    <Stack
      sx={{
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        gap: "8px",
        ...sx,
      }}
    >
      {mode === "dark" ? <UnderConstructionDark /> : <UnderConstructionLight />}
      <Stack
        sx={{
          gap: "8px",
          alignItems: "center",
        }}
      >
        <TextRob16Font1S
          sx={{
            color: theme[mode].primary,
            fontSize: "16px",
            fontWeight: "500",
            lineHeight: "16px",
          }}
        >
          {t("generic.underConstruction")}
        </TextRob16Font1S>
        <TextRob16Font1S
          sx={{
            color: theme[mode].gray,
            fontSize: "14px",
            fontWeight: "400",
            lineHeight: "16px",
            wordWrap: "break-word",
          }}
        >
          {t("generic.newFeatures")}
        </TextRob16Font1S>
      </Stack>
    </Stack>
  );
};
