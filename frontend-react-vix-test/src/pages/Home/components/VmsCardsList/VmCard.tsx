import { Box, Button, Divider, IconButton, Stack, Tooltip } from "@mui/material";
import { useZTheme } from "../../../../stores/useZTheme";
import { useTranslation } from "react-i18next";

import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { shadow } from "../../../../utils/shadow";
import { makeEllipsis } from "../../../../utils/makeEllipsis";
import { TextRob20Font1MC } from "../../../../components/Text1MC";
import { PencilIcon } from "../../../../icons/PencilIcon";
import { TagStatus } from "./TagStatus";
import { Btn } from "../../../../components/Buttons/Btn";
import { TextRob12Font2Xs } from "../../../../components/Text2Xs";
import { checkStatus } from "../../../../utils/checkStatus";
import { TextRob16FontL } from "../../../../components/TextL";
import { ModalChangeValueInput } from "../../../../components/Modal/ModalChangeValueInput";
import { useSelfPosition } from "../../../../hooks/useSelfPosition";
import { ModalSlider } from "../../../../components/Modal/ModalSlider";
import { ModalWarningDisk } from "./ModalWarningDisk";
import { useVmResource } from "../../../../hooks/useVmResource";
import { VmCardSkeleton } from "./VmCardSkeleton";
import { useZGlobalVar } from "../../../../stores/useZGlobalVar";
import { ChartBarIcon } from "../../../../icons/ChartIcon";
import { TextRob14Font1Xs } from "../../../../components/Text1Xs";
import { TerminalIcon } from "../../../../icons/TerminalIcon";
import { MonitorIcon } from "../../../../icons/MonitorIcon";
import { IVMTask, taskMock } from "../../../../types/VMTypes";
import { usePermissions } from "../../../../hooks/usePermissions";

export interface IVmCardProps {
  vmId: number;
  vmName: string;
  status: string | null;
  cpu: number;
  memory: number;
  disk: number;
  os: string;
  task?: IVMTask;
  owner?: string;
  logo?: string;
  idBrandMaster?: number | null;
}

