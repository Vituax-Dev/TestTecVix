import { Divider, IconButton, Stack } from "@mui/material";
import { TextRob18Font2M } from "../../../components/Text2M";
import { useZTheme } from "../../../stores/useZTheme";
import { useTranslation } from "react-i18next";
import { LabelInputVM } from "../../VirtualMachine/components/LabelInputVM";
import { useState } from "react";
import { useVmResource } from "../../../hooks/useVmResource";
import { TOptions } from "../../../types/FormType";
import { DropDowText } from "../../VirtualMachine/components/DropDowText";
import { SliderLabelNum } from "../../VirtualMachine/components/SliderLabelNum";
import { CheckboxLabel } from "../../VirtualMachine/components/CheckboxLabel";
import { Btn } from "../../../components/Buttons/Btn";
import { TextRob16Font1S } from "../../../components/Text1S";
import { ModalConfirmCreate } from "../../VirtualMachine/components/ModalConfirmCreate";
import { CloseXIcon } from "../../../icons/CloseXIcon";
import { useZMyVMsList } from "../../../stores/useZMyVMsList";
import { useZUserProfile } from "../../../stores/useZUserProfile";
import { PlayCircleIcon } from "../../../icons/PlayCircleIcon";
// import { PauseCircleIcon } from "../../../icons/PauseCircleIcon";
import { StopCircleIcon } from "../../../icons/StopCircleIcon";
import { TextRob16FontL } from "../../../components/TextL";
import { useStatusInfo } from "../../../hooks/useStatusInfo";
import { PasswordValidations } from "../../VirtualMachine/components/PasswordValidations";
import { ModalDeleteVM } from "./ModalDeleteVM";
import { AbsoluteBackDrop } from "../../../components/AbsoluteBackDrop";
import { ModalStartVM } from "./ModalStartVM";
import { ModalStopVM } from "./ModalStopVM";

