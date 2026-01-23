import React, { useEffect, useState } from "react";
import { ModalSimple } from "../../../components/Modal/ModalSimple";
import { useTranslation } from "react-i18next";
import { Stack } from "@mui/material";
import { TextRob16FontL } from "../../../components/TextL";
import { useZTheme } from "../../../stores/useZTheme";
import { CTAsDoubleButtons } from "../../../components/Buttons/CTAsDoubleButtons";
import { useVmResource } from "../../../hooks/useVmResource";
import { AbsoluteBackDrop } from "../../../components/AbsoluteBackDrop";
import { PlayCircleIcon } from "../../../icons/PlayCircleIcon";

interface IProps {
  idVM: number;
  vmName?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ModalStartVM = ({ idVM, onConfirm, onCancel, vmName }: IProps) => {
  const { changeVmStatus, isLoading } = useVmResource(); 
  const { mode, theme } = useZTheme();
  const { t } = useTranslation();
  const [vmID, setVmID] = useState(idVM);

  const handleConfirm = async () => {
    const result = await changeVmStatus(vmID, 'start');
    
    if (result) {
       onConfirm();
    }
  };

  const handleCancel = () => {
    setVmID(0);
    onCancel();
  };

  return (
    <>
      {isLoading && <AbsoluteBackDrop open={isLoading} />}
      <ModalSimple
        sx={{
          maxWidth: "600px",
        }}
        open={Boolean(vmID)}
        onClose={handleCancel}
        title={
          <Stack
            sx={{
              flexDirection: "row",
              gap: "8px",
              alignItems: "center",
            }}
          >
            <PlayCircleIcon fill={theme[mode].greenLight} />
            <TextRob16FontL
              sx={{
                color: theme[mode].primary,
                fontWeight: "500",
                lineHeight: "16px",
              }}
            >
              {t("alerts.vmStatusChange")}
            </TextRob16FontL>
          </Stack>
        }
        content={
          <Stack sx={{ gap: "16px" }}>
            <TextRob16FontL
              sx={{
                color: theme[mode].primary,
                fontWeight: "400",
                lineHeight: "16px",
              }}
            >
              {t("alerts.alertStartVM")}
              <span
                style={{
                  marginLeft: "8px",
                  color: theme[mode].gray,
                  fontWeight: "600",
                  lineHeight: "20px",
                }}
              >
                {`#${vmID} - ${vmName}`}
              </span>
            </TextRob16FontL>
            <CTAsDoubleButtons
              labelSave={t("alerts.confirm")}
              labelRestore={t("alerts.cancel")}
              handleRestore={handleCancel}
              handleSave={handleConfirm}
              sxButtonSave={{
                background: theme[mode].blue,
                color: theme[mode].btnText,
              }}
              sxButtonRestore={{
                color: theme[mode].blueDark,
                borderColor: theme[mode].blueDark,
              }}
            />
          </Stack>
        }
      />
    </>
  );
};
