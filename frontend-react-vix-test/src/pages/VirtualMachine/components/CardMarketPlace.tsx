import { useTranslation } from "react-i18next";
import { useZTheme } from "../../../stores/useZTheme";
import { Stack } from "@mui/material";
import { TextRob20Font1M } from "../../../components/Text1M";
import { TextRob12Font2Xs } from "../../../components/Text2Xs";
import { Btn } from "../../../components/Buttons/Btn";
import { TextRob16Font1S } from "../../../components/Text1S";
import { ArrowRightIcon } from "../../../icons/ArrowsIcons";
import { useZVM } from "../../../stores/useZVM";

export const CardMarketPlace = () => {
  const { t } = useTranslation();
  const { theme, mode } = useZTheme();
  const { setIsOpenVMMarketPlace } = useZVM();

  return (
    <Stack
      sx={{
        height: "fit-content",
        padding: "24px",
        gap: "8px",
        width: "100%",
      }}
    >
      <TextRob20Font1M
        sx={{
          color: theme[mode].mainBackground,
          fontSize: "20px",
          fontWeight: "500",
          lineHeight: "24px",
        }}
      >
        {t("isos.exploreMarketPlace")}
      </TextRob20Font1M>
      <TextRob12Font2Xs
        sx={{
          color: theme[mode].tertiary,
          fontSize: "14px",
          fontWeight: "400",
          lineHeight: "20px",
        }}
      >
        {t("isos.marketPlaceInfos")}
      </TextRob12Font2Xs>

      <Btn
        onClick={() => setIsOpenVMMarketPlace(true)}
        sx={{
          padding: "0px",
          backgroundColor: "transparent",
          borderRadius: "none",
          height: "40px",
          border: `none`,
          display: "flex",
          gap: "8px",
          alignItems: "center",
          width: "fit-content",
        }}
      >
        <TextRob16Font1S
          sx={{
            color: theme[mode].mainBackground,
            fontSize: "14px",
            fontWeight: "500",
            lineHeight: "16px",
            textDecoration: "underline",
          }}
        >
          {t("isos.seeAvailable")}
        </TextRob16Font1S>
        <ArrowRightIcon fill={theme[mode].mainBackground} />
      </Btn>
    </Stack>
  );
};