interface IProps {
  onClose: (edit?: boolean) => void;
}
export const FormEditVM = ({ onClose }: IProps) => {
  const { theme, mode } = useZTheme();
  const { t } = useTranslation();
  const {
    storageOptions,
    localizationOptions,
    updateVM,
    updateVMStatus,
    validPassword,
    deleteVM,
    isLoadingDeleteVM,
    getNetworkType,
    getLocalization,
    getStorageType,
    isLoadingUpdateVM,
  } = useVmResource();

  const { statusHashMap } = useStatusInfo();
  const { currentVM, setCurrentVM } = useZMyVMsList();
  const { role } = useZUserProfile();
  const [vmPassword, setVmPassword] = useState(currentVM.pass);
  const [vmName, setVmName] = useState(currentVM.vmName);
  const [vmSO, setVmSO] = useState<TOptions>({
    label: currentVM.os,
    value: currentVM.os,
  });
  const [vmvCpu, setVmvCpu] = useState(currentVM.vCPU);
  const [vmMemory, setVmMemory] = useState(currentVM.ram);
  const [vmDisk, setVmDisk] = useState(currentVM.disk);
  // Usa o storageType do banco de dados ou o primeiro da lista como fallback
  const vmStorageFromDB = getStorageType({ storageTypeValue: currentVM.storageType });
  const [vmStorageType] = useState<TOptions | null>(vmStorageFromDB);
  // Usa o location do banco de dados ou o primeiro da lista como fallback
  const vmLocationFromDB = getLocalization({ locationValue: currentVM.location });
  const [vmLocalization] = useState<TOptions | null>(vmLocationFromDB);
  const [hasBackup, setHasBackup] = useState(currentVM.hasBackup);

  const [openConfirm, setOpenConfirm] = useState(false);
  const [status, setStatus] = useState<string | null>(currentVM.status);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [vmIDToStart, setVmIDToStart] = useState<number>(0);
  const [vmIDToStop, setVmIDToStop] = useState<number>(0);

  const handleCancel = () => {
    setVmPassword(currentVM.pass);
    setVmName(currentVM.vmName);
    setVmSO({
      label: currentVM.os,
      value: currentVM.os,
    });
    setVmvCpu(currentVM.vCPU);
    setVmMemory(currentVM.ram);
    setVmDisk(currentVM.disk);
    // setVmStorageType(null);
    // setVmLocalization(null);
    setHasBackup(currentVM.hasBackup);
    setStatus(currentVM.status);
    onClose();
  };

  const handleEditVm = async () => {
    setOpenConfirm(false);
    const isValidPass = validPassword(vmPassword);
    if (!isValidPass) return;

    // Dados atuais do formulário (apenas campos editáveis)
    const formData = {
      vmName,
      vCPU: vmvCpu,
      ram: vmMemory,
      disk: vmDisk,
      hasBackup,
      os: String(vmSO?.value) || "",
      status,
    };

    // Dados originais da VM
    const originalData = {
      vmName: currentVM.vmName,
      vCPU: currentVM.vCPU,
      ram: currentVM.ram,
      disk: currentVM.disk,
      hasBackup: currentVM.hasBackup,
      os: currentVM.os,
      status: currentVM.status,
    };

    // Filtra apenas campos que mudaram
    const changedFields = Object.fromEntries(
      Object.entries(formData).filter(
        ([key, value]) => value !== originalData[key as keyof typeof originalData]
      )
    );

    // Só chama API se houver mudanças
    if (Object.keys(changedFields).length > 0) {
      await updateVM(
        { ...originalData, ...changedFields, oldVM: currentVM },
        currentVM.idVM,
      );
    }
    onClose(true);
  };

  const handleConfirmDeleteVM = async () => {
    setOpenDeleteModal(false);
    const response = await deleteVM(currentVM.idVM);
    if (!response) return;
    setCurrentVM(null);
    onClose(true);
  };

  const handleStopVM = async () => {
    await updateVMStatus({
      idVM: currentVM.idVM,
      status: "STOPPED",
    });
    setStatus("STOPPED");
    onClose(true);
  };

  const handleStartVM = async () => {
    await updateVMStatus({
      idVM: currentVM.idVM,
      status: "RUNNING",
    });
    setStatus("RUNNING");
    onClose(true);
  };

  // vmPassword e vmLocalization não são editáveis, então não bloqueiam o botão
  const disabledBtn =
    !vmName ||
    !vmSO ||
    !vmvCpu ||
    !vmMemory ||
    !vmDisk;

  return (
    <>
      {Boolean(isLoadingDeleteVM || isLoadingUpdateVM) && (
        <AbsoluteBackDrop open={true} />
      )}
      <Stack
        sx={{
          width: "100%",
          gap: "24px",
        }}
      >
        {/* Title */}
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
            {t("createVm.vmEdit")}
          </TextRob18Font2M>
          <IconButton onClick={() => onClose()}>
            <CloseXIcon fill={theme[mode].gray} />
          </IconButton>
        </Stack>
        {/* Inputs */}

        {/* User and password */}
        <Stack
          sx={{
            gap: "24px",
            "@media (min-width: 660px)": {
              flexDirection: "row",
            },
          }}
        >
          <LabelInputVM
            disabled
            onChange={() => {}}
            value={"root"}
            label={t("createVm.userVM")}
            placeholder={t("createVm.name")}
          />
          <Stack
            sx={{
              width: "100%",
            }}
          >
            <LabelInputVM
              onChange={() => {}}
              value={vmPassword}
              label={t("createVm.password")}
              placeholder={t("createVm.userPassword")}
              type="password"
              disabled
            />
            <PasswordValidations vmPassword={vmPassword} />
          </Stack>
        </Stack>
        <Divider
          sx={{
            borderColor: theme[mode].grayLight,
          }}
        />
        <LabelInputVM
          onChange={setVmName}
          value={vmName}
          label={t("createVm.vmName")}
          placeholder={t("createVm.sampleName")}
          containerSx={{
            "@media (min-width: 660px)": {
              maxWidth: "288px",
            },
          }}
        />
        {/* Location and System */}
        <Stack
          sx={{
            gap: "24px",
            "@media (min-width: 660px)": {
              flexDirection: "row",
            },
          }}
        >
          <DropDowText
            disabled
            label={t("createVm.dataCenterLocation")}
            data={localizationOptions}
            value={vmLocalization}
            onChange={() => {}}
          />
          <DropDowText
            label={t("createVm.operationalSystem")}
            data={[]}
            value={vmSO}
            onChange={() => {}}
            disabled
          />
        </Stack>
        {/* Sliders */}
        <Stack
          sx={{
            gap: "24px",
            "@media (min-width: 660px)": {
              flexDirection: "row",
            },
          }}
        >
          <SliderLabelNum
            label={t("createVm.cpu")}
            value={vmvCpu}
            onChange={setVmvCpu}
            min={currentVM.vCPU || 1}
            max={16}
          />
          <SliderLabelNum
            label={t("createVm.memory")}
            value={vmMemory}
            onChange={setVmMemory}
            min={currentVM.ram || 1}
            max={128}
          />
          <SliderLabelNum
            label={t("createVm.disk")}
            value={vmDisk}
            onChange={setVmDisk}
            min={currentVM.disk || 50}
            max={2048}
            step={16}
          />
        </Stack>
        {/* Advanced options */}
        <Stack
          sx={{
            gap: "24px",
          }}
        >
          {/* Items */}
          <Stack
            sx={{
              gap: "24px",
              width: "50%",
              "@media (min-width: 660px)": {
                flexDirection: "row",
                width: "100%",
                gap: "40px",
              },
            }}
          >
            <DropDowText
              disabled
              label={t("createVm.storageType")}
              data={storageOptions}
              value={vmStorageType}
              onChange={() => {}}
              sxContainer={{
                "@media (min-width: 660px)": {
                  maxWidth: "180px",
                },
              }}
            />
            {/* Network Type */}
            <DropDowText
              disabled
              label={t("createVm.network")}
              data={[]}
              value={getNetworkType({
                networkTypeValue: currentVM.networkType,
              })}
              onChange={() => {}}
              sxContainer={{
                maxWidth: "280px",
              }}
            />
          </Stack>
          {/* Play Pause and Stop */}
          <TextRob18Font2M
            sx={{
              color: theme[mode].black,
              fontSize: "18px",
              fontWeight: "500",
              lineHeight: "24px",
            }}
          >
            {t("home.status", { status: statusHashMap[status] })}
          </TextRob18Font2M>
          {/* Actions buttons & Ips */}
          <Stack
            flexDirection={"column"}
            gap={"16px"}
            sx={{
              "@media (min-width: 660px)": {
                flexDirection: "row",
              },
            }}
          >
            {/* Actions buttons */}
            <Stack
              sx={{
                backgroundColor: theme[mode].grayLight,
                justifyContent: "flex-start",
                alignItems: "flex-start",
                border: "1px solid " + theme[mode].grayLight,
                borderRadius: "12px",
                padding: "8px",
                gap: "16px",
                width: "fit-content",
                height: "fit-content",
              }}
            >
              <IconButton
                disabled={
                  currentVM.status === "RUNNING" || currentVM.status === null
                }
                onClick={() => setVmIDToStart(currentVM.idVM)}
                sx={{
                  gap: "8px",
                  ":hover": { opacity: 0.8 },
                  ":disabled": { opacity: 0.5 },
                }}
              >
                <PlayCircleIcon fill={theme[mode].greenLight} />
                <TextRob16FontL
                  sx={{
                    fontWeight: 400,
                    lineHeight: "16px",
                    color: theme[mode].primary,
                  }}
                >
                  {t("home.start")}
                </TextRob16FontL>
              </IconButton>
              <IconButton
                disabled={
                  currentVM.status === "STOPPED" || currentVM.status === null
                }
                onClick={() => setVmIDToStop(currentVM.idVM)}
                sx={{
                  gap: "8px",
                  ":hover": { opacity: 0.8 },
                  ":disabled": { opacity: 0.5 },
                }}
              >
                <StopCircleIcon fill={theme[mode].lightRed} />
                <TextRob16FontL
                  sx={{
                    fontWeight: 400,
                    lineHeight: "16px",
                    color: theme[mode].primary,
                  }}
                >
                  {t("home.stop")}
                </TextRob16FontL>
              </IconButton>
            </Stack>
          </Stack>
          {/* Backup */}
          <CheckboxLabel
            value={hasBackup}
            onChange={setHasBackup}
            label={t("createVm.autoBackup")}
          />
        </Stack>
        {/* Action button */}
        <Stack
          sx={{
            gap: "24px",
            "@media (min-width: 660px)": {
              flexDirection: "row",
            },
          }}
        >
          <Btn
            onClick={handleCancel}
            sx={{
              display: "none",
              padding: "9px 24px",
              backgroundColor: theme[mode].grayLight,
              borderRadius: "12px",
              "@media (min-width: 660px)": {
                minWidth: "120px",
                display: "inline",
              },
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
            disabled={disabledBtn}
            onClick={() => setOpenConfirm(true)}
            sx={{
              padding: "9px 24px",
              backgroundColor: theme[mode].blue,
              borderRadius: "12px",
              "@media (min-width: 660px)": {
                minWidth: "160px",
              },
            }}
          >
            <TextRob16Font1S
              sx={{
                color: theme[mode].btnText,
                fontSize: "16px",
                fontWeight: "500",
                lineHeight: "20px",
              }}
            >
              {t("createVm.edit")}
            </TextRob16Font1S>
          </Btn>
          <Btn
            disabled={role !== "admin"}
            onClick={() => setOpenDeleteModal(true)}
            sx={{
              padding: "9px 24px",
              backgroundColor: "transparent",
              border: "1px solid " + theme[mode].danger,
              borderRadius: "12px",
              maxWidth: "150px",
              marginLeft: "auto",
              "@media (min-width: 660px)": {},
            }}
          >
            <TextRob16Font1S
              sx={{
                color: theme[mode].danger,
                fontSize: "16px",
                fontWeight: "400",
                lineHeight: "20px",
              }}
            >
              {t("createVm.deleteVM")}
            </TextRob16Font1S>
          </Btn>
        </Stack>
      </Stack>
      {openConfirm && (
        <ModalConfirmCreate
          isEditing
          title={t("createVm.vmEdit")}
          textConfirmBtn={t("createVm.edit")}
          open={openConfirm}
          onClose={() => setOpenConfirm(false)}
          onConfirm={handleEditVm}
          hasBackup={hasBackup}
          vmUser={"root"}
          vmPassword={vmPassword}
          vmName={vmName}
          vmSO={vmSO?.label}
          vmvCpu={vmvCpu.toString()}
          vmMemory={vmMemory.toString()}
          vmDisk={vmDisk.toString()}
          vmStorageType={vmStorageType?.label}
          vmLocalization={vmLocalization?.label}
          vmNetwork={
            getNetworkType({
              networkTypeValue: currentVM.networkType,
            })?.label
          }
          status={statusHashMap[status]}
        />
      )}
      {openDeleteModal && (
        <ModalDeleteVM
          open={openDeleteModal}
          onClose={() => setOpenDeleteModal(false)}
          onConfirm={handleConfirmDeleteVM}
          onCancel={() => setOpenDeleteModal(false)}
        />
      )}
      {Boolean(vmIDToStart) && (
        <ModalStartVM
          vmName={vmName}
          idVM={vmIDToStart}
          onConfirm={handleStartVM}
          onCancel={() => setVmIDToStart(0)}
        />
      )}
      {Boolean(vmIDToStop) && (
        <ModalStopVM
          vmName={vmName}
          idVM={vmIDToStop}
          onConfirm={handleStopVM}
          onCancel={() => setVmIDToStop(0)}
        />
      )}
    </>
  );
};
