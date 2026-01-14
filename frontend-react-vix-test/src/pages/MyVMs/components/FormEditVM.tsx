import { Divider, IconButton, Stack } from "@mui/material";
import { TextRob18Font2M } from "../../../components/Text2M";
import { useZTheme } from "../../../stores/useZTheme";
import { useTranslation } from "react-i18next";
import { LabelInputVM } from "../../VirtualMachine/components/LabelInputVM";
import { useEffect, useState } from "react";
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
import { StopCircleIcon } from "../../../icons/StopCircleIcon";
import { TextRob16FontL } from "../../../components/TextL";
import { useStatusInfo } from "../../../hooks/useStatusInfo";
import { PasswordValidations } from "../../VirtualMachine/components/PasswordValidations";
import { ModalDeleteVM } from "./ModalDeleteVM";
import { AbsoluteBackDrop } from "../../../components/AbsoluteBackDrop";
import { ModalStartVM } from "./ModalStartVM";
import { ModalStopVM } from "./ModalStopVM";
import { osOptions } from "../../../utils/osOptions";

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
    validPassword,
    deleteVM,
    isLoadingDeleteVM,
    getNetworkType,
    isLoadingUpdateVM,
  } = useVmResource();

  const { statusHashMap } = useStatusInfo();
  const { currentVM, setCurrentVM } = useZMyVMsList();
  const { role } = useZUserProfile();

  // Estados inicializados com os valores da VM atual
  const [vmPassword, setVmPassword] = useState(currentVM?.pass || "");
  const [vmName, setVmName] = useState(currentVM?.vmName || "");
  const [vmSO, setVmSO] = useState<TOptions>({
    label: currentVM?.os || "",
    value: currentVM?.os || "",
  });
  const [vmvCpu, setVmvCpu] = useState(currentVM?.vCPU || 1);
  const [vmMemory, setVmMemory] = useState(currentVM?.ram || 1);
  const [vmDisk, setVmDisk] = useState(currentVM?.disk || 50);
  const [vmStorageType] = useState<TOptions>({
    value: "ssd",
    label: "SSD",
  });
  const [vmLocalization] = useState<TOptions>({
    label: localizationOptions[0]?.label || "",
    value: localizationOptions[0]?.value || "",
  });
  const [hasBackup, setHasBackup] = useState(currentVM?.hasBackup || false);

  const [openConfirm, setOpenConfirm] = useState(false);
  const [status, setStatus] = useState<string | null>(
    currentVM?.status || null,
  );
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [vmIDToStart, setVmIDToStart] = useState<number>(0);
  const [vmIDToStop, setVmIDToStop] = useState<number>(0);

  useEffect(() => {
    if (currentVM) {
      setVmPassword(currentVM.pass || "");
      setVmName(currentVM.vmName || "");
      setVmSO({
        label: currentVM.os || "",
        value: currentVM.os || "",
      });
      setVmvCpu(currentVM.vCPU || 1);
      setVmMemory(currentVM.ram || 1);
      setVmDisk(currentVM.disk || 50);
      setHasBackup(currentVM.hasBackup || false);
      setStatus(currentVM.status || null);
    }
  }, [currentVM]);

  const handleCancel = () => {
    if (currentVM) {
      setVmPassword(currentVM.pass);
      setVmName(currentVM.vmName);
      setVmSO({
        label: currentVM.os,
        value: currentVM.os,
      });
      setVmvCpu(currentVM.vCPU);
      setVmMemory(currentVM.ram);
      setVmDisk(currentVM.disk);
      setHasBackup(currentVM.hasBackup);
      setStatus(currentVM.status);
    }
    onClose();
  };

  const handleEditVm = async () => {
    if (!currentVM) return;

    // Verifica se a senha foi alterada e não está vazia
    const passwordChanged = vmPassword && vmPassword !== currentVM.pass;

    // Valida a senha apenas se ela foi alterada
    if (passwordChanged) {
      const isValidPass = validPassword(vmPassword);
      if (!isValidPass) {
        setOpenConfirm(false);
        return;
      }
    }

    const vmData = {
      vmName: vmName,
      vCPU: vmvCpu,
      ram: vmMemory,
      disk: vmDisk,
      hasBackup: hasBackup,
      os: String(vmSO?.value) || "",
      // Só envia a senha se ela foi alterada e é válida
      ...(passwordChanged && { pass: vmPassword }),
    };

    setOpenConfirm(false);

    const success = await updateVM(vmData, currentVM.idVM);

    if (success) {
      onClose(true);
    }
  };

  const handleConfirmDeleteVM = async () => {
    if (!currentVM) return;

    setOpenDeleteModal(false);
    const response = await deleteVM(currentVM.idVM);

    if (response) {
      setCurrentVM(null);
      onClose(true);
    }
  };

  const handleStopVM = async () => {
    // Atualiza apenas o status local, não fecha o modal
    setStatus("STOPPED");
    setVmIDToStop(0);
    // Não chama onClose aqui para manter o modal aberto
  };

  const handleStartVM = async () => {
    // Atualiza apenas o status local, não fecha o modal
    setStatus("RUNNING");
    setVmIDToStart(0);
    // Não chama onClose aqui para manter o modal aberto
  };

  // Validação do botão - verifica se todos os campos obrigatórios estão preenchidos
  // A senha não é obrigatória na edição (pode manter a atual)
  const disabledBtn =
    !vmName ||
    !vmSO?.value ||
    !vmvCpu ||
    !vmMemory ||
    !vmDisk ||
    !vmLocalization?.value;

  // Verifica se há mudanças em relação aos valores originais
  // Removida a verificação de senha da condição de hasChanges
  const hasChanges =
    currentVM &&
    (vmName !== currentVM.vmName ||
      vmSO?.value !== currentVM.os ||
      vmvCpu !== currentVM.vCPU ||
      vmMemory !== currentVM.ram ||
      vmDisk !== currentVM.disk ||
      hasBackup !== currentVM.hasBackup);

  // Verifica se o usuário é admin
  const isAdmin = role === "admin";

  if (!currentVM) {
    return null;
  }

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
              onChange={setVmPassword}
              value={vmPassword}
              label={t("createVm.password")}
              placeholder={t("createVm.userPassword")}
              type="password"
            />
            {vmPassword && vmPassword !== currentVM.pass && (
              <PasswordValidations vmPassword={vmPassword} />
            )}
          </Stack>
        </Stack>

        <Divider
          sx={{
            borderColor: theme[mode].grayLight,
          }}
        />

        {/* VM Name */}
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
            data={osOptions}
            value={vmSO}
            onChange={setVmSO}
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

          {/* Status and Action buttons */}
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

          {/* Actions buttons */}
          <Stack
            flexDirection={"column"}
            gap={"16px"}
            sx={{
              "@media (min-width: 660px)": {
                flexDirection: "row",
              },
            }}
          >
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
                disabled={status === "RUNNING" || status === null}
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
                disabled={status === "STOPPED" || status === null}
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

        {/* Action buttons */}
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
            disabled={disabledBtn || !hasChanges}
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
            disabled={!isAdmin}
            onClick={() => setOpenDeleteModal(true)}
            sx={{
              padding: "9px 24px",
              backgroundColor: "transparent",
              border: "1px solid " + theme[mode].danger,
              borderRadius: "12px",
              maxWidth: "150px",
              marginLeft: "auto",
              opacity: !isAdmin ? 0.5 : 1,
              cursor: !isAdmin ? "not-allowed" : "pointer",
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

      {/* Modals */}
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
