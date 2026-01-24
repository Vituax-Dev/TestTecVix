import { Modal, SxProps } from "@mui/material";
import { useZTheme } from "../../../stores/useZTheme";
import { Stack } from "@mui/system";
import { FormEditVM } from "./FormEditVM";
import { useZMyVMsList } from "../../../stores/useZMyVMsList";
import { useZVM } from "../../../stores/useZVM";
import { useEffect } from "react";

interface IProps {
  open: boolean;
  onClose: (edit?: boolean) => void;
  sx?: SxProps;
}
export const ModalEditVM = ({ open, onClose, sx }: IProps) => {
  const { theme, mode } = useZTheme();
  const { currentVM } = useZMyVMsList();
  const { setVmName, setVmvCpu, setVmMemory, setVmDisk, setHasBackup, setVmPassword } = useZVM();

  useEffect(() => {
    if (open && currentVM) {
      setVmName(currentVM.vmName || "");
      setVmvCpu(currentVM.vCPU);
      setVmMemory(currentVM.ram);
      setVmDisk(currentVM.disk);
      setHasBackup(currentVM.hasBackup || false);
      setVmPassword("");
    }
  }, [open, currentVM]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-hidden={!open}
      sx={{
        display: "flex",
        justifyContent: "center",
        overflowY: "auto",
        paddingTop: "32px",
        paddingBottom: "32px",
      }}
    >
      <Stack
        sx={{
          width: "90%",
          maxWidth: "1000px",
          height: "fit-content",
          backgroundColor: theme[mode].mainBackground,
          borderRadius: "12px",
          padding: "24px",
          ...sx,
        }}
      >
        <FormEditVM onClose={onClose} />
      </Stack>
    </Modal>
  );
};
