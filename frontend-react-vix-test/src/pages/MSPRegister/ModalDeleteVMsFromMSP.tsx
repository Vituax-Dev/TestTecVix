import React, { useEffect } from "react";
import { useZTheme } from "../../stores/useZTheme";
import { Modal, Stack } from "@mui/material";
import { IBrandMasterBasicInfo } from "../../types/BrandMasterTypes";
import { IVMCreatedResponse } from "../../types/VMTypes";
import { useTranslation } from "react-i18next";
import { TextRob16Font1S } from "../../components/Text1S";
import { makeScroll } from "../../utils/makeScroll";
import { CTAsDoubleButtons } from "../../components/Buttons/CTAsDoubleButtons";

interface IProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  msp: IBrandMasterBasicInfo | null;
  vms: IVMCreatedResponse[];
}

export const ModalDeleteVMsFromMSP = ({
  open,
  onClose,
  msp,
  vms,
  onConfirm,
}: IProps) => {
  const { theme, mode } = useZTheme();
  const { t } = useTranslation();

  useEffect(() => {
    if (!msp) {
      onClose();
    }
  }, [msp]);

  if (!msp) {
    return null;
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Stack
        sx={{
          alignSelf: "center",
          justifySelf: "center",
          gap: "20px",
          boxSizing: "border-box",
          padding: "24px",
          borderRadius: "16px",
          background: theme[mode].mainBackground,
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          justifyContent: "center",
          alignItems: "flex-start",
          maxWidth: "600px",
          width: "90%",
        }}
      >
        {/* Title */}
        <Stack
          sx={{
            gap: "8px",
          }}
        >
          <TextRob16Font1S
            sx={{
              color: theme[mode].gray,
              fontWeight: "500",
              fontSize: "20px",
            }}
          >
            {t("mspRegister.mspDeleted", {
              brandName: `${msp.brandName} - #${msp.idBrandMaster}`,
            })}
          </TextRob16Font1S>
          <TextRob16Font1S
            sx={{
              color: theme[mode].gray,
              fontWeight: "400",
            }}
          >
            {t("mspRegister.doYouWantToDeleteThisVMs")}
          </TextRob16Font1S>
        </Stack>
        {/* VM List */}
        <Stack
          sx={{
            maxHeight: "300px",
            width: "100%",
            overflowY: "auto",
            gap: "8px",
            paddingRight: "8px",
            ...makeScroll(theme, mode),
          }}
        >
          {vms.map((vm, index) => (
            <Stack
              key={`vm-${index}-${vm.idVM}`}
              sx={{
                borderRadius: "8px",
                border: `1px solid ${theme[mode].black}`,
                padding: "8px",
              }}
            >
              <TextRob16Font1S
                sx={{
                  color: theme[mode].black,
                }}
              >{`#${vm.idVM} - ${vm.vmName}`}</TextRob16Font1S>
              <TextRob16Font1S
                sx={{
                  color: theme[mode].gray,
                  fontSize: "14px",
                }}
              >
                {vm.brandMaster?.brandName}
                {Boolean(vm.company?.companyName) && (
                  <span
                    style={{
                      color: theme[mode].gray,
                      fontSize: "12px",
                    }}
                  >
                    {" - "}
                    {vm.company?.companyName}
                  </span>
                )}
              </TextRob16Font1S>
            </Stack>
          ))}
        </Stack>
        {/* CTA Btns */}
        <CTAsDoubleButtons
          sxButtonSave={{
            color: theme[mode].mainBackground,
          }}
          sxButtonRestore={{
            color: theme[mode].black,
            border: `1px solid ${theme[mode].black}`,
          }}
          sx={{
            width: "100%",
          }}
          handleSave={onConfirm}
          handleRestore={onClose}
          labelSave={t("mspRegister.delete")}
          labelRestore={t("mspRegister.close")}
        />
      </Stack>
    </Modal>
  );
};
