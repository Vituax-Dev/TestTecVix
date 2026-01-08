import { Box, Link, Stack } from "@mui/material";
import { useZTheme } from "../../../stores/useZTheme";
import { TextRob14Font1Xs } from "../../../components/Text1Xs";
import { CheckboxLabel } from "./CheckboxLabel";
import { useTranslation } from "react-i18next";

interface IProps {
  agreeCheckBox: boolean;
  setAgreeCheckBox: (value: boolean) => void;
}

export const AgreeCostsTerms = ({
  agreeCheckBox,
  setAgreeCheckBox,
}: IProps) => {
  const { theme, mode } = useZTheme();
  const { t } = useTranslation();
  return (
    <Stack
      sx={{
        borderRadius: "16px",
        // border: `1px solid ${theme[mode].gray}`,
        background: theme[mode].grayLight,
        padding: "16px",
        gap: "16px",
      }}
    >
      <TextRob14Font1Xs sx={{ color: theme[mode].black, fontWeight: "500" }}>
        {t("createVm.AgreeCostsTitle")}
      </TextRob14Font1Xs>
      <Stack sx={{ gap: "8px" }}>
        <TextRob14Font1Xs sx={{ color: theme[mode].black, fontWeight: "400" }}>
          {"• " + t("createVm.termOne")}
        </TextRob14Font1Xs>
        <TextRob14Font1Xs sx={{ color: theme[mode].black, fontWeight: "400" }}>
          {"• " + t("createVm.termTwo")}
        </TextRob14Font1Xs>
        <TextRob14Font1Xs sx={{ color: theme[mode].black, fontWeight: "400" }}>
          {"• " + t("createVm.termThree")}
        </TextRob14Font1Xs>
        <TextRob14Font1Xs sx={{ color: theme[mode].black, fontWeight: "400" }}>
          {"• " + t("createVm.termFour")}
        </TextRob14Font1Xs>
        <TextRob14Font1Xs sx={{ color: theme[mode].black, fontWeight: "400" }}>
          {"• " + t("createVm.termFiveStart")}
          <Link
            sx={{
              textDecoration: "underline",
              color: theme[mode].blueDark,
              fontWeight: "600",
            }}
            href={`https://vituax.com/${t("costsAndFinances.lan")}#calculator`}
            target="_blank"
          >
            {t("createVm.termFiveLink")}
          </Link>
          {t("createVm.termFiveEnd")}
        </TextRob14Font1Xs>
      </Stack>
      <Box
        sx={{
          display: "flex",
          gap: "8px",
          background: theme[mode].mainBackground,
          padding: "12px 16px",
          borderRadius: "12px",
        }}
      >
        <CheckboxLabel
          value={agreeCheckBox}
          onChange={setAgreeCheckBox}
          label={t("createVm.termsLabel")}
          sxLabel={{
            color: theme[mode].black,
            fontWeight: "500",
            fontSize: "14px",
          }}
        />
      </Box>
    </Stack>
  );
};
