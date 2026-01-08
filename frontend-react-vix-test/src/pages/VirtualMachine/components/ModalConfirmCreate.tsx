import { Box, IconButton, Modal, Stack, SxProps } from "@mui/material";
import { useZTheme } from "../../../stores/useZTheme";
import { Btn } from "../../../components/Buttons/Btn";
import { TextRob16Font1S } from "../../../components/Text1S";
import { useTranslation } from "react-i18next";
import { CloseXIcon } from "../../../icons/CloseXIcon";
import { CheckboxLabel } from "./CheckboxLabel";
import { TextRob18Font2M } from "../../../components/Text2M";
import { PreviewValue } from "./PreviewValue";
import { TextRob16FontL } from "../../../components/TextL";
import { makeEllipsis } from "../../../utils/makeEllipsis";
import { AgreeCostsTerms } from "./AgreeCostsTerms";
import { useState } from "react";

interface IProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  sx?: SxProps;
  hasBackup: boolean;
  vmUser: string;
  vmPassword: string;
  vmName: string;
  vmSO: string | null | undefined;
  vmvCpu: string | null | undefined;
  vmMemory: string | null | undefined;
  vmDisk: string | null | undefined;
  vmStorageType: string | null | undefined;
  vmLocalization: string | null | undefined;
  vmNetwork?: string | null | undefined;
  title?: string;
  textConfirmBtn?: string;
  status?: string | null;
  isEditing?: boolean;
}