export const VmCard = ({
  vmId,
  vmName,
  status,
  cpu,
  memory,
  disk,
  os,
  task,
  owner,
  idBrandMaster,
}: IVmCardProps) => {
  const { mode, theme } = useZTheme();
  const { t } = useTranslation();
  const { canControlVM } = usePermissions();
  // Check if user can control this specific VM based on their company
  const canControl = canControlVM({ idBrandMaster });
  const [vmNameState, setVmNameState] = useState<string | number>(vmName);
  const [cpuState, setCpuState] = useState<number | string>(cpu);
  const [memoryState, setMemoryState] = useState<number | string>(memory);
  const [diskState, setDiskState] = useState<number | string>(disk);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [statusState, setStatusState] = useState(status);
  const [preStatusState, setPreStatusState] = useState<string | null>(status);
  const [openModal, setOpenModal] = useState(false);
  const [openModalSlider, setOpenModalSlider] = useState(false);
  const [openModalWarning, setOpenModalWarning] = useState(false);
  const [preDisk, setPreDisk] = useState<number | string>(0);
  const [taskState, setTaskState] = useState(task);
  const { ref, position } = useSelfPosition(openModalSlider);
  const {
    updateThisVm,
    setUpdateThisVm,
    currentIdVM,
    setCurrentIdVM,
    setCurrentVMOS,
    setCurrentVMName,
    setCurrentVMStatus,
  } = useZGlobalVar();

  const {
    updateNameVm,
    updateDiskSizeVm,
    updateVMStatus,
    getVMById: getVMByIdResource,
    isLoading,
    getOS,
  } = useVmResource();

  const getVMById = async () => {
    const vm = await getVMByIdResource(vmId);
    if (!vm) return setUpdateThisVm(null);
    setVmNameState(vm.vmName);
    setCpuState(vm.vCPU);
    setMemoryState(vm.ram);
    setDiskState(vm.disk);
    setStatusState(vm.status);
    setPreStatusState(vm.status);
    setTaskState(taskMock);

    setPreDisk(0);
    setShowConfirmation(false);
    setOpenModalWarning(false);
    setOpenModalSlider(false);
    setOpenModal(false);
    setUpdateThisVm(null);
  };

  const handleCancel = () => {
    setShowConfirmation(false);
    setStatusState(preStatusState);
  };

  const handleConfirm = async () => {
    if (statusState !== preStatusState) {
      // Call API to update VM status
      const result = await updateVMStatus({
        idVM: vmId,
        status: statusState as "RUNNING" | "STOPPED" | "PAUSED",
      });
      if (result) {
        setPreStatusState(statusState);
        // Atualiza status global para os gráficos pararem/iniciarem
        setCurrentVMStatus(statusState as "RUNNING" | "STOPPED" | "PAUSED");
      } else {
        // Revert status on error
        setStatusState(preStatusState);
      }
      await getVMById();
    }
    setShowConfirmation(false);
  };

  const handleStop = () => {
    setStatusState("STOPPED");
    if (checkStatus(statusState, taskState?.action).isRunning)
      setShowConfirmation(true);
  };

  const handleStart = () => {
    setStatusState("RUNNING");
    if (!checkStatus(statusState, taskState?.action).isRunning)
      setShowConfirmation(true);
  };

  const closeModalWarning = () => {
    setOpenModalWarning(false);
    setPreDisk(0);
  };

  const confirmWarning = async () => {
    await updateDiskSizeVm({ idVM: vmId, disk: +preDisk });
    setDiskState(preDisk);
    setOpenModalWarning(false);
    await getVMById();
  };

  const confirmChangeName = async (val: string) => {
    setVmNameState(val);
    // Atualiza o nome global se for a VM selecionada nos gráficos
    if (vmId === currentIdVM) {
      setCurrentVMName(val);
    }
    await updateNameVm({ idVM: vmId, vmName: val.toString() });
    await getVMById();
  };

  const hasPandingTaskShutdown =
    taskState?.action === "pending" && taskState?.operation === "shutdown";
  const hasPandingTaskStart =
    taskState?.action === "pending" && taskState?.operation === "start";

  const actionExec =
    Boolean(checkStatus(statusState).isRunning && !hasPandingTaskShutdown) ||
    hasPandingTaskStart;
  const actionPause =
    Boolean(!checkStatus(statusState).isRunning && !hasPandingTaskStart) ||
    hasPandingTaskShutdown;

  useEffect(() => {
    if (updateThisVm === vmId) {
      getVMById();
    }
  }, [updateThisVm, vmId]);

  if (isLoading) return <VmCardSkeleton />;
  return (
    <>
      <Stack
        sx={{
          height: "315px",
          minWidth: "200px",
          maxWidth: "200px",
          borderRadius: "16px",
          background: theme[mode].mainBackground,
          padding: "24px",
          position: "relative",
          boxShadow: `0px 4px 4px ${shadow(mode)}`,
        }}
      >
        {/* VM Name */}
        <Stack
          width={"100%"}
          flexDirection={"row"}
          sx={{ alignItems: "center", justifyContent: "space-between" }}
        >
          <TextRob20Font1MC
            sx={{
              ...makeEllipsis(),
              color: theme[mode].primary,
              lineHeight: "20px",
            }}
          >
            {vmNameState}
          </TextRob20Font1MC>
          <Tooltip title={!canControl ? t("permissions.cannotControlVM") : ""}>
            <span>
              <IconButton
                onClick={() => canControl && setOpenModal(true)}
                disabled={!canControl}
                sx={{
                  backgroundColor: canControl ? theme[mode].blue : theme[mode].grayLight,
                  padding: "2px",
                  width: "20px",
                  height: "20px",
                  "&:hover": {
                    backgroundColor: canControl ? theme[mode].blue : theme[mode].grayLight,
                    opacity: 0.8,
                  },
                }}
              >
                <PencilIcon fill={canControl ? "#FFFFFF" : theme[mode].tertiary} />
              </IconButton>
            </span>
          </Tooltip>
        </Stack>
        {/* Status */}
        <Stack mt={"12px"}>
          <TagStatus
            status={preStatusState}
            action={taskState?.action}
            task={taskState?.task}
          />
        </Stack>
        {/* Actions */}
        <Tooltip title={!canControl ? t("permissions.cannotControlVM") : ""}>
          <Stack
            sx={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "center",
              mt: "16px",
            }}
          >
            {/* Start */}
            <Btn
              disabled={!canControl || checkStatus(statusState, taskState?.action).isWaiting}
              onClick={handleStart}
              className="w-full"
              sx={{
                borderRadius: "8px 0px 0px 8px",
                padding: "0px",
                backgroundColor: actionExec ? theme[mode].blue : "transparent",
                border:
                  checkStatus(statusState, taskState?.action).isStopped ||
                    checkStatus(statusState, taskState?.action).isPaused
                    ? "1px solid"
                    : "0px solid",
                borderColor: actionExec ? theme[mode].blue : theme[mode].tertiary,
                opacity: !canControl ? 0.5 : 1,
              }}
            >
              <TextRob12Font2Xs
                sx={{
                  color: actionExec ? theme[mode].btnText : theme[mode].tertiary,
                  fontWeight: actionExec ? "500" : "400",
                  letterSpacing: "0.5px",
                  lineHeight: "22px",
                }}
              >
                {t("home.start")}
              </TextRob12Font2Xs>
            </Btn>
            {/* Stop */}
            <Btn
              disabled={!canControl || checkStatus(statusState, taskState?.action).isWaiting}
              onClick={handleStop}
              className="w-full"
              sx={{
                borderRadius: "0px 8px 8px 0px",
                padding: "0px",
                backgroundColor: actionPause
                  ? theme[mode].blueMedium
                  : "transparent",
                border: checkStatus(statusState, taskState?.action).isRunning
                  ? "1px solid"
                  : "0px solid",
                borderColor: actionPause
                  ? theme[mode].blueMedium
                  : theme[mode].tertiary,
                opacity: !canControl ? 0.5 : 1,
              }}
            >
              <TextRob12Font2Xs
                sx={{
                  color: actionPause ? theme[mode].btnText : theme[mode].tertiary,
                  letterSpacing: "0.5px",
                  fontWeight: actionPause ? "500" : "400",
                  lineHeight: "22px",
                }}
              >
                {t("home.stop")}
              </TextRob12Font2Xs>
            </Btn>
          </Stack>
        </Tooltip>
        {/* Owner */}
        <Stack
          sx={{
            marginTop: "6px",
            marginBottom: "6px",
          }}
        >
          <TextRob12Font2Xs
            sx={{
              color: theme[mode].gray,
              fontSize: "10px",
              fontWeight: "300",
              letterSpacing: "0.8px",
              ...makeEllipsis(),
            }}
          >
            {owner}
          </TextRob12Font2Xs>
        </Stack>
        {/* Infos */}
        <Stack width={"100%"}>
          {/* Cpu */}
          <Stack
            sx={{
              width: "100%",
              padding: "0px 0px",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TextRob16FontL
              sx={{
                fontWeight: "500",
                color: theme[mode].gray,
              }}
            >
              {t("home.cpu")}
            </TextRob16FontL>
            <TextRob16FontL
              sx={{
                fontWeight: "500",
                color: theme[mode].primary,
              }}
            >
              {cpuState}
            </TextRob16FontL>
          </Stack>
          <Divider
            sx={{
              borderColor: theme[mode].grayLight,
              my: "4px",
            }}
          />
          {/* Memory */}
          <Stack
            sx={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TextRob16FontL
              sx={{
                fontWeight: "500",
                color: theme[mode].gray,
              }}
            >
              {t("home.ram")}
            </TextRob16FontL>
            <TextRob16FontL
              sx={{
                fontWeight: "500",
                color: theme[mode].primary,
              }}
            >
              {memoryState}GB
            </TextRob16FontL>
          </Stack>
          <Divider
            sx={{
              borderColor: theme[mode].grayLight,
              my: "4px",
            }}
          />
          {/* Disk */}
          <Stack
            ref={ref}
            sx={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TextRob16FontL
              sx={{
                fontWeight: "500",
                color: theme[mode].gray,
                textTransform: "uppercase",
              }}
            >
              {t("home.disk")}
            </TextRob16FontL>
            <Tooltip title={!canControl ? t("permissions.cannotControlVM") : ""}>
              <span>
                <IconButton
                  onClick={() => canControl && setOpenModalSlider(true)}
                  disabled={!canControl}
                  sx={{
                    backgroundColor: theme[mode].grayLight,
                    flexDirection: "row",
                    padding: "0px 4px",
                    borderRadius: "4px",
                    marginRight: "-4px",
                    gap: "6px",
                    opacity: !canControl ? 0.5 : 1,
                    "&:hover": {
                      backgroundColor: theme[mode].grayLight,
                      opacity: 0.8,
                    },
                  }}
                >
                  <PencilIcon fill={canControl ? theme[mode].primary : theme[mode].tertiary} />
                  <TextRob16FontL
                    sx={{
                      fontWeight: "500",
                      color: canControl ? theme[mode].primary : theme[mode].tertiary,
                    }}
                  >
                    {diskState}GB
                  </TextRob16FontL>
                </IconButton>
              </span>
            </Tooltip>
          </Stack>
          <Divider
            sx={{
              borderColor: theme[mode].grayLight,
              my: "4px",
            }}
          />
          {/* System */}
          <Stack
            sx={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: "2px",
            }}
          >
            <TextRob16FontL
              sx={{
                fontWeight: "500",
                color: theme[mode].gray,
              }}
            >
              {t("home.so")}
            </TextRob16FontL>
            <TextRob16FontL
              sx={{
                fontWeight: "500",
                color: theme[mode].primary,
                ...makeEllipsis(),
              }}
            >
              {os}
            </TextRob16FontL>
          </Stack>
        </Stack>
        {/* Caixa de confirmação */}
        <Box
          sx={{
            position: "absolute",
            top: showConfirmation ? "0" : "-60px",
            left: 0,
            right: 0,
            height: "25px",
            backgroundColor: theme[mode].blueMedium,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 16px",
            transition: "bottom 0.9s ease-in-out",
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",

            ...(!showConfirmation && { display: "none" }),
          }}
        >
          <Button onClick={handleCancel} sx={{}}>
            <CloseIcon sx={{ color: theme[mode].red, fontSize: "14px" }} />
          </Button>
          <Button onClick={handleConfirm}>
            <CheckIcon sx={{ color: theme[mode].blue, fontSize: "14px" }} />
          </Button>
        </Box>
        {/* Button Show charts */}
        <Stack
          sx={{
            marginTop: "auto",
            flexDirection: "row",
            gap: "8px",
          }}
        >
          {/* Chart */}
          <Tooltip
            title={!canControl ? t("permissions.cannotControlVM") : ""}
            placement="top"
          >
            <span style={{ width: "100%" }}>
              <Btn
                disabled={
                  !canControl ||
                  !checkStatus(statusState, taskState?.action, taskState?.task)
                    .isRunning
                }
                onClick={() => {
                  setCurrentVMName(vmNameState as string);
                  setCurrentIdVM(vmId as number);
                  setCurrentVMOS(os);
                  setCurrentVMStatus(statusState as "RUNNING" | "STOPPED" | "PAUSED");
                }}
                sx={{
                  width: "100%",
                  border: "1px solid",
                  borderColor: canControl ? theme[mode].blueDark : theme[mode].gray,
                  borderRadius: "8px",
                  display: "flex",
                  flexDirection: "row",
                  ":disabled": {
                    opacity: 0.4,
                  },
                }}
              >
                <ChartBarIcon fill={canControl ? theme[mode].blueDark : theme[mode].gray} />
                <TextRob14Font1Xs
                  sx={{
                    color: canControl ? theme[mode].blueDark : theme[mode].gray,
                    fontSize: "12px",
                    fontWeight: "500",
                    lineHeight: "16px",
                    wordWrap: "break-word",
                  }}
                >
                  {t("graphics.showGraph")}
                </TextRob14Font1Xs>
              </Btn>
            </span>
          </Tooltip>
          {/* Tertminal */}
          {getOS({ osValue: os }).hasTerminal && (
            <Btn
              disabled={
                checkStatus(statusState, taskState?.action, taskState?.task)
                  .isWaiting
              }
              onClick={() => { }}
              sx={{
                width: "40px",
                height: "27px",
                border: "1px solid",
                borderColor: theme[mode].blueDark,
                borderRadius: "8px",
                display: "flex",
                flexDirection: "row",
                padding: "0px 4px",
                ":disabled": {
                  opacity: 0.4,
                },
              }}
            >
              <TerminalIcon fill={theme[mode].blueDark} />
            </Btn>
          )}
          {/* Monitor */}
          {getOS({ osValue: os }).hasMonitor && (
            <Btn
              disabled={
                checkStatus(statusState, taskState?.action, taskState?.task)
                  .isWaiting
              }
              onClick={() => { }}
              sx={{
                width: "40px",
                height: "27px",
                border: "1px solid",
                borderColor: theme[mode].blueDark,
                borderRadius: "8px",
                display: "flex",
                flexDirection: "row",
                padding: "0px 4px",
                ":disabled": {
                  opacity: 0.4,
                },
              }}
            >
              <MonitorIcon fill={theme[mode].blueDark} />
            </Btn>
          )}
        </Stack>
      </Stack>
      {/* Modais */}
      {openModal && (
        <ModalChangeValueInput
          label={vmNameState}
          open={openModal}
          value={vmNameState}
          changeValue={(val) => confirmChangeName(val?.toString())}
          onClose={() => setOpenModal(false)}
        />
      )}
      {openModalSlider && Boolean(position.x || position.y) && (
        <ModalSlider
          step={32}
          min={0}
          max={1024}
          value={diskState}
          posX={position.x}
          posY={position.y}
          handleChange={(val) => {
            setPreDisk(val);
            setOpenModalWarning(true);
          }}
          closeModal={() => setOpenModalSlider(false)}
        />
      )}
      {openModalWarning && (
        <ModalWarningDisk
          open={openModalWarning}
          onClose={closeModalWarning}
          onCancel={closeModalWarning}
          onConfirm={confirmWarning}
        />
      )}
    </>
  );
};
