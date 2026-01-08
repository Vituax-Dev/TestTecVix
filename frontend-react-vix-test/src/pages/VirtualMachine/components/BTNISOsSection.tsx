import { Button, Stack } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useZTheme } from "../../../stores/useZTheme";
import { TextRob16FontL } from "../../../components/TextL";
import { useTranslation } from "react-i18next";
import { makeEllipsis } from "../../../utils/makeEllipsis";
import { useZVM } from "../../../stores/useZVM";

interface IProps {
  vmNameLabel: string | undefined;
}

export const BTNISOsSection = ({ vmNameLabel }: IProps) => {
  const { mode, theme } = useZTheme();
  const { t } = useTranslation();
  const { setIsOpenVMMarketPlace } = useZVM();

  return (
    <Stack
      sx={{
        width: "100%",
        gap: "12px",
      }}
    >
      <TextRob16FontL
        sx={{
          fontWeight: 400,
          lineHeight: "16px",
          color: theme[mode].primary,
        }}
      >
        {t("createVm.operationalSystem")}
      </TextRob16FontL>
      <Button
        sx={{
          width: "100%",
          height: "40px",
          border: "1px solid " + theme[mode].grayLight,
          backgroundColor: theme[mode].grayLight,
          display: "flex",
          gap: "8px",
          textTransform: "none",
          justifyContent: "flex-start",
          borderRadius: "12px",
          padding: "0 14px",
          paddingRight: "9px",
          color: theme[mode].primary,
          ":hover": {
            border: "1px solid",
            borderColor: theme[mode].blueLight,
          },
        }}
        onClick={() => setIsOpenVMMarketPlace(true)}
      >
        <TextRob16FontL
          sx={{
            fontFamily: "Roboto",
            fontWeight: "400",
            fontSize: "14px",
            ...makeEllipsis(),
          }}
        >
          {vmNameLabel}
        </TextRob16FontL>
        <ExpandMoreIcon
          sx={{
            minWidth: "24px",
            color: theme[mode].primary,
            marginLeft: "auto",
          }}
        />
      </Button>
    </Stack>
  );
};