export const ModalConfirmCreate = ({
  open,
  onClose,
  sx,
  onConfirm,
  hasBackup,
  vmUser,
  vmPassword,
  vmName,
  vmSO,
  vmvCpu,
  vmMemory,
  vmDisk,
  vmStorageType,
  vmLocalization,
  title,
  textConfirmBtn,
  status,
  isEditing = false,
  vmNetwork,
}: IProps) => {
  const { mode, theme } = useZTheme();
  const { t } = useTranslation();
  const [agreeCheckBox, setAgreeCheckBox] = useState(false);

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-hidden={!open}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Stack
        sx={{
          width: "70%",
          maxWidth: "1000px",
          height: "500px",
          maxHeight: "80vh",
          backgroundColor: theme[mode].mainBackground,
          borderRadius: "12px",
          padding: "24px",
          gap: "24px",
          overflowY: "auto",
          ...sx,
        }}
      >
        {/* Header */}
        <Stack
          sx={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TextRob18Font2M
            sx={{
              color: theme[mode].black,
              fontSize: "18px",
              fontWeight: "500",
              lineHeight: "24px",
            }}
          >
            {title ? title : t("createVm.vmRegister")}
          </TextRob18Font2M>
          <IconButton onClick={onClose}>
            <CloseXIcon fill={theme[mode].gray} />
          </IconButton>
        </Stack>
        {/* List */}
        <Box
          sx={{
            gap: "24px",
            display: "flex",
            flexWrap: "nowrap",
            flexDirection: "row",
            "@media (max-width: 1200px)": {
              flexDirection: "column",
            },
          }}
        >
          <Box>
            <Stack
              className="w-full"
              sx={{
                gap: "24px",
              }}
            >
              {/* Inputs */}
              <Stack
                flexDirection={"column"}
                width={"100%"}
                justifyContent={"space-between"}
                gap={"16px"}
                sx={{
                  "@media (min-width: 800px)": {
                    flexDirection: "row",
                  },
                }}
              >
                {/* User and password */}
                <PreviewValue value={vmUser} label={t("createVm.userVM")} />
                <PreviewValue
                  value={vmPassword}
                  label={t("createVm.password")}
                  type="password"
                />
                <PreviewValue value={vmName} label={t("createVm.vmName")} />
              </Stack>
              <Stack
                flexDirection={"column"}
                width={"100%"}
                justifyContent={"space-between"}
                gap={"16px"}
                sx={{
                  "@media (min-width: 800px)": {
                    flexDirection: "row",
                  },
                }}
              >
                {/* Location and System */}
                <PreviewValue
                  label={t("createVm.dataCenterLocation")}
                  value={vmLocalization}
                />
                <PreviewValue
                  label={t("createVm.operationalSystem")}
                  value={vmSO}
                />
              </Stack>
              <Stack
                flexDirection={"column"}
                width={"100%"}
                justifyContent={"space-between"}
                gap={"16px"}
                sx={{
                  "@media (min-width: 800px)": {
                    flexDirection: "row",
                  },
                }}
              >
                {/* Sliders */}
                <PreviewValue label={t("createVm.cpu")} value={vmvCpu} />
                <PreviewValue label={t("createVm.memory")} value={vmMemory} />
                <PreviewValue label={t("createVm.disk")} value={vmDisk} />
              </Stack>
            </Stack>

            {/* Advanced options */}
            <Box
              sx={{
                width: "100%",
                maxWidth: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: "16px",
              }}
            >
              <Stack
                sx={{
                  gap: "16px",
                }}
              >
                {/* Owership */}
                {!isEditing && (
                  <Stack
                    sx={{
                      width: "100%",
                    }}
                  >
                    <TextRob16FontL
                      sx={{
                        fontWeight: 400,
                        lineHeight: "16px",
                        color: theme[mode].primary,
                        ...makeEllipsis(),
                      }}
                    >
                      {t("generic.ownership")}:
                      <span
                        style={{
                          fontSize: "16px",
                          paddingLeft: "4px",
                          fontWeight: 500,
                        }}
                      >
                        {"Vituax"}
                      </span>
                    </TextRob16FontL>
                  </Stack>
                )}
                {/* Storage & Network */}
                <Stack
                  width={"100%"}
                  justifyContent={"space-between"}
                  gap={"16px"}
                  sx={{
                    flexDirection: "column",
                    "@media (min-width: 800px)": {
                      flexDirection: "row",
                    },
                  }}
                >
                  {/* Items */}
                  <PreviewValue
                    label={t("createVm.storageType")}
                    value={vmStorageType}
                    containerSx={{
                      flexDirection: "column",
                      alignItems: "flex-start",
                      "@media (min-width: 800px)": {
                        flexDirection: "row",
                      },
                    }}
                    sx={{
                      maxWidth: "120px",
                    }}
                  />
                  {/* Network */}
                  <PreviewValue
                    label={t("createVm.network")}
                    value={vmNetwork}
                    containerSx={{
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                      "@media (min-width: 800px)": {
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      },
                    }}
                    sx={{
                      maxWidth: "250px",
                      width: "100%",
                    }}
                  />
                </Stack>

                {/* Status */}
                {status && (
                  <Stack
                    flexDirection={"column"}
                    width={"100%"}
                    justifyContent={"space-between"}
                    gap={"16px"}
                    sx={{
                      "@media (min-width: 800px)": {
                        flexDirection: "row",
                      },
                    }}
                  >
                    {/* Item */}
                    <TextRob18Font2M
                      sx={{
                        color: theme[mode].black,
                        fontSize: "18px",
                        fontWeight: "500",
                        lineHeight: "24px",
                      }}
                    >
                      {t("home.status", { status: status })}
                    </TextRob18Font2M>
                  </Stack>
                )}
              </Stack>
            </Box>
          </Box>
          <Box
            sx={{
              "@media (max-width: 1200px)": { display: "none" },
              width: "1px",
              height: "100%",
              background: theme[mode].grayLight,
              // margin: "4px 0",
              borderRadius: "4px",
            }}
          />
        </Box>
        {/* Action button */}
        <Stack
          flexDirection={"row"}
          width={"100%"}
          justifyContent={"space-between"}
          gap={"16px"}
        >
          {/* Backup */}
          <CheckboxLabel
            onChange={() => {}}
            disabled
            value={hasBackup}
            label={t("createVm.autoBackup")}
          />
        </Stack>
        <AgreeCostsTerms
          agreeCheckBox={agreeCheckBox}
          setAgreeCheckBox={setAgreeCheckBox}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: "24px",
          }}
        >
          <Btn
            onClick={onClose}
            sx={{
              padding: "9px 24px",
              backgroundColor: theme[mode].grayLight,
              borderRadius: "12px",
            }}
          >
            <TextRob16Font1S
              sx={{
                color: theme[mode].gray,
                fontSize: "16px",
                fontWeight: "500",
                lineHeight: "16px",
              }}
            >
              {t("createVm.cancelBtn")}
            </TextRob16Font1S>
          </Btn>
          <Btn
            onClick={onConfirm}
            sx={{
              padding: "9px 24px",
              backgroundColor: theme[mode].blue,
              borderRadius: "12px",
              "@media (min-width: 800px)": {
                minWidth: "160px",
              },
            }}
            disabled={!agreeCheckBox}
          >
            <TextRob16Font1S
              sx={{
                color: theme[mode].btnText,
                fontSize: "16px",
                fontWeight: "500",
                lineHeight: "20px",
              }}
            >
              {textConfirmBtn ? textConfirmBtn : t("createVm.createBtn")}
            </TextRob16Font1S>
          </Btn>
        </Box>
      </Stack>
    </Modal>
  );
};
