import React from "react";
import { ModalSimple } from "../../../components/Modal/ModalSimple";
import { useTranslation } from "react-i18next";
import { Stack } from "@mui/material";
import { TextRob16FontL } from "../../../components/TextL";
import { useZTheme } from "../../../stores/useZTheme";
import { CTAsDoubleButtons } from "../../../components/Buttons/CTAsDoubleButtons";
import { useVmResource } from "../../../hooks/useVmResource";
import { AbsoluteBackDrop } from "../../../components/AbsoluteBackDrop";
import { StopCircleIcon } from "../../../icons/StopCircleIcon";
import { EVMStatus } from "../../../types/VMTypes";

interface IProps {
  idVM: number;
  vmName?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ModalStopVM = ({ idVM, onConfirm, onCancel, vmName }: IProps) => {
  const { mode, theme } = useZTheme();
  const { t } = useTranslation();
  const { isLoading, updateVMStatus } = useVmResource();

  const handleConfirm = async () => {
    const result = await updateVMStatus({ idVM, status: EVMStatus.stopped });
    if (result) {
      onConfirm();
    }
  };

  return (
    <>
      {isLoading && <AbsoluteBackDrop open={isLoading} />}
      <ModalSimple
        sx={{
          maxWidth: "600px",
        }}
        open={Boolean(idVM)}
        onClose={onCancel}
        title={
          <Stack
            sx={{
              flexDirection: "row",
              gap: "8px",
              alignItems: "center",
            }}
          >
            <StopCircleIcon fill={theme[mode].lightRed} />
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
              {t("alerts.alertStopVM")}
              <span
                style={{
                  marginLeft: "8px",
                  color: theme[mode].gray,
                  fontWeight: "600",
                  lineHeight: "20px",
                }}
              >
                {`#${idVM} - ${vmName}`}
              </span>
            </TextRob16FontL>
            <CTAsDoubleButtons
              labelSave={t("alerts.confirm")}
              labelRestore={t("alerts.cancel")}
              handleRestore={onCancel}
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
