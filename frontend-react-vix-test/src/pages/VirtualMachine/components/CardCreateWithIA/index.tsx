import { Stack } from "@mui/material";
import { TextRob20Font1M } from "../../../../components/Text1M";
import { useTranslation } from "react-i18next";
import { useZTheme } from "../../../../stores/useZTheme";
import { TextRob12Font2Xs } from "../../../../components/Text2Xs";
import { Btn } from "../../../../components/Buttons/Btn";
import { TextRob16Font1S } from "../../../../components/Text1S";
import { useState } from "react";
import { ModaIACreateVM } from "./ModaIACreateVM";

export const CardCreateWithIA = () => {
  const { t } = useTranslation();
  const { theme, mode } = useZTheme();
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Stack
        sx={{
          height: "fit-content",
          padding: "24px",
          gap: "12px",
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
          {t("createVm.createWithIa")}
        </TextRob20Font1M>
        <TextRob12Font2Xs
          sx={{
            color: theme[mode].grayLight,
            fontSize: "14px",
            fontWeight: "400",
            lineHeight: "20px",
          }}
        >
          {t("createVm.needHelp")}
        </TextRob12Font2Xs>

        <Btn
          onClick={() => setOpenModal(true)}
          sx={{
            padding: "9px 24px",
            backgroundColor: "transparent",
            borderRadius: "12px",
            height: "40px",
            marginTop: "auto",
            border: `1px solid ${theme[mode].blueLight}`,
          }}
        >
          <TextRob16Font1S
            sx={{
              color: theme[mode].blueLight,
              fontSize: "14px",
              fontWeight: "500",
              lineHeight: "16px",
            }}
          >
            {t("createVm.createWithIaBtn")}
          </TextRob16Font1S>
        </Btn>
      </Stack>
      {openModal && (
        <ModaIACreateVM open={openModal} onClose={() => setOpenModal(false)} />
      )}
    </>
  );
};
