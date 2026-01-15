import { Stack } from "@mui/material";
import { ScreenFullPage } from "../../components/ScreenFullPage";
import { TextRob20Font1MB } from "../../components/Text1MB";
import { useZTheme } from "../../stores/useZTheme";
import { useTranslation } from "react-i18next";
import { ColaboratorForm } from "./ColaboratorForm";
import { ColaboratorTable } from "./ColaboratorTable";
import { TextRob16Font1S } from "../../components/Text1S";
import { useRef } from "react";
import { useZUserProfile } from "../../stores/useZUserProfile";

interface ColaboratorTableRef {
  refresh: () => void;
}

export const ColaboratorRegisterPage = () => {
  const { theme, mode } = useZTheme();
  const { t } = useTranslation();
  const tableRef = useRef<ColaboratorTableRef>(null);
  const { role } = useZUserProfile();

  const handleUserCreated = () => {
    if (tableRef.current) {
      tableRef.current.refresh();
    }
  };

  return (
    <ScreenFullPage
      title={
        <TextRob20Font1MB
          sx={{
            color: theme[mode].primary,
            fontSize: "28px",
            fontWeight: "500",
            lineHeight: "40px",
          }}
        >
          {t("colaboratorRegister.title")} | {t("colaboratorRegister.sideTitle")}
        </TextRob20Font1MB>
      }
      subtitle={
        <TextRob16Font1S
          sx={{
            color: theme[mode].gray,
            fontSize: "16px",
            fontWeight: 400,
          }}
        >
          {t("colaboratorRegister.subtitle")}
        </TextRob16Font1S>
      }
      sxTitleSubTitle={{
        paddingLeft: "40px",
        paddingRight: "40px",
      }}
      sxContainer={{
        paddingLeft: "40px",
        paddingRight: "40px",
        paddingBottom: "40px",
      }}
    >
      <Stack
        sx={{
          width: "100%",
          gap: "24px",
        }}
      >
        {role !== "member" && <ColaboratorForm onUserCreated={handleUserCreated} />}
        <ColaboratorTable ref={tableRef} />
      </Stack>
    </ScreenFullPage>
  );
};
