import { Box, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ScreenFullPage } from "../../components/ScreenFullPage";
import { TextRob20Font1MB } from "../../components/Text1MB";
import { TextRob16Font1S } from "../../components/Text1S";
import { useZTheme } from "../../stores/useZTheme";
import { Btn } from "../../components/Buttons/Btn";
import { ColaboratorForm } from "./ColaboratorForm";
import { useZColaboratorRegister } from "../../stores/useZColaboratorRegister";

export const ColaboratorRegister = () => {
  const { t } = useTranslation();
  const { theme, mode } = useZTheme();
  const { resetAll } = useZColaboratorRegister();

  return (
    <ScreenFullPage
      title={
        <TextRob20Font1MB sx={{ color: theme[mode].primary, fontSize: "28px", fontWeight: "500" }}>
          {t("colaboratorRegister.title")}
        </TextRob20Font1MB>
      }
      sxTitleSubTitle={{ paddingLeft: "40px", paddingRight: "40px" }}
      sxContainer={{ paddingLeft: "40px", paddingRight: "40px", paddingBottom: "40px" }}
      subtitle={<TextRob16Font1S sx={{ color: theme[mode].primary, fontWeight: "50", fontSize: "16px" }}>
            {t("colaboratorRegister.formSubtitle")}
      </TextRob16Font1S>} 
    >
      <Stack sx={{ width: "100%", gap: "26px" }}>
        <Stack
          sx={{
            background: theme[mode].mainBackground,
            borderRadius: "16px",
            padding: "24px",
            gap: "24px"
          }}
        >
          <TextRob16Font1S sx={{ color: theme[mode].primary, fontWeight: "600", fontSize: "18px" }}>
            {t("colaboratorRegister.formSubtitle")}
          </TextRob16Font1S>
          
          <ColaboratorForm />
        </Stack>

        <Stack
          sx={{
            background: theme[mode].mainBackground,
            borderRadius: "16px",
            width: "100%",
            padding: "24px",
          }}
        >
          <TextRob16Font1S sx={{ color: theme[mode].black, fontWeight: 500, mb: 2, fontSize: 19 }}>
            {t("colaboratorRegister.tableTitle")}
          </TextRob16Font1S>
        </Stack>
      </Stack>
    </ScreenFullPage>
  );
};